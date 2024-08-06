import { THREE } from './CustomTHREE';
export declare class CurvedRaycaster extends THREE.Raycaster {
    private _numSegments;
    shootingSpeed: number;
    minY: number;
    private _points;
    constructor(origin: THREE.Vector3, direction: THREE.Vector3, numSegments?: number, shootingSpeed?: number, minY?: number);
    set numSegments(numSegments: number);
    get points(): Readonly<THREE.Vector3[]>;
    private _calculatePoints;
    set(origin: THREE.Vector3, direction: THREE.Vector3): void;
    setFromCamera(coords: THREE.Vector2, camera: THREE.Camera): void;
    intersectObject<TIntersected extends THREE.Object3D>(object: THREE.Object3D, recursive?: boolean, optionalTarget?: Array<THREE.Intersection<TIntersected>>): Array<THREE.Intersection<TIntersected>>;
    intersectObjects<TIntersected extends THREE.Object3D>(objects: THREE.Object3D[], recursive?: boolean, intersects?: THREE.Intersection<TIntersected>[]): THREE.Intersection<TIntersected>[];
}
//# sourceMappingURL=CurvedRaycaster.d.ts.map