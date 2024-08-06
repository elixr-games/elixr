import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { THREE } from './CustomTHREE';
export class GLTFModelLoader {
    static _instance;
    static init(renderer) {
        const MANAGER = new THREE.LoadingManager();
        const THREE_PATH = `https://unpkg.com/three@0.${THREE.REVISION}.x`;
        const DRACO_LOADER = new DRACOLoader(MANAGER).setDecoderPath(`${THREE_PATH}/examples/js/libs/draco/gltf/`);
        const KTX2_LOADER = new KTX2Loader(MANAGER).setTranscoderPath(`${THREE_PATH}/examples/js/libs/basis/`);
        this._instance = new GLTFLoader(MANAGER)
            .setCrossOrigin('anonymous')
            .setDRACOLoader(DRACO_LOADER)
            .setKTX2Loader(KTX2_LOADER.detectSupport(renderer));
    }
    static getInstance() {
        if (!this._instance) {
            throw 'GLTFModelLoader not initialized';
        }
        return this._instance;
    }
}
//# sourceMappingURL=GLTFModelLoader.js.map