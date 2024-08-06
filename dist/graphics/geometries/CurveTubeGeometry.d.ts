import { BufferGeometry, Vector3 } from 'three';
export declare class CurveTubeGeometry extends BufferGeometry {
    tangents: Vector3[];
    normals: Vector3[];
    binormals: Vector3[];
    private parameters;
    private _vertex;
    private _normal;
    private _uv;
    private _P;
    private _vertices;
    private _normals;
    private _uvs;
    private _indices;
    constructor(tubularSegments?: number, radialSegments?: number, radius?: number, closed?: boolean);
    setFromPath(path: THREE.Curve<Vector3>): void;
    private _generateSegment;
    private _generateIndices;
    private _generateUVs;
    private _generateBufferData;
}
//# sourceMappingURL=CurveTubeGeometry.d.ts.map