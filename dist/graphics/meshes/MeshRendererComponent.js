import { GameComponent } from '../../core/GameComponent';
import { Types } from 'ecsy';
export class MeshRenderer extends GameComponent {
    get mesh() {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return this.meshRef;
    }
    get geometry() {
        return this.mesh.geometry;
    }
    get material() {
        return this.mesh.material;
    }
    onAdd() {
        this.gameObject.add(this.mesh);
    }
    onRemove() {
        this.gameObject.remove(this.mesh);
    }
}
MeshRenderer.schema = {
    meshRef: { type: Types.Ref },
};
//# sourceMappingURL=MeshRendererComponent.js.map