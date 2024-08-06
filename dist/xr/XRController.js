import { GamepadWrapper } from 'gamepad-wrapper';
import { Group } from 'three';
export const PRIVATE = Symbol('@elixr/xr/xr-controller');
export class XRController extends Group {
    /** @ignore */
    [PRIVATE] = {
        handedness: null,
        connected: false,
        raySpace: new Group(),
        gamepad: null,
    };
    constructor(handedness, player) {
        super();
        player.add(this);
        this[PRIVATE].handedness = handedness;
        player.add(this[PRIVATE].raySpace);
    }
    get connected() {
        return this[PRIVATE].connected;
    }
    get handedness() {
        return this[PRIVATE].handedness;
    }
    get gamepad() {
        return this[PRIVATE].gamepad;
    }
    get raySpace() {
        return this[PRIVATE].raySpace;
    }
    update(inputSource, frame, referenceSpace) {
        let inputPose = null;
        let gripPose = null;
        if (inputSource && frame.session.visibilityState !== 'visible-blurred') {
            if (inputSource.gripSpace) {
                gripPose = frame.getPose(inputSource.gripSpace, referenceSpace);
                if (gripPose !== null) {
                    this.visible = true;
                    this.matrix.fromArray(gripPose.transform.matrix);
                    this.matrix.decompose(this.position, this.quaternion, this.scale);
                    this.matrixWorldNeedsUpdate = true;
                }
                else {
                    this.visible = false;
                }
            }
            inputPose = frame.getPose(inputSource.targetRaySpace, referenceSpace);
            // Some runtimes (namely Vive Cosmos with Vive OpenXR Runtime) have only grip space and ray space is equal to it
            if (inputPose === null && gripPose !== null) {
                inputPose = gripPose;
            }
            if (inputPose !== null) {
                this[PRIVATE].raySpace.visible = true;
                this[PRIVATE].raySpace.matrix.fromArray(inputPose.transform.matrix);
                this[PRIVATE].raySpace.matrix.decompose(this[PRIVATE].raySpace.position, this[PRIVATE].raySpace.quaternion, this[PRIVATE].raySpace.scale);
                this[PRIVATE].raySpace.matrixWorldNeedsUpdate = true;
            }
            else {
                this[PRIVATE].raySpace.visible = false;
            }
        }
        if (this[PRIVATE].gamepad) {
            this[PRIVATE].gamepad.update();
        }
    }
    connect(inputSource) {
        this[PRIVATE].gamepad = new GamepadWrapper(inputSource.gamepad);
    }
    disconnect() {
        this.visible = false;
        this[PRIVATE].raySpace.visible = false;
        this[PRIVATE].gamepad = null;
    }
    updateMatrixWorld(force) {
        super.updateMatrixWorld(force);
        this[PRIVATE].raySpace.updateMatrixWorld(force);
    }
}
//# sourceMappingURL=XRController.js.map