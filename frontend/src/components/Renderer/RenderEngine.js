import * as THREE from 'three';


export class RenderEngine {
    constructor(canvas, camera) {
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        const renderDiv = document.getElementById("renderDiv");
        console.log(renderDiv)
        if (renderDiv) {
            renderDiv.appendChild(renderer.domElement);
        }
        this.canvas = canvas
        this.camera = camera
        this.renderer = renderer;
        canvas.appendChild(renderer.domElement)
        // this.render = this.render.bind(this);
        // this.onWindowResize = this.onWindowResize.bind(this);
        // window.addEventListener("resize", this.onWindowResize);
        this.render = this.render.bind(this);
        this.requestRenderIfNotRequested = this.requestRenderIfNotRequested.bind(this);
    }

    onInit() {}

    createRenderEngine(
        scene,
        camera,
        // canvas: HTMLCanvasElement,
    ){
        // this.renderer = new THREE.WebGLRenderer({
        //     canvas,
        //     alpha: true, // transparent background
        //     antialias: true, // smooth edges
        // });
        this.scene = scene;
        this.camera = camera;
    }

    addControllerService(controllerService) {
        this.controllerService = controllerService;

        if (this.controllerService.interactionService.controls) {
            // this.controllerService.interactionService.controls.update();
            this.controllerService.interactionService.controls.addEventListener(
                "change",
                this.requestRenderIfNotRequested,
            );
        }

        this.animate();
        this.requestRenderIfNotRequested();
    }

    // render(): void {
    //     requestAnimationFrame(this.render);

    //     if (this.controllerService.interactionService.controls) {
    //         this.controllerService.interactionService.controls.update();
    //     }

    //     this.renderer.render(this.scene, this.camera);
    // }

    animate() {
        // We have to run this outside angular zones,
        // because it could trigger heavy changeDetection cycles.

            if (document.readyState !== "loading") {
                this.render();
            } else {
                window.addEventListener("DOMContentLoaded", () => {
                    this.render();
                });
            }

            // if (this.controllerService.interactionService.controls) {
            //     // this.controllerService.interactionService.controls.update();
            //     this.controllerService.interactionService.controls.addEventListener(
            //         "change",
            //         this.requestRenderIfNotRequested,
            //     );
            // }

            window.addEventListener("resize", () => {
                this.resize();
            });

    }

    render() {
        if(!this.renderer || !this.camera) return
        this.requestAnimation = false;

        // if (this.controllerService.interactionService.controls) {
        //     this.controllerService.interactionService.controls.update();
        // }

        this.camera.updateProjectionMatrix();

        this.renderer.render(this.scene, this.camera);
    }

    requestRenderIfNotRequested() {
        // console.log("REQUEST");

        if (!this.requestAnimation && this.renderer) {
            this.requestAnimation = true;
            requestAnimationFrame(this.render);
        }
    }

    resize(){
        const element = this.canvas;

        if (this.scene && this.renderer && this.camera && element) {
            const width = window.innerWidth;
            const height = window.innerHeight;
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
        }

        this.requestRenderIfNotRequested();
    }

    
}