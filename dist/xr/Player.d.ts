import { Group, Object3D, WebXRManager } from 'three';
import { XRController } from './XRController';
export declare const PRIVATE: unique symbol;
export declare class Player extends Group {
    /** @ignore */
    [PRIVATE]: {
        head: Object3D;
        controllers: {
            left: XRController;
            right: XRController;
        };
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
    get head(): Object3D<import("three").Event>;
    updateMatrixWorld(force?: boolean): void;
    update(xrManager: WebXRManager): void;
}
//# sourceMappingURL=Player.d.ts.map