import { VERSION as ELIXR_VERSION } from './version';
import { REVISION as THREE_VERSION } from 'three';
const FIGLET = String.raw `
___________ __   __ ____  _____________ 
\_   _____/|  | |__|\   \/  /\______   \
 |    __)_ |  | |  | \     /  |       _/
 |        \|  |_|  | /     \  |    |   \
/_______  /|____/__|/___/\  \ |___/|_  /
        \/                \_/        \/ `;
/* -------------------------------------------------------------------------- */
/*                                 3D Library                                 */
/* -------------------------------------------------------------------------- */
export * from './graphics/CustomTHREE';
/* -------------------------------------------------------------------------- */
/*                           Entity Component System                          */
/* -------------------------------------------------------------------------- */
export { Not, Types } from 'ecsy';
export { GameObject, PrimitiveType } from './core/GameObject';
export { GameComponent } from './core/GameComponent';
export { SystemConfig } from './core/GameComponent';
export { GameSystem, XRGameSystem, SingleUseGameSystem, SingleUseXRGameSystem, } from './core/GameSystem';
export { Core } from './core/Core';
/* -------------------------------------------------------------------------- */
/*                                Gamepad Utils                               */
/* -------------------------------------------------------------------------- */
export { BUTTONS, AXES, GamepadWrapper } from 'gamepad-wrapper';
/* -------------------------------------------------------------------------- */
/*                                Locomotion                                  */
/* -------------------------------------------------------------------------- */
export { XRSnapTurnSystem, } from './xr/locomotion/XRSnapTurnSystem';
export { XRSmoothTurnSystem, } from './xr/locomotion/XRSmoothTurnSystem';
/* -------------------------------------------------------------------------- */
/*                                    Enums                                   */
/* -------------------------------------------------------------------------- */
export { JOYSTICK_STATES, HANDEDNESS, SESSION_MODE } from './core/enums';
console.log(FIGLET + ` v${ELIXR_VERSION}`);
console.log(`THREE Version (https://github.com/supermedium/three.js): r${THREE_VERSION}`);
export { ELIXR_VERSION };
//# sourceMappingURL=index.js.map