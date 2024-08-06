import { THREE } from './CustomTHREE';
export class CurvedRaycaster extends THREE.Raycaster {
    _numSegments;
    shootingSpeed;
    minY;
    _points;
    constructor(origin, direction, numSegments = 10, shootingSpeed = 7, minY = -0.1) {
        super(origin, direction);
        this._numSegments = numSegments;
        this.shootingSpeed = shootingSpeed;
        this.minY = minY;
        this._points = Array.from({ length: this._numSegments + 1 }, () => new THREE.Vector3());
        this._calculatePoints();
    }
    set numSegments(numSegments) {
        this._numSegments = numSegments;
        this._points = Array.from({ length: this._numSegments + 1 }, () => new THREE.Vector3());
        this._calculatePoints();
    }
    get points() {
        return this._points;
    }
    _calculatePoints() {
        const g = -9.8;
        const a = new THREE.Vector3(0, g, 0);
        const v0 = new THREE.Vector3();
        v0.copy(this.ray.direction).multiplyScalar(this.shootingSpeed);
        const max_t = calculateMaxTime(this.ray.origin, v0, a, this.minY);
        const dt = max_t / this._numSegments;
        const newPos = new THREE.Vector3();
        for (let i = 0; i < this._numSegments + 1; i++) {
            parabolicCurve(this.ray.origin, v0, a, dt * i, newPos);
            this._points[i].copy(newPos);
        }
    }
    set(origin, direction) {
        super.set(origin, direction);
        this._calculatePoints();
    }
    setFromCamera(coords, camera) {
        super.setFromCamera(coords, camera);
        this._calculatePoints();
    }
    intersectObject(object, recursive, optionalTarget) {
        return this.intersectObjects([object], recursive, optionalTarget);
    }
    intersectObjects(objects, recursive, intersects) {
        if (!intersects) {
            intersects = [];
        }
        let p1, p2;
        for (let i = 0; i < this._numSegments; i++) {
            p1 = this._points[i];
            p2 = this._points[i + 1];
            const segment = p2.clone().sub(p1);
            this.far = segment.length() * (i == this._numSegments - 1 ? 1.1 : 1);
            super.set(p1, segment.normalize());
            const segmentIntersetcs = super.intersectObjects(objects, recursive);
            intersects = intersects.concat(segmentIntersetcs);
        }
        return intersects;
    }
}
const calculateMaxTime = (p0, v0, a, minY) => {
    const p1 = a.y / 2;
    const p2 = v0.y;
    const p3 = p0.y - minY;
    // solve p1*x^2 + p2*x + p3 = 0
    const t = (-1 * p2 - Math.sqrt(Math.pow(p2, 2) - 4 * p1 * p3)) / (2 * p1);
    return t;
};
// Utils
// Parabolic motion equation, y = p0 + v0*t + 1/2at^2
const parabolicCurveScalar = (p0, v0, a, t) => {
    return p0 + v0 * t + 0.5 * a * t * t;
};
// Parabolic motion equation applied to 3 dimensions
const parabolicCurve = (p0, v0, a, t, out) => {
    out.x = parabolicCurveScalar(p0.x, v0.x, a.x, t);
    out.y = parabolicCurveScalar(p0.y, v0.y, a.y, t);
    out.z = parabolicCurveScalar(p0.z, v0.z, a.z, t);
    return out;
};
//# sourceMappingURL=CurvedRaycaster.js.map