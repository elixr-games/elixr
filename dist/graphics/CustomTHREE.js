import { BufferGeometry, Mesh } from 'three';
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree, } from 'three-mesh-bvh';
BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
Mesh.prototype.raycast = acceleratedRaycast;
export { AmbientLight, AnimationClip, AnimationLoader, AnimationMixer, AnimationObjectGroup, AnimationUtils, ArrayCamera, ArrowHelper, Audio, AudioAnalyser, AudioContext, AudioListener, AudioLoader, AxesHelper, Bone, BooleanKeyframeTrack, Box2, Box3, Box3Helper, BoxHelper, BufferGeometry, BufferGeometryLoader, Cache, Camera, CameraHelper, CanvasTexture, Clock, Color, ColorKeyframeTrack, 
// CompressedCubeTexture,
CompressedTexture, CompressedTextureLoader, CubeCamera, CubeTexture, CubeTextureLoader, CubicInterpolant, Curve, CurvePath, Cylindrical, Data3DTexture, DataArrayTexture, DataTexture, DataTextureLoader, DefaultLoadingManager, DepthTexture, DirectionalLight, DirectionalLightHelper, DiscreteInterpolant, Euler, EventDispatcher, FileLoader, Fog, FogExp2, FramebufferTexture, Frustum, GLBufferAttribute, GridHelper, Group, HemisphereLight, HemisphereLightHelper, ImageBitmapLoader, ImageLoader, ImageUtils, InstancedBufferAttribute, InstancedBufferGeometry, InstancedInterleavedBuffer, InstancedMesh, InterleavedBuffer, InterleavedBufferAttribute, Interpolant, KeyframeTrack, LOD, Layers, Light, LightProbe, Line, Line3, LineLoop, LineSegments, LinearInterpolant, Loader, LoaderUtils, LoadingManager, MaterialLoader, MathUtils, Matrix3, Matrix4, Mesh, NumberKeyframeTrack, Object3D, ObjectLoader, OrthographicCamera, PMREMGenerator, Path, PerspectiveCamera, Plane, PlaneHelper, PointLight, PointLightHelper, Points, PolarGridHelper, PositionalAudio, PropertyBinding, PropertyMixer, Quaternion, QuaternionKeyframeTrack, QuaternionLinearInterpolant, REVISION, Ray, Raycaster, RectAreaLight, Scene, ShaderChunk, ShaderLib, Shape, ShapePath, ShapeUtils, Skeleton, SkeletonHelper, SkinnedMesh, Source, Sphere, Spherical, SphericalHarmonics3, SpotLight, SpotLightHelper, Sprite, StereoCamera, StringKeyframeTrack, Texture, TextureLoader, Triangle, Uniform, UniformsGroup, UniformsLib, UniformsUtils, Vector2, Vector3, Vector4, VectorKeyframeTrack, VideoTexture, WebGL1Renderer, WebGL3DRenderTarget, WebGLArrayRenderTarget, WebGLCubeRenderTarget, WebGLMultipleRenderTargets, WebGLRenderTarget, WebGLRenderer, WebGLUtils, } from 'three';
export * from 'three/src/geometries/Geometries.js';
export * from 'three/src/materials/Materials.js';
export * from 'three/src/core/BufferAttribute.js';
export * from 'three/src/extras/curves/Curves.js';
export * from 'three/src/constants.js';
export * as THREE from 'three';
//# sourceMappingURL=CustomTHREE.js.map