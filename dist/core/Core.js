import { World as EcsyWorld } from 'ecsy';
import { GLTFModelLoader } from '../graphics/GLTFModelLoader';
import { MeshRenderer } from '../graphics/meshes/MeshRendererComponent';
import { Player } from '../xr/Player';
import { SESSION_MODE } from './enums';
import { THREE } from '../graphics/CustomTHREE';
export class Core {
    static _instance;
    _ecsyWorld;
    _gameManager;
    _threeScene;
    /**
     * Main scene for the experience which allows you to set up what and where is
     * to be rendered by three.js. This is where you place game objects, lights
     * and cameras.
     *
     * @see https://threejs.org/docs/index.html?q=Scene#api/en/scenes/Scene
     */
    get scene() {
        return this._threeScene;
    }
    get ecsWorld() {
        return this._ecsyWorld;
    }
    /**
     * WebGL renderer used to render the scene.
     *
     * @see https://threejs.org/docs/index.html?q=renderer#api/en/renderers/WebGLRenderer
     */
    renderer;
    /**
     * Camera for inline mode, DO NOT USE for getting player head transform, use
     * {@link Core.playerHead} instead.
     */
    inlineCamera;
    /** Global data store */
    globals = new Map();
    player;
    get initialized() {
        return Core._instance != null;
    }
    get playerHead() {
        return this.player.head;
    }
    /** Enum value indicating the current XRSessionMode */
    get sessionMode() {
        if (!this.renderer.xr.isPresenting) {
            return SESSION_MODE.INLINE;
        }
        else {
            const session = this.renderer.xr.getSession();
            if (session.environmentBlendMode === 'opaque') {
                return SESSION_MODE.IMMERSIVE_VR;
            }
            else {
                return SESSION_MODE.IMMERSIVE_AR;
            }
        }
    }
    static async init(sceneContainer) {
        if (Core._instance) {
            throw new Error('Core already initialized');
        }
        const coreInstance = new Core(sceneContainer);
        return coreInstance;
    }
    constructor(sceneContainer) {
        Core._instance = this;
        this._initECS();
        this._initGraphics();
        this._setupPlayerSpace();
        GLTFModelLoader.init(this.renderer);
        sceneContainer.appendChild(this.renderer.domElement);
        this._setupRenderLoop();
    }
    static getInstance() {
        if (!Core._instance) {
            throw new Error('Core not initialized');
        }
        return Core._instance;
    }
    _setupPlayerSpace() {
        this.player = new Player();
        this.scene.add(this.player);
        this.player.add(this.inlineCamera);
    }
    _initECS() {
        this._ecsyWorld = new EcsyWorld();
        this._gameManager = this._ecsyWorld.createEntity();
    }
    _initGraphics() {
        this.inlineCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            multiviewStereo: true,
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.xr.enabled = true;
        this.inlineCamera.position.set(0, 1.7, 0);
        const onWindowResize = () => {
            this.inlineCamera.aspect = window.innerWidth / window.innerHeight;
            this.inlineCamera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onWindowResize, false);
        this._threeScene = new THREE.Scene();
        this.registerGameComponent(MeshRenderer);
    }
    _setupRenderLoop() {
        const clock = new THREE.Clock();
        const render = () => {
            const delta = clock.getDelta();
            const elapsedTime = clock.elapsedTime;
            this.player.update(this.renderer.xr);
            this._ecsyWorld.execute(delta, elapsedTime);
            this.renderer.render(this.scene, this.inlineCamera);
        };
        this.renderer.setAnimationLoop(render);
    }
    /** Boolean value for whether player is in immersive mode. */
    isImmersive() {
        return this.renderer.xr.isPresenting;
    }
    /** Register a {@link GameSystem}. */
    registerGameSystem(GameSystem, attributes = {}) {
        if (GameSystem.systemConfig) {
            this._ecsyWorld.registerComponent(GameSystem.systemConfig);
            this._gameManager.addComponent(GameSystem.systemConfig);
            attributes.config = this._gameManager.getMutableComponent(GameSystem.systemConfig);
        }
        this._ecsyWorld.registerSystem(GameSystem, attributes);
    }
    /** Get a {@link GameSystem} registered in this world. */
    getGameSystem(GameSystem) {
        return this._ecsyWorld.getSystem(GameSystem);
    }
    /**
     * Get the mutable {@link SystemConfig} component associated with the specified
     * {@link GameSystem}.
     */
    getGameSystemConfig(GameSystem) {
        return this.getGameSystem(GameSystem).config;
    }
    /** Get a list of {@link GameSystem} registered in this world. */
    getGameSystems() {
        return this._ecsyWorld.getSystems();
    }
    /** Register a {@link GameComponent} */
    registerGameComponent(GameComponent) {
        this._ecsyWorld.registerComponent(GameComponent);
    }
    /**
     * Boolean value indicating whether a {@link GameComponent} has been registered
     * to Core or not.
     */
    hasRegisteredGameComponent(GameComponent) {
        return this._ecsyWorld.hasRegisteredComponent(GameComponent);
    }
    /** Unregister a {@link GameSystem}. */
    unregisterGameSystem(GameSystem) {
        this._ecsyWorld.unregisterSystem(GameSystem);
    }
    /** Resume execution of registered systems. */
    play() {
        this._ecsyWorld.play();
    }
    /** Pause execution of registered systems. */
    stop() {
        this._ecsyWorld.stop();
    }
}
//# sourceMappingURL=Core.js.map