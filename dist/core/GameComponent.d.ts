import { Component, ComponentSchema } from 'ecsy';
import { GameObject } from './GameObject';
import { GameSystem } from './GameSystem';
export declare class GameComponent<C> extends Component<C> {
    gameObject: GameObject;
    onRemove(): void;
    onAdd(): void;
}
export declare class SystemConfig extends GameComponent<any> {
    system: GameSystem;
}
export interface GameComponentConstructor<C extends GameComponent<any>> {
    schema: ComponentSchema;
    isComponent: true;
    new (props?: Partial<Omit<C, keyof GameComponent<any>>> | false): C;
}
//# sourceMappingURL=GameComponent.d.ts.map