"""Deterministic source for the Stein Product tiled-planet hero sculpture.

Run: blender --background --factory-startup --python build_planet.py -- [--graybox] [--out PATH]
Default builds the finished editable scene and exports the browser GLB.
"""
import argparse
import json
import math
import os
import sys
from mathutils import Matrix, Vector
import bpy

SEED = 1701
ICOSPHERE_SUBDIVISIONS = 3  # Goldberg dual: 162 cells = 150 hexagons + 12 pentagons.
RADIUS = 1.739
TILE_GAP_FACTOR = 0.94  # leaves ~6% of the tile width between neighboring faces
TILE_THICKNESS = 0.067
CAMERA_WIDTH = 15.1
RESOLUTION = (1920, 1080)
BG = (0.00152, 0.00368, 0.00439)  # sRGB #050C0E converted to linear
PALETTE = {
    "teal": (0.0044, 0.1441, 0.1441),
    "mint": (0.0343, 0.9387, 0.5583),
    "cyan": (0.1070, 0.6654, 1.0),
    "gold": (1.0, 0.7011, 0.2542),
}


def parse_args():
    ap = argparse.ArgumentParser()
    ap.add_argument("--graybox", action="store_true")
    ap.add_argument("--out", default=os.path.join(os.path.dirname(__file__), "first-light-planet.blend"))
    return ap.parse_args(sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else [])


def clear_scene():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for datablocks in (bpy.data.meshes, bpy.data.curves, bpy.data.materials, bpy.data.cameras, bpy.data.lights):
        for data in list(datablocks):
            if data.users == 0:
                datablocks.remove(data)


def principled(name, color, metallic=0.0, roughness=0.5, transmission=0.0, emission=None, emission_strength=0.0):
    m = bpy.data.materials.new(name)
    m.diffuse_color = (*color, 1.0)
    m.use_nodes = True
    p = m.node_tree.nodes.get("Principled BSDF")
    p.inputs["Base Color"].default_value = (*color, 1.0)
    p.inputs["Metallic"].default_value = metallic
    p.inputs["Roughness"].default_value = roughness
    p.inputs["Transmission Weight"].default_value = transmission
    if emission is not None:
        p.inputs["Emission Color"].default_value = (*emission, 1.0)
        p.inputs["Emission Strength"].default_value = emission_strength
    return m


def emissive(name, color, strength=1.0):
    """Pure emission keeps brand color exact and avoids a lit Principled face washing out."""
    m=bpy.data.materials.new(name); m.diffuse_color=(*color,1.0); m.use_nodes=True
    nodes=m.node_tree.nodes; links=m.node_tree.links; nodes.clear()
    shader=nodes.new("ShaderNodeEmission"); shader.inputs["Color"].default_value=(*color,1.0)
    shader.inputs["Strength"].default_value=strength
    out=nodes.new("ShaderNodeOutputMaterial"); links.new(shader.outputs[0],out.inputs["Surface"])
    return m


def goldberg_cells(radius):
    """Return ordered dual polygons for a frequency-4 icosphere (162 cells)."""
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=ICOSPHERE_SUBDIVISIONS, radius=radius)
    ico = bpy.context.object
    mesh = ico.data
    tri_centers = []
    for poly in mesh.polygons:
        center = sum((mesh.vertices[i].co for i in poly.vertices), Vector()) / len(poly.vertices)
        tri_centers.append(center.normalized() * radius)
    adjacent = [[] for _ in mesh.vertices]
    for face_index, poly in enumerate(mesh.polygons):
        for vertex_index in poly.vertices:
            adjacent[vertex_index].append(tri_centers[face_index])
    cells = []
    for vertex in mesh.vertices:
        normal = vertex.co.normalized()
        polygon = adjacent[vertex.index]
        tangent_x = Vector((0, 0, 1)).cross(normal)
        if tangent_x.length < 1e-5:
            tangent_x = Vector((1, 0, 0)).cross(normal)
        tangent_x.normalize()
        tangent_y = normal.cross(tangent_x).normalized()
        center = sum(polygon, Vector()) / len(polygon)
        coords = []
        for point in polygon:
            projected = point - normal * point.dot(normal)
            coords.append(Vector((projected.dot(tangent_x), projected.dot(tangent_y))))
        centroid = sum(coords, Vector((0.0, 0.0))) / len(coords)
        coords = [point - centroid for point in coords]
        coords.sort(key=lambda p: math.atan2(p.y, p.x))
        cells.append({"normal": normal.copy(), "center": normal * radius,
                      "coords": coords, "basis_x": tangent_x, "basis_y": tangent_y,
                      "sides": len(coords)})
    bpy.data.objects.remove(ico, do_unlink=True)
    bpy.data.meshes.remove(mesh)
    return cells


def canonical_shape(coords):
    """Rotation-normalize polygon, returning a reusable mesh-class key and points."""
    edge_lengths = [(coords[(i + 1) % len(coords)] - coords[i]).length for i in range(len(coords))]
    rotations = [(tuple(round(edge_lengths[(i + j) % len(coords)], 4) for j in range(len(coords))), i)
                 for i in range(len(coords))]
    signature, start = min(rotations, key=lambda pair: pair[0])
    origin = coords[start]
    edge = coords[(start + 1) % len(coords)] - origin
    angle = math.atan2(edge.y, edge.x)
    c, s = math.cos(angle), math.sin(angle)
    points = []
    for j in range(len(coords)):
        p = coords[(start + j) % len(coords)] - origin
        points.append(Vector((p.x * c + p.y * s, -p.x * s + p.y * c)))
    centroid = sum(points, Vector((0.0, 0.0))) / len(points)
    points = [p - centroid for p in points]
    # Mirror variants share a mesh only when their ordered edge signatures match.
    return (len(coords), signature), points, angle


def build_tile_mesh(name, coords, graybox=False):
    """Build a flat tangent tile with equal thickness, a small bevel, and a true gap."""
    # Move each tile body 3% of its width inside its Goldberg cell. Neighboring
    # bodies therefore leave a uniform ~6% cell-width gap. The face bevel itself
    # stays narrow so the dark cap does not turn into a wire lattice.
    outer_scale = (1.0 + TILE_GAP_FACTOR) * 0.5
    outer = [p * outer_scale for p in coords]
    inset = [p * (outer_scale - 0.01) for p in coords]
    count = len(coords)
    z0, z1, z2 = -TILE_THICKNESS / 2, TILE_THICKNESS / 2 - 0.014, TILE_THICKNESS / 2
    vertices = []
    for ring, z in ((outer, z0), (outer, z1), (inset, z2)):
        vertices.extend((p.x, p.y, z) for p in ring)
    faces, mat_index = [tuple(reversed(range(count)))], [1 if not graybox else 0]
    for i in range(count):
        j = (i + 1) % count
        faces.append((i, j, count + j, count + i)); mat_index.append(1 if not graybox else 0)
        faces.append((count + i, count + j, 2 * count + j, 2 * count + i)); mat_index.append(2 if not graybox else 0)
    faces.append(tuple(2 * count + i for i in range(count))); mat_index.append(0)
    mesh = bpy.data.meshes.new(name)
    mesh.from_pydata(vertices, [], faces); mesh.update()
    for polygon, material_index in zip(mesh.polygons, mat_index):
        polygon.material_index = material_index
        polygon.use_smooth = False
    return mesh


def cap_edge(normal):
    phi = math.atan2(normal.y, normal.x)
    return -0.065 + 0.065 * math.sin(3.0 * phi + 0.4) + 0.025 * math.sin(7.0 * phi)


def make_limb(mint_mat, gold_mat):
    """A thin, tangible lower horizon tube, graded from mint to gold."""
    stops = []
    for i in range(9):
        t = i / 8.0
        col = tuple(PALETTE["mint"][j] * (1-t) + PALETTE["gold"][j] * t for j in range(3))
        stops.append(emissive(f"Limb_Gradient_{i:02d}", col, 1.0))
    verts, faces, mids = [], [], []
    steps, sides, radius = 96, 6, 0.009
    limb_r = RADIUS + 0.008
    for k in range(steps + 1):
        t = k / steps
        theta = math.pi + math.pi*t
        center = Vector((limb_r*math.cos(theta), -0.014, limb_r*math.sin(theta)))
        tangent = Vector((-math.sin(theta), 0, math.cos(theta))).normalized()
        normal = Vector((0, 1, 0))
        for j in range(sides):
            a = 2*math.pi*j/sides
            offset = radius*(math.cos(a)*normal + math.sin(a)*tangent)
            verts.append(tuple(center + offset))
    for k in range(steps):
        for j in range(sides):
            a=k*sides+j; b=k*sides+(j+1)%sides
            faces.append((a,b,b+sides,a+sides))
            mids.append(min(8, int(((k+0.5)/steps)*8)))
    mesh=bpy.data.meshes.new("HorizonLimb_Mesh")
    mesh.from_pydata(verts, [], faces); mesh.update()
    for m in stops: mesh.materials.append(m)
    for p, mi in zip(mesh.polygons, mids): p.material_index=mi
    obj=bpy.data.objects.new("Horizon_Limb", mesh)
    bpy.context.collection.objects.link(obj)
    obj["part_role"]="brand horizon limb, mint-to-gold"
    return obj


def make_halo():
    """Presentation-only faint radial emissive field behind the planet."""
    rings, sides, max_r = 20, 96, 2.5
    verts, faces = [(0.0, RADIUS+0.08, 0.0)], []
    for ring in range(1, rings+1):
        r=max_r*ring/rings
        for j in range(sides):
            a=2*math.pi*j/sides
            verts.append((r*math.cos(a), RADIUS+0.08, r*math.sin(a)))
    for j in range(sides): faces.append((0, 1+j, 1+(j+1)%sides))
    for ring in range(1, rings):
        inner=1+(ring-1)*sides; outer=1+ring*sides
        for j in range(sides):
            a=inner+j; b=inner+(j+1)%sides; c=outer+(j+1)%sides; d=outer+j
            faces.append((a,d,c,b))
    mesh=bpy.data.meshes.new("PresentationHalo_Mesh"); mesh.from_pydata(verts,[],faces); mesh.update()
    fade=mesh.color_attributes.new(name="HaloFade", type="FLOAT_COLOR", domain="POINT")
    fade.data[0].color=(0.0044,0.1441,0.1441,0.10)
    for ring in range(1,rings+1):
        r=max_r*ring/rings; strength=0.10*math.exp(-((r-1.45)/0.44)**2)
        for j in range(sides): fade.data[1+(ring-1)*sides+j].color=(0.0044,0.1441,0.1441,strength)
    mat=bpy.data.materials.new("Presentation_Halo_Emissive"); mat.use_nodes=True
    nodes=mat.node_tree.nodes; links=mat.node_tree.links; nodes.clear()
    attr=nodes.new("ShaderNodeVertexColor"); attr.layer_name="HaloFade"
    emission=nodes.new("ShaderNodeEmission"); emission.inputs["Strength"].default_value=1.0
    transparent=nodes.new("ShaderNodeBsdfTransparent")
    mix=nodes.new("ShaderNodeMixShader"); out=nodes.new("ShaderNodeOutputMaterial")
    links.new(attr.outputs["Color"],emission.inputs["Color"]); links.new(attr.outputs["Alpha"],mix.inputs[0])
    links.new(transparent.outputs[0],mix.inputs[1]); links.new(emission.outputs[0],mix.inputs[2]); links.new(mix.outputs[0],out.inputs["Surface"])
    mesh.materials.append(mat); obj=bpy.data.objects.new("Presentation_Halo",mesh); bpy.context.collection.objects.link(obj)
    obj.hide_select=True; obj["presentation_only"]=True
    return obj


def create_camera(name, location, target, ortho, hero=False):
    cam_data = bpy.data.cameras.new(name)
    cam = bpy.data.objects.new(name, cam_data)
    bpy.context.collection.objects.link(cam)
    cam.location = location
    direction = Vector(target) - cam.location
    cam.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
    cam_data.type = "ORTHO"
    cam_data.ortho_scale = ortho
    cam_data.lens = 48
    if hero:
        cam_data.dof.use_dof = False
    return cam


def setup_scene(graybox=False):
    clear_scene()
    scene = bpy.context.scene
    scene.render.engine = "CYCLES"
    scene.cycles.samples = 48 if not graybox else 12
    scene.cycles.use_denoising = True
    scene.render.resolution_x, scene.render.resolution_y = RESOLUTION
    scene.render.resolution_percentage = 55 if graybox else 67
    scene.render.image_settings.file_format = "PNG"
    scene.render.film_transparent = False
    scene.render.threads_mode = "FIXED"
    scene.render.threads = 2
    scene.view_settings.view_transform = "Standard"
    scene.view_settings.look = "None"
    scene.world = bpy.data.worlds.new("FirstLight_World")
    scene.world.use_nodes = True
    bg = scene.world.node_tree.nodes.get("Background")
    bg.inputs["Color"].default_value = (*BG, 1)
    bg.inputs["Strength"].default_value = 1.0
    scene.render.filepath = "//renders/rest.png"
    scene.render.image_settings.color_mode = "RGBA"
    scene.render.resolution_percentage = 100

    if graybox:
        core_mat = principled("Graybox_Matte", (0.16, 0.19, 0.20), roughness=0.75)
        tile_mats = [core_mat]
        glow_mats = {}
    else:
        core_mat = principled("Dark_Smoked_Glass_Core", (0.005, 0.024, 0.027), metallic=0.38, roughness=0.20, transmission=0.06)
        face_mat = principled("Tile_Smoked_Glass", (0.008, 0.022, 0.024), metallic=0.25, roughness=0.42, transmission=0.035)
        body_mat = principled("Tile_Charcoal_Ceramic", (0.018, 0.028, 0.029), metallic=0.12, roughness=0.63)
        dark_edge = principled("Tile_Brushed_Titanium_Edge", (0.044, 0.088, 0.090), metallic=0.78, roughness=0.28)
        tile_mats = [face_mat, body_mat, dark_edge]
        glow_mats = {
            "teal": emissive("Terminator_Emissive_Teal", PALETTE["teal"], 1.0),
            "mint": emissive("Terminator_Emissive_Mint", PALETTE["mint"], 1.0),
            "gold": emissive("Terminator_Emissive_Sol_Trailing_Edge", PALETTE["gold"], 1.0),
        }
        glow_mats["dark"] = dark_edge
        unlit_rim = principled("Unlit_Faint_Mint_Rim", (0.012,0.10,0.08), metallic=0.55,
                                roughness=0.34, emission=PALETTE["mint"], emission_strength=0.035)
        cyan_light = PALETTE["cyan"]

    bpy.ops.mesh.primitive_uv_sphere_add(segments=96, ring_count=48, radius=RADIUS - 0.041)
    core = bpy.context.object
    core.name = "Planet_Core"
    core.data.name = "PlanetCore_Mesh"
    core.data.materials.append(core_mat)
    for p in core.data.polygons:
        p.use_smooth = True
    core["part_role"] = "dark spherical tile substrate"

    camera_dir = Vector((0.0, -1.0, 0.04)).normalized()
    patch_normal = Vector((0.61, -0.70, 0.37)).normalized()
    records = []
    tiles_collection = bpy.data.collections.new("Planet_Tiles_StableOrder")
    scene.collection.children.link(tiles_collection)
    cells = goldberg_cells(RADIUS)
    total_hexagons = sum(cell["sides"] == 6 for cell in cells)
    total_pentagons = sum(cell["sides"] == 5 for cell in cells)
    assert len(cells) == 162 and total_hexagons == 150 and total_pentagons == 12
    cap_points = [(i, cell) for i, cell in enumerate(cells)
                  if cell["normal"].z > cap_edge(cell["normal"])]
    candidates=[]
    for sample_i,cell in cap_points:
        n=cell["normal"]
        if n.dot(camera_dir)>0 and n.x>-0.15 and n.z>0.04:
            upper=math.sqrt(max(0.0,1.0-n.z*n.z))
            u=max(0.0,min(1.0,(n.x+0.15)/max(0.001,upper+0.15)))
            candidates.append((sample_i,u))
    # The seven outer trailing cells carry the one warm gold moment.
    gold_ids={i for i,u in sorted(candidates,key=lambda item:item[1])[-7:]}
    role_by_sample={}
    band_by_sample={}
    for sample_i,u in candidates:
        role_by_sample[sample_i]="gold" if sample_i in gold_ids else ("teal" if u<0.30 else "mint")
        band_by_sample[sample_i]=u
    make_limb(glow_mats.get("mint", core_mat), glow_mats.get("gold", core_mat)) if not graybox else None
    if not graybox: make_halo()
    mesh_classes = {}
    class_count = {"hex": 0, "pent": 0}
    cap_indices = {i for i, _ in cap_points}
    for idx, (sample_i,cell) in enumerate(enumerate(cells)):
        normal = cell["normal"]
        mesh_key, local_coords, face_angle = canonical_shape(cell["coords"])
        if mesh_key not in mesh_classes:
            shape_name = "Hex" if cell["sides"] == 6 else "Pent"
            mesh = build_tile_mesh(f"{shape_name}Tile_Class_{class_count['hex' if cell['sides'] == 6 else 'pent']:02d}",
                                   local_coords, graybox)
            for material in tile_mats:
                mesh.materials.append(material)
            mesh_classes[mesh_key] = mesh
            class_count["hex" if cell["sides"] == 6 else "pent"] += 1
        mesh = mesh_classes[mesh_key]
        # Canonical polygon coordinates rotate the first side onto +X.
        # Rotate the tangent frame back by the matching angle for each tile.
        basis_x = cell["basis_x"] * math.cos(face_angle) + cell["basis_y"] * math.sin(face_angle)
        basis_y = -cell["basis_x"] * math.sin(face_angle) + cell["basis_y"] * math.cos(face_angle)
        rotation = Matrix((basis_x, basis_y, normal)).transposed().to_quaternion()
        obj = bpy.data.objects.new(f"Tile_{idx:04d}", mesh)
        tiles_collection.objects.link(obj)
        obj.location = cell["center"]
        obj.rotation_mode = "QUATERNION"
        obj.rotation_quaternion = rotation
        cap_visible = sample_i in cap_indices
        obj.hide_render = not cap_visible
        visible_terminator = sample_i in role_by_sample
        t = band_by_sample.get(sample_i, 0.0)
        in_patch = normal.dot(patch_normal) > 0.91
        role = role_by_sample.get(sample_i, "dark")
        if graybox:
            obj.data = mesh
        else:
            edge_color = role
            for slot_index, slot in enumerate(obj.material_slots):
                if slot_index == 0 and role in {"teal","mint","gold"}:
                    slot.link="OBJECT"; slot.material=glow_mats[role]
                if slot_index == 2:
                    slot.link = "OBJECT"
                    slot.material = (glow_mats[role] if role in {"teal","mint","gold"} else unlit_rim)
            obj["terminator"] = bool(visible_terminator)
            obj["terminator_t"] = float(t)
            obj["edge_material_role"] = edge_color
            obj["role"] = role
            obj["band_position"] = float(t)
            obj["lifted_patch"] = bool(in_patch)
            obj["cap_visible"] = bool(cap_visible)
        obj["tile_index"] = idx
        obj["sample_index"] = sample_i
        obj["rest_position"] = [float(v) for v in cell["center"]]
        obj["outward_normal"] = [float(v) for v in normal]
        obj["pivot_role"] = "tile_center"
        records.append({"name": obj.name, "shape": "hexagon" if cell["sides"] == 6 else "pentagon",
                        "mesh_class": mesh.name, "rest_position": [round(float(v), 7) for v in cell["center"]],
                        "outward_normal": [round(float(v), 7) for v in normal],
                        "terminator": bool(visible_terminator), "terminator_t": round(float(t), 5),
                        "cap_visible": bool(cap_visible),
                        "role": "dark" if graybox else role, "band_position": round(float(t), 6),
                        "edge_material_role": "graybox" if graybox else role,
                        "lifted_patch": bool(in_patch)})

    # Camera matches mockup 01 in the 16:9 canvas: globe center x≈66%, y≈42%, diameter≈41% height.
    hero_target = (-CAMERA_WIDTH * (1270.0 - 960.0) / 1920.0, 0.0,
                   -((540.0 - 455.0) / 1080.0) * (CAMERA_WIDTH * 9.0 / 16.0))
    hero = create_camera("Camera_Hero_Reference", (hero_target[0], -16.0, hero_target[2] + 0.70), hero_target, CAMERA_WIDTH, True)
    hero.data.lens = 50
    side = create_camera("Camera_Side_Profile", (14.0, -0.30, 0.40), (0, 0, 0), 7.0)
    close = create_camera("Camera_Sculpture_Close", (0.0, -16.0, 0.12), (0,0,0), 6.7)
    scene.camera = hero
    scene["asset_contract"] = "First Light tiled planet | Goldberg dual tiles | upper cap, role-tagged emissive band, horizon limb"
    scene["tile_count"] = len(records)
    scene["goldberg_cell_count"] = len(cells)
    scene["goldberg_hexagon_count"] = total_hexagons
    scene["goldberg_pentagon_count"] = total_pentagons
    scene["tile_mesh_class_count"] = len(mesh_classes)
    scene["mockup_frame"] = "01 / TILED PLANET"
    scene["graybox_stage"] = bool(graybox)

    # Compact, camera-independent emissive object and neutral product lighting.
    def area(name, location, power, color, size, target=(0, 0, 0)):
        ld = bpy.data.lights.new(name, "AREA")
        ld.energy = power
        ld.color = color
        ld.shape = "DISK"
        ld.size = size
        ob = bpy.data.objects.new(name, ld)
        scene.collection.objects.link(ob)
        ob.location = location
        ob.rotation_euler = (Vector(target) - ob.location).to_track_quat("-Z", "Y").to_euler()
        return ob
    area("Key_Cool_Cyan", (-4.2, -5.5, 5.5), 170 if not graybox else 260, (0.34, 0.74, 0.82), 5.0)
    area("Fill_Teal", (4.0, -3.4, 0.0), 70 if not graybox else 140, (0.22, 0.66, 0.59), 4.0)
    area("Rim_Sol_White", (1.5, 2.2, 4.5), 180 if not graybox else 200, (0.92, 0.80, 0.57), 3.0)
    return records, hero, side, close, tiles_collection


def set_active_camera(camera):
    bpy.context.scene.camera = camera


def export_glb(path):
    bpy.ops.object.select_all(action="DESELECT")
    for obj in bpy.context.scene.objects:
        if obj.type == "MESH" and (obj.name.startswith("Tile_") or obj.name in {"Planet_Core","Horizon_Limb"}):
            obj.select_set(True)
    bpy.context.view_layer.objects.active = bpy.data.objects.get("Planet_Core")
    tiles = [obj for obj in bpy.data.objects if obj.name.startswith("Tile_")]
    saved_slots = []
    for obj in tiles:
        for slot_index in (0,2):
            slot = obj.material_slots[slot_index]
            saved_slots.append((obj, slot_index, slot.link, slot.material))
            slot.link = "DATA"
            slot.material = obj.data.materials[slot_index]
    try:
        bpy.ops.export_scene.gltf(filepath=path, export_format="GLB", use_selection=True,
                                  export_apply=False, export_materials="EXPORT", export_cameras=False,
                                  export_lights=False, export_extras=True, export_yup=True,
                                  export_animations=False)
    finally:
        for obj, index, link, material in saved_slots:
            slot = obj.material_slots[index]
            slot.link = link
            slot.material = material


def main():
    args = parse_args()
    records, hero, side, close, tiles = setup_scene(args.graybox)
    out = os.path.abspath(args.out)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    bpy.ops.wm.save_as_mainfile(filepath=out)
    if not args.graybox:
        glb = os.path.splitext(out)[0] + ".glb"
        export_glb(glb)
        manifest = os.path.splitext(out)[0] + "_tile_manifest.json"
        with open(manifest, "w", encoding="utf-8") as f:
            json.dump({"tile_count": len(records), "goldberg_cell_count": 162,
                       "goldberg_hexagon_count": 150,
                       "goldberg_pentagon_count": 12,
                       "visible_cap_hexagon_count": sum(r["shape"] == "hexagon" for r in records),
                       "visible_cap_pentagon_count": sum(r["shape"] == "pentagon" for r in records),
                       "tile_mesh_classes": len({r["mesh_class"] for r in records}),
                       "band": {"direction": [1.0, 0.0, 0.0], "start": -0.40, "width": 1.40,
                                "front_min": 0.08, "upper_min": 0.14}, "tiles": records}, f, indent=2)
        # A preview-only variant makes the lifted cursor patch visible. The canonical blend/GLB remain at rest.
        patch_tiles = [o for o in bpy.data.objects if o.get("lifted_patch", False)]
        for i, obj in enumerate(patch_tiles):
            normal = Vector(obj["outward_normal"])
            obj.location += normal * (RADIUS * (0.10 + 0.025 * (i % 3)))
        scatter_path = os.path.splitext(out)[0] + "-scattered-preview.blend"
        bpy.ops.wm.save_as_mainfile(filepath=scatter_path)
        print(f"SAVED_BLEND={out}\nEXPORTED_GLB={glb}\nTILE_MANIFEST={manifest}\nSCATTER_PREVIEW_BLEND={scatter_path}\nPATCH_TILE_COUNT={len(patch_tiles)}\nTILE_COUNT={len(records)}")
    else:
        print(f"GRAYBOX_BLEND={out}")


if __name__ == "__main__":
    main()
