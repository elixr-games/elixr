/// <reference types="webxr" />
import { Group, Object3D, Object3DEventMap } from 'three';
import { GamepadWrapper } from 'gamepad-wrapper';
export declare const PRIVATE: unique symbol;
interface ConnectedEventData {
    type: 'connected';
    data: {
        inputSource: XRInputSource;
        gamepad: GamepadWrapper;
    };
}
interface DisconnectedEventData {
    type: 'disconnected';
}
type ExtendedEventMap = Object3DEventMap & {
    connected: ConnectedEventData;
    disconnected: DisconnectedEventData;
};
export declare class XRController extends Group<ExtendedEventMap> {
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
    get raySpace(): Object3D<Object3DEventMap>;
    update(inputSource: XRInputSource, frame: XRFrame, referenceSpace: XRReferenceSpace): void;
    connect(inputSource: XRInputSource): void;
    disconnect(): void;
    updateMatrixWorld(force?: boolean): void;
}
export {};
//# sourceMappingURL=XRController.d.ts.map