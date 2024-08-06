import { Attributes, System, SystemQueries, World } from 'ecsy';
import { GameComponentConstructor, SystemConfig } from './GameComponent';
import { Core } from './Core';
export declare class GameSystem extends System {
    /** {@link Core} object that this system is registered to. */
    core: Core;
    /**
     * Mutable reference to the optional {@link SystemConfig} component associated
     * with this system.
     */
    config?: SystemConfig;
    /** An optional {@link SystemConfig} class for configuring this system. */
    static systemConfig?: GameComponentConstructor<SystemConfig>;
    /**
     * Defines what {@link GameComponent} the System will query for. This needs to
     * be user defined.
     */
    static queries: SystemQueries;
    protected _isImmersive: boolean;
    constructor(world: World, attributes?: Attributes);
    get globals(): Map<string, any>;
    get scene(): import("three").Scene;
    get renderer(): import("three").WebGLRenderer;
    get camera(): import("three").PerspectiveCamera;
    get player(): import("../xr/Player").Player;
    /** This function is called on the frames in which the app enters immersive */
    initXR(): void;
    /** This function is called on the frames in which the app exits immersive */
    exitXR(): void;
    /** @ignore */
    execute(delta: number, time: number): void;
    /**
     * Get a list of all {@link GameObject} of the given queryId in
     * {@link GameSystem.queries}.
     */
    queryGameObjects(queryId: string): import("./GameObject").GameObject[];
    /**
     * Get a list of all {@link GameObject} of the given queryId that are added in
     * this frame in {@link GameSystem.queries}. This does not include the
     * GameObjects that gets added in GameSystems that execute after this system.
     */
    queryAddedGameObjects(queryId: string): import("./GameObject").GameObject[];
    /**
     * Get a list of all {@link GameObject} of the given queryId that are removed
     * in this frame in {@link GameSystem.queries}. This does not include the
     * GameObjects that gets removed in GameSystems that execute after this
     * system.
     */
    queryRemovedGameObjects(queryId: string): import("./GameObject").GameObject[];
    /**
     * This function is called on each frame {@link Core} is executed. All of the
     * queries defined on the class are available here.
     */
    update(_delta: number, _time: number): void;
}
export declare class XRGameSystem extends GameSystem {
    /** @ignore */
    execute(delta: number, time: number): void;
}
export declare class SingleUseGameSystem extends GameSystem {
    /** @ignore */
    execute(delta: number, time: number): void;
}
export declare class SingleUseXRGameSystem extends GameSystem {
    /** @ignore */
    execute(delta: number, time: number): void;
}
export interface GameSystemConstructor<T extends GameSystem> {
    isSystem: true;
    queries: SystemQueries;
    systemConfig?: GameComponentConstructor<SystemConfig>;
    new (...args: any): T;
}
//# sourceMappingURL=GameSystem.d.ts.map