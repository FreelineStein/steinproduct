"""Render the still poster the browser shows before the live sculpture is ready
(and on coarse pointers, reduced motion and graphics failure).

The poster sits on the page's Aurora ground, so it is rendered with a
transparent film: no baked background, the limb glow shows through.

Run: blender --background first-light-planet.blend --python render_poster.py -- [--out PATH] [--size 1024]
"""
import argparse
import os
import sys
import bpy

SPHERE_DIAMETER = 2 * 1.739  # RADIUS in build_planet.py
FILL = 0.86  # fraction of the square frame the globe spans


def parse_args():
    ap = argparse.ArgumentParser()
    here = os.path.dirname(os.path.abspath(__file__))
    ap.add_argument("--out", default=os.path.join(here, "..", "..", "public", "first-light", "planet-rest.webp"))
    ap.add_argument("--size", type=int, default=1024)
    ap.add_argument("--samples", type=int, default=64)
    return ap.parse_args(sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else [])


def enable_gpu(scene):
    prefs = bpy.context.preferences.addons.get("cycles")
    if not prefs:
        return
    cp = prefs.preferences
    for backend in ("METAL", "CUDA", "OPTIX", "HIP"):
        try:
            cp.compute_device_type = backend
        except TypeError:
            continue
        cp.get_devices()
        gpus = [d for d in cp.devices if d.type != "CPU"]
        if gpus:
            for d in cp.devices:
                d.use = True
            scene.cycles.device = "GPU"
            return


def main():
    args = parse_args()
    scene = bpy.context.scene
    cam = bpy.data.objects.get("Camera_Sculpture_Close")
    if cam is None:
        raise SystemExit("Camera_Sculpture_Close not found in the scene")
    cam.data.type = "ORTHO"
    cam.data.ortho_scale = SPHERE_DIAMETER / FILL
    scene.camera = cam

    # The presentation halo is a stack of emissive planes for the opaque review
    # renders. On a transparent film it would bake a glowing square, and the
    # page's Aurora ground already provides the glow, so leave it out.
    for obj in bpy.data.objects:
        if obj.name.startswith("Presentation_Halo"):
            obj.hide_render = True

    scene.render.engine = "CYCLES"
    scene.cycles.samples = args.samples
    scene.cycles.use_denoising = True
    enable_gpu(scene)
    scene.render.threads_mode = "AUTO"
    scene.render.resolution_x = scene.render.resolution_y = args.size
    scene.render.resolution_percentage = 100
    scene.render.film_transparent = True
    settings = scene.render.image_settings
    settings.color_mode = "RGBA"
    if args.out.lower().endswith(".webp"):
        settings.file_format = "WEBP"
        settings.quality = 88
    else:
        settings.file_format = "PNG"
        settings.color_depth = "8"
        settings.compression = 90
    scene.view_settings.view_transform = "Standard"
    scene.view_settings.look = "None"

    out = os.path.abspath(args.out)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    scene.render.filepath = out
    bpy.ops.render.render(write_still=True)
    print(f"POSTER={out} size={args.size} ortho_scale={cam.data.ortho_scale:.3f} device={scene.cycles.device}")


if __name__ == "__main__":
    main()
