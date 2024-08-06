import { System } from 'ecsy';
import { Core } from './Core';
export class GameSystem extends System {
    /** {@link Core} object that this system is registered to. */
    core;
    /**
     * Mutable reference to the optional {@link SystemConfig} component associated
     * with this system.
     */
    config;
    /** An optional {@link SystemConfig} class for configuring this system. */
    static systemConfig;
    /**
     * Defines what {@link GameComponent} the System will query for. This needs to
     * be user defined.
     */
    static queries;
    _isImmersive = false;
    constructor(world, attributes) {
        super(world, attributes);
        this.core = Core.getInstance();
        this.config = attributes?.config;
    }
    get globals() {
        return this.core.globals;
    }
    get scene() {
        return this.core.scene;
    }
    get renderer() {
        return this.core.renderer;
    }
    get camera() {
        return this.core.inlineCamera;
    }
    get player() {
        return this.core.player;
    }
    /** This function is called on the frames in which the app enters immersive */
    initXR() { }
    /** This function is called on the frames in which the app exits immersive */
    exitXR() { }
    /** @ignore */
    execute(delta, time) {
        const isImmersive = this.core.isImmersive();
        if (isImmersive) {
            if (!this._isImmersive)
                this.initXR();
        }
        else {
            if (this._isImmersive)
                this.exitXR();
        }
        this._isImmersive = isImmersive;
        this.update(delta, time);
    }
    /**
     * Get a list of all {@link GameObject} of the given queryId in
     * {@link GameSystem.queries}.
     */
    queryGameObjects(queryId) {
        if (!this.queries[queryId])
            throw 'Query id does not exist in current game system';
        return this.queries[queryId].results.map((entity) => entity.gameObject);
    }
    /**
     * Get a list of all {@link GameObject} of the given queryId that are added in
     * this frame in {@link GameSystem.queries}. This does not include the
     * GameObjects that gets added in GameSystems that execute after this system.
     */
    queryAddedGameObjects(queryId) {
        if (!this.queries[queryId]) {
            throw 'Query id does not exist in current game system';
        }
        else if (!this.queries[queryId].added) {
            throw 'This query does not listen to added events';
        }
        return this.queries[queryId].added?.map((entity) => entity.gameObject);
    }
    /**
     * Get a list of all {@link GameObject} of the given queryId that are removed
     * in this frame in {@link GameSystem.queries}. This does not include the
     * GameObjects that gets removed in GameSystems that execute after this
     * system.
     */
    queryRemovedGameObjects(queryId) {
        if (!this.queries[queryId]) {
            throw 'Query id does not exist in current game system';
        }
        else if (!this.queries[queryId].removed) {
            throw 'This query does not listen to removed events';
        }
        return this.queries[queryId].removed?.map((entity) => entity.gameObject);
    }
    /**
     * This function is called on each frame {@link Core} is executed. All of the
     * queries defined on the class are available here.
     */
    update(_delta, _time) { }
}
export class XRGameSystem extends GameSystem {
    /** @ignore */
    execute(delta, time) {
        const isImmersive = this.core.isImmersive();
        if (isImmersive) {
            if (!this._isImmersive)
                this.initXR();
            this.update(delta, time);
        }
        else {
            if (this._isImmersive)
                this.exitXR();
        }
        this._isImmersive = isImmersive;
    }
}
export class SingleUseGameSystem extends GameSystem {
    /** @ignore */
    execute(delta, time) {
        this.update(delta, time);
        this.stop();
    }
}
export class SingleUseXRGameSystem extends GameSystem {
    /** @ignore */
    execute(delta, time) {
        if (this.core.isImmersive()) {
            this.update(delta, time);
            this.stop();
        }
    }
}
//# sourceMappingURL=GameSystem.js.map