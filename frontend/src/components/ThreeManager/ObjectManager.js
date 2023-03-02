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

    
}