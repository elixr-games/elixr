import { Group, Matrix4, Object3D, WebXRManager } from 'three';
import { PRIVATE as XRCONTROLLER_PRIVATE, XRController } from './XRController';

export const PRIVATE = Symbol('@elixr/xr/player');

export class Player extends Group {
	/** @ignore */
	[PRIVATE]: {
		head: Object3D;
		controllers: {
			left: XRController;
			right: XRController;
		};
	} = {
		head: null,
		controllers: null,
	};

	constructor() {
		super();
		this[PRIVATE].head = new Object3D();
		this.add(this[PRIVATE].head);
		this[PRIVATE].controllers = {
			left: new XRController('left', this),
			right: new XRController('right', this),
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

	updateMatrixWorld(force?: boolean): void {
		super.updateMatrixWorld(force);
		this[PRIVATE].head.updateMatrixWorld(force);
	}

	update(xrManager: WebXRManager) {
		const session = xrManager.getSession();
		if (session) {
			const referenceSpace = xrManager.getReferenceSpace();
			const frame = xrManager.getFrame();
			if (frame) {
				// update controllers
				const inputSources = Array.from(
					session.inputSources,
				) as XRInputSource[];
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				const trackedSources = session.trackedSources;
				if (trackedSources) {
					inputSources.push(...(Array.from(trackedSources) as XRInputSource[]));
				}
				const inputSourceMap = new Map<XRHandedness, XRInputSource>();
				for (const inputSource of inputSources) {
					if (!inputSource.hand && !inputSource.profiles[0].includes('hand')) {
						inputSourceMap.set(inputSource.handedness, inputSource);
					}
				}

				(['left', 'right'] as ('left' | 'right')[]).forEach((handedness) => {
					const controller = this[PRIVATE].controllers[handedness];
					if (!inputSourceMap.has(handedness)) {
						if (controller[XRCONTROLLER_PRIVATE].connected) {
							controller.disconnect();
						}
						controller[XRCONTROLLER_PRIVATE].connected = false;
					} else {
						const inputSource = inputSourceMap.get(handedness)!;
						if (!controller[XRCONTROLLER_PRIVATE].connected) {
							controller.connect(inputSourceMap.get(handedness)!);
						}
						controller[XRCONTROLLER_PRIVATE].connected = true;
						controller.update(inputSource, frame, referenceSpace);
					}
				});

				// update head
				const pose = frame.getViewerPose(referenceSpace);
				if (pose) {
					const headsetMatrix = new Matrix4().fromArray(pose.transform.matrix);
					headsetMatrix.decompose(
						this[PRIVATE].head.position,
						this[PRIVATE].head.quaternion,
						this[PRIVATE].head.scale,
					);
				}
			}
		}
	}
}
