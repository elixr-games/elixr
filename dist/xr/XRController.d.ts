/// <reference types="webxr" />
import { Group, Object3D } from 'three';
import { GamepadWrapper } from 'gamepad-wrapper';
export declare const PRIVATE: unique symbol;
export declare class XRController extends Group {
    /** @ignore */
    [PRIVATE]: {
        handedness: XRHandedness;
        connected: boolean;
        raySpace: Object3D;
        gamepad: GamepadWrapper;
    };
    constructor(handedness: XRHandedness, parent: Group);
    get connected(): boolean;
    get handedness(): XRHandedness;
    get gamepad(): GamepadWrapper;
    get raySpace(): Object3D<import("three").Object3DEventMap>;
    update(inputSource: XRInputSource, frame: XRFrame, referenceSpace: XRReferenceSpace): void;
    connect(inputSource: XRInputSource): void;
    disconnect(): void;
    updateMatrixWorld(force?: boolean): void;
}
//# sourceMappingURL=XRController.d.ts.map