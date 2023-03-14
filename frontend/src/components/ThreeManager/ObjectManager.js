import { Subject } from "rxjs";
import * as THREE from "three";


export class ObjectManager{

    constructor(){
        this.objects = [];
        this.addToScene$ = new Subject();
        this.removeFromScene$ = new Subject()
        this.attachObjectToScene$ = new Subject()
        this.update$ = new Subject()
        this.selectedGroup = new THREE.Group()
        this.selectedUnit = null
        this.rollOverGroup = new THREE.Group()
    }

    addMeshToObjects(mesh){
        this.objects.push(mesh)
    }

    removeMeshFromObjects(mesh){
        this.objects = this.objects.filter((object) => object !== mesh)
    }

    addCubeObject(cube) {
        const mesh = cube.children.find((obj) => obj.name === "cube");
        if (mesh && mesh instanceof THREE.Mesh) {
            this.addMeshToObjects(mesh);
        }
    }

    removeCubeObject(cube) {
        const mesh = cube.children.find((obj) => obj.name === "cube");

        if (this.selectedGroup.children.includes(cube)) {
            this.selectedGroup.remove(cube);
        }

        if (mesh && mesh instanceof THREE.Mesh) {
            this.removeMeshFromObjects(mesh);
        }
    }

    
}