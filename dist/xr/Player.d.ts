import { Group, Object3D } from 'three';
import { XRController } from './XRController';
import { WebXRManager } from 'three/src/renderers/webxr/WebXRManager';
export declare const PRIVATE: unique symbol;
export declare class Player extends Group {
    /** @ignore */
    [PRIVATE]: {
        head: Object3D;
        controllers: {
            left: XRController;
            right: XRController;
        };
        localSpace: Group;
    };
    constructor();
    get controllers(): {
        left: XRController;
        right: XRController;
    };
    get bothControllersConnected(): boolean;
    /**
     * Accurate source for player head transform, can be used to attach game
     * objects / audio listeners.
     */
    get head(): Object3D<import("three").Object3DEventMap>;
    get yOffset(): number;
    set yOffset(yOffset: number);
    get localSpace(): Group<import("three").Object3DEventMap>;
    updateMatrixWorld(force?: boolean): void;
    update(xrManager: WebXRManager): void;
}
//# sourceMappingURL=Player.d.ts.map