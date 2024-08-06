import { Attributes, World as EcsyWorld, Entity } from 'ecsy';
import { GameComponentConstructor, SystemConfig } from './GameComponent';
import { GameSystem, GameSystemConstructor } from './GameSystem';
import { Player } from '../xr/Player';
import { SESSION_MODE } from './enums';
import { THREE } from '../graphics/CustomTHREE';
export declare class Core {
    private static _instance;
    private _ecsyWorld;
    private _gameManager;
    private _threeScene;
    /**
     * Main scene for the experience which allows you to set up what and where is
     * to be rendered by three.js. This is where you place game objects, lights
     * and cameras.
     *
     * @see https://threejs.org/docs/index.html?q=Scene#api/en/scenes/Scene
     */
    get scene(): THREE.Scene;
    get ecsWorld(): EcsyWorld<Entity>;
    /**
     * WebGL renderer used to render the scene.
     *
     * @see https://threejs.org/docs/index.html?q=renderer#api/en/renderers/WebGLRenderer
     */
    renderer: THREE.WebGLRenderer;
    /**
     * Camera for inline mode, DO NOT USE for getting player head transform, use
     * {@link Core.playerHead} instead.
     */
    inlineCamera: THREE.PerspectiveCamera;
    /** Global data store */
    globals: Map<string, any>;
    player: Player;
    get initialized(): boolean;
    get playerHead(): THREE.Object3D<THREE.Event>;
    /** Enum value indicating the current XRSessionMode */
    get sessionMode(): SESSION_MODE;
    static init(sceneContainer: HTMLElement): Promise<Core>;
    private constructor();
    static getInstance(): Core;
    private _setupPlayerSpace;
    private _initECS;
    private _initGraphics;
    private _setupRenderLoop;
    /** Boolean value for whether player is in immersive mode. */
    isImmersive(): boolean;
    /** Register a {@link GameSystem}. */
    registerGameSystem(GameSystem: GameSystemConstructor<any>, attributes?: Attributes): void;
    /** Get a {@link GameSystem} registered in this world. */
    getGameSystem(GameSystem: GameSystemConstructor<any>): any;
    /**
     * Get the mutable {@link SystemConfig} component associated with the specified
     * {@link GameSystem}.
     */
    getGameSystemConfig(GameSystem: GameSystemConstructor<GameSystem>): SystemConfig;
    /** Get a list of {@link GameSystem} registered in this world. */
    getGameSystems(): import("ecsy").System<Entity>[];
    /** Register a {@link GameComponent} */
    registerGameComponent(GameComponent: GameComponentConstructor<any>): void;
    /**
     * Boolean value indicating whether a {@link GameComponent} has been registered
     * to Core or not.
     */
    hasRegisteredGameComponent(GameComponent: GameComponentConstructor<any>): boolean;
    /** Unregister a {@link GameSystem}. */
    unregisterGameSystem(GameSystem: GameSystemConstructor<any>): void;
    /** Resume execution of registered systems. */
    play(): void;
    /** Pause execution of registered systems. */
    stop(): void;
}
//# sourceMappingURL=Core.d.ts.map