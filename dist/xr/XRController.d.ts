/// <reference types="webxr" />
import { GamepadWrapper } from 'gamepad-wrapper';
import { Group } from 'three';
export declare const PRIVATE: unique symbol;
export declare class XRController extends Group {
    /** @ignore */
    [PRIVATE]: {
        handedness: XRHandedness;
        connected: boolean;
        raySpace: THREE.Object3D;
        gamepad: GamepadWrapper;
    };
    constructor(handedness: XRHandedness, player: Group);
    get connected(): boolean;
    get handedness(): XRHandedness;
    get gamepad(): GamepadWrapper;
    get raySpace(): import("three").Object3D<import("three").Event>;
    update(inputSource: XRInputSource, frame: XRFrame, referenceSpace: XRReferenceSpace): void;
    connect(inputSource: XRInputSource): void;
    disconnect(): void;
    updateMatrixWorld(force?: boolean): void;
}
//# sourceMappingURL=XRController.d.ts.map