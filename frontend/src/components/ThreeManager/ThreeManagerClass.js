import * as THREE from 'three';
import { ControllerClass } from './ControllerClass';
import { ObjectManager } from './ObjectManager';
import { UnitCreator } from './UnitCreator';

export default class ViewGL{
    constructor(canvasRef) {
        this.canvasRef = canvasRef
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvasRef,
            antialias: false,
        });
         this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            1,
            60000,
        );
        this.camera.position.set(500, 800, 1300);
        this.camera.lookAt(0, 0, 0);
        this.scene.background = new THREE.Color("white");
        this.scene.add(this.camera);
        const gridHelper = new THREE.GridHelper(5000, 100);
        gridHelper.position.y += 0.01;
        const geometry = new THREE.PlaneGeometry(5000, 5000);
        geometry.rotateX(-Math.PI / 2);
        this.scene.add(gridHelper);
        const plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ visible: false }));
        plane.name = "plane";
        this.scene.add(plane);
        this.unitCreator = new UnitCreator()
        this.objectManager = new ObjectManager()
        this.controller = new ControllerClass(this.camera, canvasRef, this.objectManager, this.unitCreator)
        console.log("CONTROLLER", this.controller.unitCreator.addObject$.subscribe())
        
        this.controller.unitCreator.addObject$.subscribe((object) => {
            console.log("HELLO")
            this.objectManager.addCubeObject(object);
            this.scene.add(object);
            // this.renderEngine.requestRenderIfNotRequested();
        });
        this.controller.unitCreator.removeObject$.subscribe((object) => {
            this.objectManager.removeCubeObject(object);
            this.scene.remove(object);
            // this.renderEngine.requestRenderIfNotRequested();
        });
        this.objectManager.objects.push(plane);
        this.unitCreator.activate()

        this.onWindowResize(window.innerWidth, window.innerHeight)
        this.update();
    }

    // async onInit(){
        
    //     this.controllerService.unitCreator.addObject$.subscribe((object) => {
    //         this.objectManager.addCubeObject(object);
    //         this.scene.add(object);
    //         this.renderEngine.requestRenderIfNotRequested();
    //     });
    //     this.controllerService.unitCreator.removeObject$.subscribe((object) => {
    //         this.objectManager.removeCubeObject(object);
    //         this.scene.remove(object);
    //         this.renderEngine.requestRenderIfNotRequested();
    //     });
        

    //     this.onWindowResize(window.innerWidth, window.innerHeight)
    //     this.update();
    // }

    // ******************* PUBLIC EVENTS ******************* //
    updateValue(value) {
      // Whatever you need to do with React props
    }

    onMouseMove() {
      // Mouse moves
    }

    onWindowResize(vpW, vpH) {
        this.renderer.setSize(vpW, vpH);
    }

    // ******************* RENDER LOOP ******************* //
    update(t) {
        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(this.update.bind(this));
    }
}