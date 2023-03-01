import * as THREE from 'three';
import { RenderEngine } from '../Renderer/RenderEngine';
export default class ThreeManagerClass{
    constructor(canvasRef) {
        this.canvas = canvasRef
        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            1,
            60000,
        );
        this.camera.position.set(500, 800, 1300);
        this.camera.lookAt(0, 0, 0);
        this.scene = new THREE.Scene();
        this.renderEngine = new RenderEngine(this.canvas, this.camera)
        this.scene.add(this.camera);
        const gridHelper = new THREE.GridHelper(5000, 100);
        gridHelper.position.y += 0.01;
        this.scene.add(gridHelper);
        const geometry = new THREE.PlaneGeometry(5000, 5000);
        geometry.rotateX(-Math.PI / 2);

        const plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ visible: false }));
        plane.name = "plane";
        this.scene.add(plane);
        this.update();
    }

    // ******************* PUBLIC EVENTS ******************* //
    updateValue(value) {
      // Whatever you need to do with React props
    }

    onMouseMove() {
      // Mouse moves
    }


    // ******************* RENDER LOOP ******************* //
    update(t) {
        this.renderEngine.requestRenderIfNotRequested()
    }
}