import { Core } from './Core';
import { THREE } from '../graphics/CustomTHREE';
export var PrimitiveType;
(function (PrimitiveType) {
    PrimitiveType["Plane"] = "Plane";
    PrimitiveType["Cube"] = "Cube";
    PrimitiveType["Sphere"] = "Sphere";
    PrimitiveType["Cylinder"] = "Cylinder";
    PrimitiveType["Capsule"] = "Capsule";
    PrimitiveType["Cone"] = "Cone";
    PrimitiveType["Quad"] = "Quad";
})(PrimitiveType || (PrimitiveType = {}));
/**
 * This class extends THREE.Object3D
 *
 * @see https://threejs.org/docs/#api/en/core/Object3D
 */
export class GameObject extends THREE.Object3D {
    _ecsyEntity;
    isGameObject = true;
    constructor() {
        super();
        this._ecsyEntity =
            Core.getInstance().ecsWorld.createEntity();
        this._ecsyEntity.gameObject = this;
        Core.getInstance().scene.add(this);
    }
    get alive() {
        return this._ecsyEntity.alive;
    }
    copy(_source, _recursive) {
        throw new Error('GameObject.copy() is not permitted');
    }
    clone(_recursive) {
        throw new Error('GameObject.clone() is not permitted');
    }
    /** Add a {@link GameComponent} to the entity. */
    addComponent(GameComponent, values) {
        this._ecsyEntity.addComponent(GameComponent, values);
        const newComponent = this.getMutableComponent(GameComponent);
        newComponent.gameObject = this;
        if (newComponent.onAdd)
            newComponent.onAdd();
    }
    /** Get an immutable reference to a {@link GameComponent} on this entity. */
    getComponent(GameComponent, includeRemoved) {
        return this._ecsyEntity.getComponent(GameComponent, includeRemoved);
    }
    /** Get an mutable reference to a {@link GameComponent} on this entity. */
    getMutableComponent(GameComponent) {
        return this._ecsyEntity.getMutableComponent(GameComponent);
    }
    /**
     * Get a list of {@link GameComponent} types that have been added to this
     * entity.
     */
    getComponentTypes() {
        return this._ecsyEntity.getComponentTypes();
    }
    /**
     * Get an object containing all the {@link GameComponent} on this entity, where
     * the object keys are the component types.
     */
    getComponents() {
        return this._ecsyEntity.getComponents();
    }
    /**
     * Get an object containing all the {@link GameComponent} that are slated to be
     * removed from this entity, where the object keys are the component types.
     */
    getComponentsToRemove() {
        return this._ecsyEntity.getComponentsToRemove();
    }
    /** Get a {@link GameComponent} that is slated to be removed from this entity. */
    getRemovedComponent(GameComponent) {
        return this._ecsyEntity.getRemovedComponent(GameComponent);
    }
    /**
     * Boolean value indicating whether the entity has all {@link GameComponent} in
     * a list.
     */
    hasAllComponents(GameComponents) {
        return this._ecsyEntity.hasAllComponents(GameComponents);
    }
    /**
     * Boolean value indicating whether the entity has any {@link GameComponent} in
     * a list.
     */
    hasAnyComponents(GameComponents) {
        return this._ecsyEntity.hasAnyComponents(GameComponents);
    }
    /**
     * Boolean value indicating whether the entity has the given
     * {@link GameComponent}.
     */
    hasComponent(GameComponent) {
        return this._ecsyEntity.hasComponent(GameComponent);
    }
    /** Remove all {@link GameComponent} on this entity. */
    removeAllComponents(forceImmediate) {
        this._ecsyEntity.removeAllComponents(forceImmediate);
    }
    /** Remove a {@link GameComponent} from the entity. */
    removeComponent(GameComponent, forceImmediate) {
        const component = this._ecsyEntity.getMutableComponent(GameComponent);
        if (component?.onRemove)
            component.onRemove();
        this._ecsyEntity.removeComponent(GameComponent, forceImmediate);
    }
    /** Destroy this GameObject */
    destroy(forceImmediate) {
        this.parent?.remove(this);
        try {
            this._ecsyEntity.remove(forceImmediate ?? false);
        }
        catch (e) {
            console.warn(e);
        }
    }
}
//# sourceMappingURL=GameObject.js.map