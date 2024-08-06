import { HANDEDNESS } from '../../core/enums';
import { SystemConfig } from '../../core/GameComponent';
import { XRGameSystem } from '../../core/GameSystem';
export interface XRSmoothTurnConfig extends XRSmoothTurnComponent {
    JOYSTICK_DEADZONE: number;
    MAX_ANGULAR_SPEED: number;
    CONTROLLER_HANDEDNESS: HANDEDNESS;
}
declare class XRSmoothTurnComponent extends SystemConfig {
}
export declare class XRSmoothTurnSystem extends XRGameSystem {
    private _config;
    init(): void;
    update(delta: number): void;
}
export {};
//# sourceMappingURL=XRSmoothTurnSystem.d.ts.map