import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { InteractionService } from "./InteractionService";
import { UnitCreator } from "./UnitCreator";
import { Subject } from "rxjs";


export class ControllerClass{

    constructor(camera, canvas, objectManager, unitCreator ){
        this.camera = camera
        this.canvas = canvas
        this.unitCreator = unitCreator
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.controls = new OrbitControls(this.camera, this.canvas);

        // AB 03/25/22 enable damping for more natual interaction
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.1;
        this.controls.zoomSpeed = 0.5;
        this.controls.screenSpacePanning = true;
        this.objectManager = objectManager
        this.interactionService = new InteractionService(objectManager, camera, canvas)
        
        

        this.interactionService.pointerMove$.subscribe(() => {
            this.unitCreator.onPointerMove(
                this.interactionService.raycaster,
                this.objectManager.objects,
            );
        });

        this.controls.update();
    }

    

}