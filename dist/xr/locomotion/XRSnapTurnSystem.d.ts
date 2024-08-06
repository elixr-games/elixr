import { HANDEDNESS } from '../../core/enums';
import { SystemConfig } from '../../core/GameComponent';
import { XRGameSystem } from '../../core/GameSystem';
export interface XRSnapTurnConfig extends XRSnapTurnComponent {
    JOYSTICK_ANGLE_MIN: number;
    JOYSTICK_ANGLE_MAX: number;
    JOYSTICK_DEADZONE: number;
    SNAP_ANGLE: number;
    CONTROLLER_HANDEDNESS: HANDEDNESS;
}
declare class XRSnapTurnComponent extends SystemConfig {
}
export declare class XRSnapTurnSystem extends XRGameSystem {
    private _prevState;
    private _config;
    init(): void;
    update(): void;
}
export {};
//# sourceMappingURL=XRSnapTurnSystem.d.ts.map