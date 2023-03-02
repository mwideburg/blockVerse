import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { InteractionService } from "./InteractionService";
import { UnitCreator } from "./UnitCreator";



export class ControllerClass{

    constructor(camera, canvas, objectManager ){
        this.camera = camera
        this.canvas = canvas
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.controls = new OrbitControls(this.camera, this.canvas);

        // AB 03/25/22 enable damping for more natual interaction
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.1;
        this.controls.zoomSpeed = 0.5;
        this.controls.screenSpacePanning = true;
        
        this.interactionService = new InteractionService(objectManager, camera)
        
        
        this.unitCreator = new UnitCreator()



        this.controls.update();
    }

}