"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

type TileRole = "dark" | "teal" | "mint" | "gold";
type TileRecord = {
  name: string;
  role: TileRole;
  band_position: number;
  rest_position: [number, number, number];
  outward_normal: [number, number, number];
  mesh_class: string;
  cap_visible: boolean;
};
type TileManifest = { tile_count: number; band?: { direction: [number, number, number]; start: number; width: number; front_min: number; upper_min: number }; tiles: TileRecord[] };
type TileState = {
  node: THREE.Object3D;
  name: string;
  role: TileRole;
  bandPosition: number;
  restPosition: THREE.Vector3;
  restQuaternion: THREE.Quaternion;
  restScale: THREE.Vector3;
  normal: THREE.Vector3;
  lift: number;
  velocity: number;
  targetLift: number;
  restMatrix: THREE.Matrix4;
  currentBand: number;
  currentEmission: number;
  instanceIndex: number;
  meshClass: string;
};
type TileInstanceGroup = {
  meshClass: string;
  mesh: THREE.InstancedMesh;
  tiles: TileState[];
  faceColors: THREE.InstancedBufferAttribute;
  faceEmission: THREE.InstancedBufferAttribute;
  rimColors: THREE.InstancedBufferAttribute;
  rimEmission: THREE.InstancedBufferAttribute;
  bandPositions: THREE.InstancedBufferAttribute;
};

const ASSET_REVISION = "goldberg-162-v2";
const GLB_URL = `/first-light/first-light-planet.glb?v=${ASSET_REVISION}`;
const MANIFEST_URL = `/first-light/first-light-planet_tile_manifest.json?v=${ASSET_REVISION}`;
// Transparent still from blender/first-light/render_poster.py; the Aurora ground shows through.
const POSTER_URL = "/first-light/planet-rest.webp";
const ROLE_HEX: Record<TileRole, string> = {
  dark: "#0A1719",
  teal: "#0E6B6B",
  mint: "#34F5C5",
  gold: "#FFD98A",
};
const PLANET_RADIUS = 1.739;

function roleColor(role: TileRole) {
  return new THREE.Color(ROLE_HEX[role]);
}

function makeInstanceMaterial({
  colorAttribute,
  emissionAttribute,
  kind,
}: {
  colorAttribute: "aFaceColor" | "aRimColor";
  emissionAttribute: "aFaceEmission" | "aRimEmission";
  kind: "face" | "rim";
}) {
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: kind === "face" ? 0.56 : 0.28,
    metalness: kind === "face" ? 0.12 : 0.52,
    emissive: 0x000000,
  });
  const pulseUniform = { value: 0 };
  material.userData.pulseUniform = pulseUniform;
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uPulsePosition = pulseUniform;
    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        `#include <common>
         attribute vec3 ${colorAttribute};
         attribute float ${emissionAttribute};
         attribute float aBandPosition;
         varying vec3 vHeroRoleColor;
         varying float vHeroEmission;
         varying float vHeroBandPosition;`,
      )
      .replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>
         vHeroRoleColor = ${colorAttribute};
         vHeroEmission = ${emissionAttribute};
         vHeroBandPosition = aBandPosition;`,
      );
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
         uniform float uPulsePosition;
         varying vec3 vHeroRoleColor;
         varying float vHeroEmission;
         varying float vHeroBandPosition;`,
      )
      .replace(
        "#include <color_fragment>",
        `#include <color_fragment>
         ${kind === "face"
           ? "diffuseColor.rgb = vHeroRoleColor * mix(0.72, 0.025, smoothstep(0.04, 0.94, vHeroEmission));"
           : "diffuseColor.rgb = vHeroRoleColor * 0.22;"}`,
      )
      .replace(
        "#include <emissivemap_fragment>",
        `#include <emissivemap_fragment>
         float heroPulseDelta = abs(vHeroBandPosition - uPulsePosition);
         heroPulseDelta = min(heroPulseDelta, 1.0 - heroPulseDelta);
         float heroPulse = exp(-heroPulseDelta * heroPulseDelta * 150.0);
         totalEmissiveRadiance += vHeroRoleColor * vHeroEmission * (0.92 + 0.18 * heroPulse);`,
      );
  };
  material.customProgramCacheKey = () => `first-light-${kind}-${colorAttribute}-${emissionAttribute}`;
  return material;
}

function makeHalo() {
  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    vertexShader: `
      varying vec3 vHaloNormal;
      varying vec3 vHaloView;
      void main() {
        vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
        vHaloNormal = normalize(normalMatrix * normal);
        vHaloView = normalize(-viewPosition.xyz);
        gl_Position = projectionMatrix * viewPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vHaloNormal;
      varying vec3 vHaloView;
      void main() {
        float rim = pow(1.0 - abs(dot(normalize(vHaloNormal), normalize(vHaloView))), 3.2);
        float alpha = rim * 0.085;
        gl_FragColor = vec4(vec3(0.0044, 0.1441, 0.1441) * alpha, alpha);
      }
    `,
  });
  const halo = new THREE.Mesh(new THREE.SphereGeometry(PLANET_RADIUS * 1.055, 48, 32), material);
  halo.name = "Planet_Halo_Runtime";
  halo.renderOrder = 1;
  return halo;
}

export function TiledPlanetHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "still">("loading");
  const [paused, setPaused] = useState(false);
  const [scattered, setScattered] = useState(false);
  const pausedRef = useRef(false);
  const scatteredRef = useRef(false);
  const stopMotionRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;

    const coarse = window.matchMedia("(pointer: coarse)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (coarse.matches || reduced.matches) {
      window.requestAnimationFrame(() => setStatus("still"));
      return;
    }

    let renderer: THREE.WebGLRenderer | null = null;
    let raf = 0;
    let visible = true;
    let disposed = false;
    let contextLost = false;
    let lastTime = 0;
    let elapsed = 0;
    let pulsePosition = 0;
    let dragPointer: number | null = null;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let lastPointerTime = 0;
    let moved = false;
    let angularVelocityY = 0;
    let angularVelocityX = 0;
    let dragOverridesIdle = false;
    let idleSpinBlend = 0;
    const idleAxis = new THREE.Vector3(0.075, 1, -0.04).normalize();
    let hoveredNormal: THREE.Vector3 | null = null;
    let tileStates: TileState[] = [];
    const instancedTiles: THREE.InstancedMesh[] = [];
    const instanceGroups: TileInstanceGroup[] = [];
    let currentManifest: TileManifest | null = null;
    let roleMaterials: THREE.Material[] = [];
    let scene: THREE.Scene | null = null;
    let camera: THREE.OrthographicCamera | null = null;
    let spinGroup: THREE.Group | null = null;
    let planetRoot: THREE.Group | null = null;
    let observer: IntersectionObserver | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let raycaster: THREE.Raycaster | null = null;
    let uniforms: { value: number }[] = [];
    const pointer = new THREE.Vector2();
    const instanceMatrix = new THREE.Matrix4();
    const tilePosition = new THREE.Vector3();
    const worldNormal = new THREE.Vector3();
    const faintMintRim = new THREE.Color("#34F5C5").multiplyScalar(0.14);
    const bandDirection = new THREE.Vector3(1, 0, 0);
    const darkTileColor = new THREE.Color("#0A1719");
    const bandTeal = new THREE.Color("#0E6B6B");
    const bandMint = new THREE.Color("#34F5C5");
    const bandGold = new THREE.Color("#FFD98A");
    const scratchColor = new THREE.Color();
    const litColor = new THREE.Color();
    const rimColor = new THREE.Color();
    const idleRotation = new THREE.Quaternion();
    const groupByMeshClass = new Map<string, TileInstanceGroup>();

    const cancelLoop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const scheduleLoop = () => {
      if (!raf && visible && !document.hidden && !disposed && !contextLost) {
        raf = requestAnimationFrame(frame);
      }
    };
    const disposeResources = () => {
      cancelLoop();
      observer?.disconnect();
      resizeObserver?.disconnect();
      if (renderer) {
        renderer.dispose();
        renderer = null;
      }
      const disposedMaterials = new Set<THREE.Material>(roleMaterials);
      const disposedGeometries = new Set<THREE.BufferGeometry>();
      scene?.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        disposedGeometries.add(object.geometry);
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material) => disposedMaterials.add(material));
      });
      disposedMaterials.forEach((material) => material.dispose());
      disposedGeometries.forEach((geometry) => geometry.dispose());
      roleMaterials = [];
    };
    const fallback = () => {
      setStatus("still");
      disposeResources();
    };

    const onContextLost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      fallback();
    };
    canvas.addEventListener("webglcontextlost", onContextLost, false);

    const resize = () => {
      if (!renderer || !camera) return;
      const width = Math.max(1, stage.clientWidth);
      const height = Math.max(1, stage.clientHeight);
      const aspect = width / height;
      const halfHeight = 1.82;
      camera.left = -halfHeight * aspect;
      camera.right = halfHeight * aspect;
      camera.top = halfHeight;
      camera.bottom = -halfHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
      renderer.setSize(width, height, false);
      scheduleLoop();
    };

    const updateTileMatrices = () => {
      for (const tile of tileStates) {
        tilePosition.copy(tile.restPosition).addScaledVector(tile.normal, tile.lift);
        instanceMatrix.copy(tile.restMatrix);
        instanceMatrix.elements[12] = tilePosition.x;
        instanceMatrix.elements[13] = tilePosition.y;
        instanceMatrix.elements[14] = tilePosition.z;
        const group = groupByMeshClass.get(tile.meshClass);
        if (group) group.mesh.setMatrixAt(tile.instanceIndex, instanceMatrix);
      }
      for (const group of instanceGroups) {
        group.mesh.instanceMatrix.needsUpdate = true;
      }
    };

    const updateScreenBand = () => {
      if (!spinGroup) return;
      const cfg = currentManifest?.band ?? { direction: [1, 0, 0] as [number, number, number], start: -0.05, width: 0.62, front_min: 0.08, upper_min: 0.14 };
      bandDirection.set(...cfg.direction).normalize();
      const smooth = (a: number, b: number, x: number) => {
        const t = THREE.MathUtils.clamp((x - a) / Math.max(1e-5, b - a), 0, 1);
        return t * t * (3 - 2 * t);
      };
      for (const tile of tileStates) {
        worldNormal.copy(tile.normal).applyQuaternion(spinGroup.quaternion).normalize();
        const dot = worldNormal.dot(bandDirection);
        const targetCoord = THREE.MathUtils.clamp((dot - cfg.start) / cfg.width, 0, 1);
        const frontGate = smooth(cfg.front_min - 0.12, cfg.front_min + 0.12, worldNormal.z);
        const upperGate = smooth(cfg.upper_min - 0.13, cfg.upper_min + 0.13, worldNormal.y);
        const entry = smooth(0.04, 0.22, targetCoord);
        const exit = 1 - smooth(0.94, 1.0, targetCoord);
        const targetEmission = frontGate * upperGate * entry * exit;
        tile.currentBand += (targetCoord - tile.currentBand) * 0.12;
        tile.currentEmission += (targetEmission - tile.currentEmission) * 0.12;
        const t = tile.currentBand;
        litColor.copy(t < 0.58 ? bandTeal : bandMint).lerp(t < 0.58 ? bandMint : bandGold, t < 0.58 ? smooth(0, 0.58, t) : smooth(0.58, 0.80, t));
        scratchColor.copy(darkTileColor).lerp(litColor, tile.currentEmission);
        const group = groupByMeshClass.get(tile.meshClass);
        if (!group) continue;
        scratchColor.toArray(group.faceColors.array as Float32Array, tile.instanceIndex * 3);
        group.faceEmission.setX(tile.instanceIndex, tile.currentEmission);
        rimColor.copy(scratchColor).lerp(faintMintRim, 1 - tile.currentEmission).toArray(group.rimColors.array as Float32Array, tile.instanceIndex * 3);
        group.rimEmission.setX(tile.instanceIndex, 0.14 + tile.currentEmission * 0.78);
        group.bandPositions.setX(tile.instanceIndex, tile.currentBand);
      }
      for (const group of instanceGroups) {
        group.faceColors.needsUpdate = true;
        group.faceEmission.needsUpdate = true;
        group.rimColors.needsUpdate = true;
        group.rimEmission.needsUpdate = true;
        group.bandPositions.needsUpdate = true;
      }
    };

    function frame(now: number) {
      raf = 0;
      if (!renderer || !scene || !camera || !spinGroup || disposed || contextLost || !visible || document.hidden) return;
      const dt = Math.min(0.05, lastTime ? (now - lastTime) / 1000 : 1 / 60);
      lastTime = now;
      elapsed += dt;
      if (!pausedRef.current) pulsePosition = (elapsed * 0.075) % 1;
      uniforms.forEach((uniform) => { uniform.value = pulsePosition; });

      const steps = Math.max(1, Math.ceil(dt / (1 / 60)));
      const step = dt / steps;
      for (let s = 0; s < steps; s += 1) {
        for (const tile of tileStates) {
          const spring = 48;
          const damping = 13.5;
          const acceleration = (tile.targetLift - tile.lift) * spring - tile.velocity * damping;
          tile.velocity += acceleration * step;
          tile.lift += tile.velocity * step;
          if (Math.abs(tile.targetLift - tile.lift) < 0.001 && Math.abs(tile.velocity) < 0.004) {
            tile.lift = tile.targetLift;
            tile.velocity = 0;
          }
        }
      }
      if (Math.abs(angularVelocityY) > 0.001 || Math.abs(angularVelocityX) > 0.001) {
        dragOverridesIdle = true;
        spinGroup.rotation.y += angularVelocityY * dt;
        spinGroup.rotation.x = THREE.MathUtils.clamp(spinGroup.rotation.x + angularVelocityX * dt, -0.58, 0.58);
        const inertia = Math.pow(0.91, dt * 60);
        angularVelocityY *= inertia;
        angularVelocityX *= inertia;
      } else {
        angularVelocityY = 0;
        angularVelocityX = 0;
        dragOverridesIdle = false;
      }
      const userHasControl = moved && dragPointer !== null;
      if (!pausedRef.current && !dragOverridesIdle && !userHasControl) {
        idleSpinBlend += (1 - idleSpinBlend) * (1 - Math.exp(-dt / 3.5));
        const idleDelta = dt * (Math.PI * 2 / 60) * idleSpinBlend;
        spinGroup.quaternion.premultiply(idleRotation.setFromAxisAngle(idleAxis, idleDelta));
      } else {
        idleSpinBlend = Math.max(0, idleSpinBlend - dt * 1.8);
      }
      updateScreenBand();
      updateTileMatrices();
      renderer.render(scene, camera);
      scheduleLoop();
    }

    const onVisibility = () => {
      if (document.hidden) cancelLoop();
      else scheduleLoop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const toggleScatter = () => {
      scatteredRef.current = !scatteredRef.current;
      setScattered(scatteredRef.current);
      for (const tile of tileStates) {
        tile.targetLift = scatteredRef.current
          ? 0.18 + (((parseInt(tile.name.slice(-4), 10) * 37) % 100) / 100) * 0.28
          : 0;
      }
      scheduleLoop();
    };

    stopMotionRef.current = () => {
      angularVelocityY = 0;
      angularVelocityX = 0;
      dragOverridesIdle = false;
      idleSpinBlend = 0;
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || !renderer) return;
      dragPointer = event.pointerId;
      pointerStartX = lastPointerX = event.clientX;
      pointerStartY = lastPointerY = event.clientY;
      lastPointerTime = performance.now();
      moved = false;
      canvas.setPointerCapture(event.pointerId);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!renderer || !raycaster || !camera || instancedTiles.length === 0 || !spinGroup) return;
      if (dragPointer === event.pointerId) {
        const dx = event.clientX - lastPointerX;
        const dy = event.clientY - lastPointerY;
        const elapsedMs = Math.max(1, performance.now() - lastPointerTime);
        if (Math.hypot(event.clientX - pointerStartX, event.clientY - pointerStartY) > 5) moved = true;
        if (moved) {
          dragOverridesIdle = true;
          idleSpinBlend = 0;
          spinGroup.rotation.y += dx * 0.006;
          spinGroup.rotation.x = THREE.MathUtils.clamp(spinGroup.rotation.x + dy * 0.004, -0.58, 0.58);
          angularVelocityY = (dx / elapsedMs) * 0.42;
          angularVelocityX = (dy / elapsedMs) * 0.28;
        }
        lastPointerX = event.clientX;
        lastPointerY = event.clientY;
        lastPointerTime = performance.now();
        scheduleLoop();
        return;
      }
      const bounds = canvas.getBoundingClientRect();
      pointer.set(((event.clientX - bounds.left) / bounds.width) * 2 - 1, -((event.clientY - bounds.top) / bounds.height) * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(instancedTiles, false)[0];
      if (!hit || hit.instanceId === undefined) {
        hoveredNormal = null;
        for (const tile of tileStates) if (!scatteredRef.current) tile.targetLift = 0;
        return;
      }
      const hitGroup = instanceGroups.find((group) => group.mesh === hit.object);
      const hitNormal = hitGroup?.tiles[hit.instanceId]?.normal;
      if (!hitNormal) return;
      hoveredNormal = hitNormal.clone().applyQuaternion(spinGroup.quaternion).normalize();
      for (const tile of tileStates) {
        if (scatteredRef.current) continue;
        worldNormal.copy(tile.normal).applyQuaternion(spinGroup.quaternion).normalize();
        tile.targetLift = worldNormal.dot(hoveredNormal) > 0.94 ? 0.17 : 0;
      }
      scheduleLoop();
    };
    const onPointerUp = (event: PointerEvent) => {
      if (dragPointer !== event.pointerId) return;
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
      dragPointer = null;
      if (!moved) toggleScatter();
    };
    const onPointerLeave = () => {
      if (dragPointer !== null || scatteredRef.current) return;
      hoveredNormal = null;
      for (const tile of tileStates) tile.targetLift = 0;
      scheduleLoop();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleScatter();
      }
    };
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("keydown", onKeyDown);

    const initialize = async () => {
      try {
        const rendererInstance = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        });
        renderer = rendererInstance;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.NoToneMapping;
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));

        const [manifestResponse, gltf] = await Promise.all([
          fetch(MANIFEST_URL, { cache: "no-store" }).then((response) => {
            if (!response.ok) throw new Error("Tile manifest failed to load");
            return response.json() as Promise<TileManifest>;
          }),
          new GLTFLoader().loadAsync(GLB_URL),
        ]);
        if (disposed) return;
        currentManifest = manifestResponse;

        scene = new THREE.Scene();
        scene.add(new THREE.HemisphereLight(0x91cfc0, 0x061012, 0.32));
        const key = new THREE.DirectionalLight(0xb9e9df, 0.46);
        key.position.set(-3.5, -4.5, 5.0);
        scene.add(key);
        spinGroup = new THREE.Group();
        spinGroup.name = "Planet_Interaction_Root";
        scene.add(spinGroup);
        planetRoot = gltf.scene;
        scene.add(planetRoot);
        planetRoot.updateMatrixWorld(true);

        const tileRoots = manifestResponse.tiles.map((record) => {
          const root = planetRoot?.getObjectByName(record.name);
          if (!root) throw new Error(`GLB is missing tile node ${record.name}`);
          return root;
        });
        const sceneTileRoots = new Map(tileRoots.map((root) => [root.name, root]));
        const inverseRoot = new THREE.Matrix4().copy(planetRoot.matrixWorld).invert();
        const matricesByName = new Map<string, THREE.Matrix4>();
        for (const root of tileRoots) {
          root.updateMatrixWorld(true);
          matricesByName.set(root.name, inverseRoot.clone().multiply(root.matrixWorld));
          root.visible = false;
        }
        planetRoot.traverse((object) => {
          if (object instanceof THREE.Mesh && object.name === "Planet_Core") {
            const matteCore = new THREE.MeshPhysicalMaterial({
              color: "#071315",
              roughness: 1,
              metalness: 0,
              clearcoat: 0,
              envMapIntensity: 0,
              specularIntensity: 0,
            });
            object.material = matteCore;
            roleMaterials.push(matteCore);
          }
        });
        if (tileRoots.length !== manifestResponse.tile_count) {
          throw new Error("GLB tile count does not match the First Light manifest");
        }
        if (tileRoots.length !== 162) throw new Error(`Expected 162 Goldberg nodes, loaded ${tileRoots.length}`);

        const activeRecords = manifestResponse.tiles.filter((record) => record.cap_visible);
        tileStates = activeRecords.map((record) => {
          const node = sceneTileRoots.get(record.name);
          if (!node) throw new Error(`Missing GLB node for ${record.name}`);
          const position = new THREE.Vector3();
          const quaternion = new THREE.Quaternion();
          const scale = new THREE.Vector3();
          const restMatrix = matricesByName.get(record.name);
          if (!restMatrix) throw new Error(`Missing GLB transform for ${record.name}`);
          restMatrix.decompose(position, quaternion, scale);
          // The manifest normal is Blender Z-up; convert it to the GLB's Y-up scene coordinates.
          const normal = new THREE.Vector3(record.outward_normal[0], record.outward_normal[2], -record.outward_normal[1]).normalize();
          return {
            node,
            name: record.name,
            role: record.role,
            bandPosition: THREE.MathUtils.clamp(record.band_position, 0, 1),
            restPosition: position,
            restQuaternion: quaternion,
            restScale: scale,
            // Blender extras keep Z-up vectors, while node transforms are exported Y-up.
            normal,
            lift: 0,
            velocity: 0,
            targetLift: 0,
            restMatrix: restMatrix.clone(),
            currentBand: THREE.MathUtils.clamp(record.band_position, 0, 1),
            currentEmission: record.role === "dark" ? 0 : 1,
            instanceIndex: 0,
            meshClass: record.mesh_class,
          } satisfies TileState;
        });

        const faceMaterial = makeInstanceMaterial({ colorAttribute: "aFaceColor", emissionAttribute: "aFaceEmission", kind: "face" });
        const rimMaterial = makeInstanceMaterial({ colorAttribute: "aRimColor", emissionAttribute: "aRimEmission", kind: "rim" });
        const bodyMaterial = new THREE.MeshStandardMaterial({ color: "#182727", metalness: 0.26, roughness: 0.64 });
        roleMaterials.push(faceMaterial, rimMaterial, bodyMaterial);
        uniforms = [faceMaterial.userData.pulseUniform, rimMaterial.userData.pulseUniform];
        const classNames = [...new Set(activeRecords.map((record) => record.mesh_class))];
        for (const meshClass of classNames) {
          const representative = activeRecords.find((record) => record.mesh_class === meshClass)!;
          const representativeRoot = sceneTileRoots.get(representative.name)!;
          representativeRoot.updateMatrixWorld(true);
          const inverseTile = new THREE.Matrix4().copy(representativeRoot.matrixWorld).invert();
          const primitives: THREE.Mesh[] = [];
          representativeRoot.traverse((object) => { if (object instanceof THREE.Mesh) primitives.push(object); });
          if (primitives.length < 3) throw new Error(`GLB tile ${representative.name} has incomplete mesh parts`);
          const geometryParts = primitives.map((mesh) => {
            const geometry = mesh.geometry.clone();
            geometry.applyMatrix4(inverseTile.clone().multiply(mesh.matrixWorld));
            return geometry;
          });
          const geometry = mergeGeometries(geometryParts, true);
          if (!geometry) throw new Error(`Could not instance GLB mesh class ${meshClass}`);
          const tiles = tileStates.filter((tile) => tile.meshClass === meshClass);
          const count = tiles.length;
          const faceColors = new Float32Array(count * 3), faceEmission = new Float32Array(count);
          const rimColors = new Float32Array(count * 3), rimEmission = new Float32Array(count), bandPositions = new Float32Array(count);
          const faceColorAttribute = new THREE.InstancedBufferAttribute(faceColors, 3);
          const faceEmissionAttribute = new THREE.InstancedBufferAttribute(faceEmission, 1);
          const rimColorAttribute = new THREE.InstancedBufferAttribute(rimColors, 3);
          const rimEmissionAttribute = new THREE.InstancedBufferAttribute(rimEmission, 1);
          const bandPositionAttribute = new THREE.InstancedBufferAttribute(bandPositions, 1);
          geometry.setAttribute("aFaceColor", faceColorAttribute);
          geometry.setAttribute("aFaceEmission", faceEmissionAttribute);
          geometry.setAttribute("aRimColor", rimColorAttribute);
          geometry.setAttribute("aRimEmission", rimEmissionAttribute);
          geometry.setAttribute("aBandPosition", bandPositionAttribute);
          const instanced = new THREE.InstancedMesh(geometry, [faceMaterial, bodyMaterial, rimMaterial], count);
          instanced.name = `Tiles_Instanced_${meshClass}`;
          instanced.frustumCulled = false;
          instanced.castShadow = false;
          instanced.receiveShadow = false;
          tiles.forEach((tile, index) => {
            tile.instanceIndex = index;
            instanceMatrix.copy(tile.restMatrix);
            instanced.setMatrixAt(index, instanceMatrix);
            const face = roleColor(tile.role);
            const rim = tile.role === "dark" ? faintMintRim : face;
            face.toArray(faceColors, index * 3); rim.toArray(rimColors, index * 3);
            faceEmission[index] = tile.currentEmission; rimEmission[index] = tile.role === "dark" ? 0.14 : 0.92;
            bandPositions[index] = tile.bandPosition;
          });
          instanced.instanceMatrix.needsUpdate = true;
          spinGroup.add(instanced);
          instancedTiles.push(instanced);
          const group = { meshClass, mesh: instanced, tiles, faceColors: faceColorAttribute, faceEmission: faceEmissionAttribute, rimColors: rimColorAttribute, rimEmission: rimEmissionAttribute, bandPositions: bandPositionAttribute };
          instanceGroups.push(group);
          groupByMeshClass.set(meshClass, group);
          geometryParts.forEach((part) => part.dispose());
        }
        console.info(`[First Light] loaded ${tileRoots.length} GLB tile nodes (${instanceGroups.length} source mesh classes) from ${GLB_URL}; instancing ${tileStates.length} visible cap nodes`);
        planetRoot.add(makeHalo());

        camera = new THREE.OrthographicCamera(-2, 2, 2, -2, 0.1, 100);
        // Blender exported with Y-up, so the hero-facing -Y view became +Z.
        camera.up.set(0, 1, 0);
        // Match Camera_Sculpture_Close after Blender Z-up -> GLB Y-up conversion.
        camera.position.set(0, 0.0675, 9);
        camera.lookAt(0, 0, 0);
        raycaster = new THREE.Raycaster();
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(stage);
        resize();
        observer = new IntersectionObserver((entries) => {
          visible = entries[0]?.isIntersecting ?? true;
          if (visible) scheduleLoop();
          else cancelLoop();
        }, { threshold: 0.01 });
        observer.observe(stage);
        setStatus("ready");
        scheduleLoop();
      } catch (error) {
        console.error("First Light 3D hero fell back to its still image.", error);
        fallback();
      }
    };

    void initialize();
    return () => {
      disposed = true;
      stopMotionRef.current = null;
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("keydown", onKeyDown);
      disposeResources();
    };
  }, []);

  const togglePause = () => {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
    if (pausedRef.current) stopMotionRef.current?.();
  };
  const toggleScatter = () => {
    // The canvas pointer path and the explicit control share the same keyboard-accessible action.
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
  };

  return (
    <div className="planet-widget" aria-label="Interactive First Light tiled planet sculpture">
      <div className="planet-stage" ref={stageRef}>
        <img className={`planet-poster ${status === "ready" ? "is-hidden" : ""}`} src={POSTER_URL} alt="" aria-hidden="true" />
        <canvas
          ref={canvasRef}
          className={`planet-canvas ${status === "ready" ? "is-ready" : ""}`}
          aria-label="Interactive tiled planet. Hover to lift a patch, drag to rotate, and press Enter or click to scatter or reassemble."
          role="button"
          aria-pressed={scattered}
          tabIndex={status === "ready" ? 0 : -1}
        />
        {status === "loading" ? <span className="sr-only" aria-live="polite">Loading planet sculpture</span> : null}
      </div>
      <div className="planet-controls">
        {status === "ready" ? (
          <>
            <span className="planet-hint">Move to lift · Drag to orbit · Click to scatter</span>
            <div className="planet-control-row">
              <button className="planet-control" type="button" onClick={toggleScatter} aria-pressed={scattered}>
                {scattered ? "Reassemble tiles" : "Scatter tiles"}
              </button>
              <button className="planet-control" type="button" onClick={togglePause} aria-pressed={paused}>
                {paused ? "Resume motion" : "Pause motion"}
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
