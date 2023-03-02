import * as THREE from 'three';
import { ControllerClass } from './ControllerClass';
import { ObjectManager } from './ObjectManager';

export default class ViewGL{
    constructor(canvasRef) {
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
        
        this.objectManager = new ObjectManager()
        this.controller = new ControllerClass(this.camera, canvasRef, this.objectManager)

        

        this.onWindowResize(window.innerWidth, window.innerHeight)
        this.update();
    }

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