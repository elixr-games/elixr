import { GameComponent, GameComponentConstructor } from './GameComponent';
import { Entity } from 'ecsy';
import { THREE } from '../graphics/CustomTHREE';
export declare type ExtendedEntity = Entity & {
    gameObject: GameObject;
};
export declare enum PrimitiveType {
    Plane = "Plane",
    Cube = "Cube",
    Sphere = "Sphere",
    Cylinder = "Cylinder",
    Capsule = "Capsule",
    Cone = "Cone",
    Quad = "Quad"
}
/**
 * This class extends THREE.Object3D
 *
 * @see https://threejs.org/docs/#api/en/core/Object3D
 */
export declare class GameObject extends THREE.Object3D {
    private _ecsyEntity;
    isGameObject: boolean;
    constructor();
    get alive(): boolean;
    copy(_source: this, _recursive?: boolean): this;
    clone(_recursive?: boolean): this;
    /** Add a {@link GameComponent} to the entity. */
    addComponent(GameComponent: GameComponentConstructor<GameComponent<any>>, values?: Partial<Omit<GameComponent<any>, keyof GameComponent<any>>>): void;
    /** Get an immutable reference to a {@link GameComponent} on this entity. */
    getComponent(GameComponent: GameComponentConstructor<GameComponent<any>>, includeRemoved?: boolean): Readonly<GameComponent<any>>;
    /** Get an mutable reference to a {@link GameComponent} on this entity. */
    getMutableComponent(GameComponent: GameComponentConstructor<GameComponent<any>>): GameComponent<any>;
    /**
     * Get a list of {@link GameComponent} types that have been added to this
     * entity.
     */
    getComponentTypes(): import("ecsy").Component<any>[];
    /**
     * Get an object containing all the {@link GameComponent} on this entity, where
     * the object keys are the component types.
     */
    getComponents(): {
        [componentName: string]: import("ecsy").Component<any>;
    };
    /**
     * Get an object containing all the {@link GameComponent} that are slated to be
     * removed from this entity, where the object keys are the component types.
     */
    getComponentsToRemove(): {
        [componentName: string]: import("ecsy").Component<any>;
    };
    /** Get a {@link GameComponent} that is slated to be removed from this entity. */
    getRemovedComponent(GameComponent: GameComponentConstructor<GameComponent<any>>): Readonly<GameComponent<any>>;
    /**
     * Boolean value indicating whether the entity has all {@link GameComponent} in
     * a list.
     */
    hasAllComponents(GameComponents: GameComponentConstructor<any>[]): boolean;
    /**
     * Boolean value indicating whether the entity has any {@link GameComponent} in
     * a list.
     */
    hasAnyComponents(GameComponents: GameComponentConstructor<any>[]): boolean;
    /**
     * Boolean value indicating whether the entity has the given
     * {@link GameComponent}.
     */
    hasComponent(GameComponent: GameComponentConstructor<any>): boolean;
    /** Remove all {@link GameComponent} on this entity. */
    removeAllComponents(forceImmediate: boolean): void;
    /** Remove a {@link GameComponent} from the entity. */
    removeComponent(GameComponent: GameComponentConstructor<any>, forceImmediate: boolean): void;
    /** Destroy this GameObject */
    destroy(forceImmediate?: boolean): void;
}
//# sourceMappingURL=GameObject.d.ts.map