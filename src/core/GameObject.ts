import { GameComponent, GameComponentConstructor } from './GameComponent';

import { Core } from './Core';
import { Entity } from 'ecsy';
import { THREE } from '../graphics/CustomTHREE';

export type ExtendedEntity = Entity & {
	gameObject: GameObject;
};

export enum PrimitiveType {
	Plane = 'Plane',
	Cube = 'Cube',
	Sphere = 'Sphere',
	Cylinder = 'Cylinder',
	Capsule = 'Capsule',
	Cone = 'Cone',
	Quad = 'Quad',
}

/**
 * This class extends THREE.Object3D
 *
 * @see https://threejs.org/docs/#api/en/core/Object3D
 */
export class GameObject extends THREE.Object3D {
	private _ecsyEntity: ExtendedEntity;

	isGameObject: boolean = true;

	constructor() {
		super();
		this._ecsyEntity =
			Core.getInstance().ecsWorld.createEntity() as ExtendedEntity;
		this._ecsyEntity.gameObject = this;
		Core.getInstance().scene.add(this);
	}

	get alive(): boolean {
		return this._ecsyEntity.alive;
	}

	copy(_source: this, _recursive?: boolean): this {
		throw new Error('GameObject.copy() is not permitted');
	}

	clone(_recursive?: boolean): this {
		throw new Error('GameObject.clone() is not permitted');
	}

	/** Add a {@link GameComponent} to the entity. */
	addComponent(
		GameComponent: GameComponentConstructor<GameComponent<any>>,
		values?: Partial<Omit<GameComponent<any>, keyof GameComponent<any>>>,
	) {
		this._ecsyEntity.addComponent(GameComponent, values);
		const newComponent = this.getMutableComponent(GameComponent);
		newComponent.gameObject = this;
		if (newComponent.onAdd) newComponent.onAdd();
	}

	/** Get an immutable reference to a {@link GameComponent} on this entity. */
	getComponent(
		GameComponent: GameComponentConstructor<GameComponent<any>>,
		includeRemoved?: boolean,
	): Readonly<GameComponent<any>> {
		return this._ecsyEntity.getComponent(GameComponent, includeRemoved);
	}

	/** Get an mutable reference to a {@link GameComponent} on this entity. */
	getMutableComponent(
		GameComponent: GameComponentConstructor<GameComponent<any>>,
	): GameComponent<any> {
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
	getRemovedComponent(
		GameComponent: GameComponentConstructor<GameComponent<any>>,
	): Readonly<GameComponent<any>> {
		return this._ecsyEntity.getRemovedComponent(GameComponent);
	}

	/**
	 * Boolean value indicating whether the entity has all {@link GameComponent} in
	 * a list.
	 */
	hasAllComponents(GameComponents: GameComponentConstructor<any>[]): boolean {
		return this._ecsyEntity.hasAllComponents(GameComponents);
	}

	/**
	 * Boolean value indicating whether the entity has any {@link GameComponent} in
	 * a list.
	 */
	hasAnyComponents(GameComponents: GameComponentConstructor<any>[]): boolean {
		return this._ecsyEntity.hasAnyComponents(GameComponents);
	}

	/**
	 * Boolean value indicating whether the entity has the given
	 * {@link GameComponent}.
	 */
	hasComponent(GameComponent: GameComponentConstructor<any>): boolean {
		return this._ecsyEntity.hasComponent(GameComponent);
	}

	/** Remove all {@link GameComponent} on this entity. */
	removeAllComponents(forceImmediate: boolean): void {
		this._ecsyEntity.removeAllComponents(forceImmediate);
	}

	/** Remove a {@link GameComponent} from the entity. */
	removeComponent(
		GameComponent: GameComponentConstructor<any>,
		forceImmediate: boolean,
	): void {
		const component = this._ecsyEntity.getMutableComponent(GameComponent);
		if (component?.onRemove) component.onRemove();
		this._ecsyEntity.removeComponent(GameComponent, forceImmediate);
	}

	/** Destroy this GameObject */
	destroy(forceImmediate?: boolean) {
		this.parent?.remove(this);
		try {
			this._ecsyEntity.remove(forceImmediate ?? false);
		} catch (e) {
			console.warn(e);
		}
	}
}
