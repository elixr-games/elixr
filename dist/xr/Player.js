import { Group, Matrix4, Object3D } from 'three';
import { PRIVATE as XRCONTROLLER_PRIVATE, XRController } from './XRController';
export const PRIVATE = Symbol('@elixr/xr/player');
export class Player extends Group {
    /** @ignore */
    [PRIVATE] = {
        head: null,
        controllers: null,
        localSpace: null,
    };
    constructor() {
        super();
        this[PRIVATE].localSpace = new Group();
        this.add(this[PRIVATE].localSpace);
        this[PRIVATE].head = new Object3D();
        this[PRIVATE].localSpace.add(this[PRIVATE].head);
        this[PRIVATE].controllers = {
            left: new XRController('left', this[PRIVATE].localSpace),
            right: new XRController('right', this[PRIVATE].localSpace),
        };
    }
    get controllers() {
        return this[PRIVATE].controllers;
    }
    get bothControllersConnected() {
        return this.controllers.left.connected && this.controllers.right.connected;
    }
    /**
     * Accurate source for player head transform, can be used to attach game
     * objects / audio listeners.
     */
    get head() {
        return this[PRIVATE].head;
    }
    get yOffset() {
        return this[PRIVATE].localSpace.position.y;
    }
    set yOffset(yOffset) {
        this[PRIVATE].localSpace.position.y = yOffset;
    }
    get localSpace() {
        return this[PRIVATE].localSpace;
    }
    updateMatrixWorld(force) {
        super.updateMatrixWorld(force);
        this[PRIVATE].localSpace.updateMatrixWorld(force);
    }
    update(xrManager) {
        const session = xrManager.getSession();
        if (session) {
            const referenceSpace = xrManager.getReferenceSpace();
            const frame = xrManager.getFrame();
            if (frame) {
                // update controllers
                const inputSources = Array.from(session.inputSources);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const trackedSources = session.trackedSources;
                if (trackedSources) {
                    inputSources.push(...Array.from(trackedSources));
                }
                const inputSourceMap = new Map();
                for (const inputSource of inputSources) {
                    if (!inputSource.hand && !inputSource.profiles[0].includes('hand')) {
                        inputSourceMap.set(inputSource.handedness, inputSource);
                    }
                }
                ['left', 'right'].forEach((handedness) => {
                    const controller = this[PRIVATE].controllers[handedness];
                    if (!inputSourceMap.has(handedness)) {
                        if (controller[XRCONTROLLER_PRIVATE].connected) {
                            controller.disconnect();
                        }
                        controller[XRCONTROLLER_PRIVATE].connected = false;
                    }
                    else {
                        const inputSource = inputSourceMap.get(handedness);
                        if (!controller[XRCONTROLLER_PRIVATE].connected) {
                            controller.connect(inputSourceMap.get(handedness));
                        }
                        controller[XRCONTROLLER_PRIVATE].connected = true;
                        controller.update(inputSource, frame, referenceSpace);
                    }
                });
                // update head
                const pose = frame.getViewerPose(referenceSpace);
                if (pose) {
                    const headsetMatrix = new Matrix4().fromArray(pose.transform.matrix);
                    headsetMatrix.decompose(this[PRIVATE].head.position, this[PRIVATE].head.quaternion, this[PRIVATE].head.scale);
                }
            }
        }
    }
}
//# sourceMappingURL=Player.js.map