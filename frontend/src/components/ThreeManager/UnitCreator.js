import { Subject } from "rxjs";
import * as THREE from "three";
import { Cube } from "./objects/cube";


export class UnitCreator{

    constructor(){
        this.dimensions = {
            width: 100,
            height: 100,
            depth: 100,
        };
        this.addObject$ = new Subject();
        this.removeObject$ = new Subject();

        const rollOverGeo = new THREE.BoxGeometry(
            this.dimensions.width,
            this.dimensions.height,
            this.dimensions.depth,
        );
        const rollOverMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            opacity: 0.5,
            transparent: true,
        });

        this.rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
        this.rollOverMesh.name = "rollOverMesh";
        this.addObject$.next(this.rollOverMesh);
        console.log("ADDING MESH", this.rollOverMesh)
        this.onPointerMove = this.onPointerMove.bind(this);
        this.setDimensions = this.setDimensions.bind(this);
    }

    activate() {
        console.log("ACTIVATING CREATOR");

        const rollOverGeo = new THREE.BoxGeometry(
            this.dimensions.width,
            this.dimensions.height,
            this.dimensions.depth,
        );
        const rollOverMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            opacity: 0.5,
            transparent: true,
        });
        this.rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
        this.rollOverMesh.name = "rollOverMesh";
        this.addObject$.next(this.rollOverMesh);
    }

    disable() {
        this.removeObject$.next(this.rollOverMesh);
    }


    setDimensions(dimensions) {
        // console.log(dimensions);
        this.dimensions = dimensions;
        const rollOverGeo = new THREE.BoxGeometry(
            this.dimensions.width,
            this.dimensions.height,
            this.dimensions.depth,
        );
        const rollOverMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            opacity: 0.5,
            transparent: true,
        });
        this.removeObject$.next(this.rollOverMesh);
        this.rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
        this.addObject$.next(this.rollOverMesh);
    }

    onPointerMove(raycaster, objects) {
        const intersects = raycaster.intersectObjects(objects, false);
        // console.log(objects);

        if (intersects.length > 0) {
            const intersect = intersects[0];

            if (intersect.face) {
                // const addXAxis = (this.dimensions.width / 2) % 50;
                // const addZAxis = (this.dimensions.depth / 2) % 50;

                if (intersect.object.name === "plane") {
                    const vect3 = new THREE.Vector3()
                        .copy(intersect.point)
                        .add(intersect.face.normal);
                    vect3.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
                    // const faceHeight = intersect.object
                    this.rollOverMesh.position.set(
                        vect3.x + (Math.floor(this.dimensions.width / 50) - 1) * 25,
                        vect3.y + (Math.floor(this.dimensions.height / 50) - 1) * 25,
                        vect3.z + (Math.floor(this.dimensions.depth / 50) - 1) * 25,
                    );
                }

                if (intersect.object.name === "cube") {
                    if (intersect.face) {
                        const vect3 = new THREE.Vector3()
                            .copy(intersect.point)
                            .add(intersect.face.normal);
                        vect3.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
                        // const faceHeight = intersect.object

                        this.rollOverMesh.position.set(
                            vect3.x + (Math.floor(this.dimensions.width / 50) - 1) * 25,
                            vect3.y + (Math.floor(this.dimensions.height / 50) - 1) * 25,
                            vect3.z + (Math.floor(this.dimensions.depth / 50) - 1) * 25,
                        );
                    }
                }
            }
        }
    }

    click(
        raycaster,
        isShiftDown,
        objects,
    ) {
        // console.log(this.objects);
        const intersects = raycaster.intersectObjects(objects, false);

        if (intersects.length > 0) {
            const intersect = intersects[0];
            // console.log(intersects);
            // delete cube

            if (isShiftDown) {
                console.log("SHIFT IS DOWN");

                if (intersect.object.name !== "plane") {
                    if (intersect.object.parent && intersect.object.parent.name === "unit") {
                        // console.log(intersect.object.parent.name);
                        // this.scene.remove(intersect.object.parent);

                        // this.objects.splice(this.objects.indexOf(intersect.object), 1);
                        this.removeObject$.next(intersect.object.parent);
                    }
                }

                // create cube
            } else {
                const voxel = new Cube(this.dimensions)
                // console.log(intersect);

                if (intersect.face) {
                    // console.log(intersect);
                    const vect3 = new THREE.Vector3()
                        .copy(intersect.point)
                        .add(intersect.face.normal);
                    vect3.divideScalar(50).floor().multiplyScalar(50).addScalar(25);

                    // const addXAxis = (this.dimensions.width / 2) % 50;
                    // const addZAxis = (this.dimensions.depth / 2) % 50;
                    // console.log(addXAxis, addZAxis);
                    voxel.group.position.set(
                        vect3.x + (Math.floor(this.dimensions.width / 50) - 1) * 25,
                        vect3.y + (Math.floor(this.dimensions.height / 50) - 1) * 25,
                        vect3.z + (Math.floor(this.dimensions.depth / 50) - 1) * 25,
                    );

                    // this.scene.add(voxel.group);
                }

                this.addObject$.next(voxel.group);
                // this.objects.push(voxel.mesh);
            }
        }
    }
}