/* eslint-disable default-case */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { bufferTime, distinctUntilChanged, filter, fromEvent, map, Subject } from "rxjs";


export class InteractionService{

    constructor(objectManager, camera, canvas){
        this.objectManager = objectManager
        this.camera = camera
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.domElement = canvas
        this.evCache = [];
        this.pointerMove$ = new Subject();
        this.click$ = new Subject();
        this.pointerDown$ = new Subject();
        this.pointerUp$ = new Subject();
        this.isShiftDown = false;
        this.establishPointerListeners();
        
        this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this);
        this.onDocumentKeyUp = this.onDocumentKeyUp.bind(this);
        this.pointerMove = this.pointerMove.bind(this);
        document.addEventListener("keydown", this.onDocumentKeyDown);
        document.addEventListener("keyup", this.onDocumentKeyUp);
    }

    establishPointerListeners() {
        if (!this.domElement) {
            return;
        }
        console.log("ESTABLISH POINTERS")
        const nativeElement = this.domElement;
        
        const pointerUp$ = fromEvent(nativeElement, "pointerup");
        const pointerDown$ = fromEvent(nativeElement, "pointerdown");
        const pointerMove$ = fromEvent(nativeElement, "pointermove");
        const doubleClick$ = pointerUp$.pipe(
            map((event) => [Date.now(), event]),
            // In a 250ms window, check for 2 entries in the buffer every 50ms
            bufferTime(250, 50, 2),
            // filter out buffers where there are 2 entries (for double click)
            filter((l) => l.length === 2),
            // ensure the two timestamps are different
            distinctUntilChanged((a, b) => a[0] == b[0] && a[1] == b[1]),
        );
        pointerDown$.subscribe((ev) => {
            this.evCache.push(ev);

            if (this.evCache.length > 1) {
                this.isPinching = true;
            }

            if (this.commandIsDown) {
                this.pointerIsDown$.next(true);
            }

            this.pointerIsDown = true;
        });
        pointerUp$.subscribe((ev) => {
            for (var i = 0; i < this.evCache.length; i++) {
                if (this.evCache[i].pointerId == ev.pointerId) {
                    this.evCache.splice(i, 1);
                    break;
                }
            }

            if (!this.evCache.length && this.isPinching) {
                setTimeout(() => {
                    this.isPinching = false;
                }, 50);
            }
            
            this.pointerUp$.next(true);
            this.pointerIsDown = false;

        });
        pointerDown$.subscribe((down) => {
            pointerUp$.subscribe((up) => {
                if (!this.isPinching && !this.dblClicked) {
                    if (up.timeStamp - down.timeStamp < 150 && !this.dblClicked) {
                        this.click(down);
                    }
                } else {
                    if (up.timeStamp - down.timeStamp < 150 && this.dblClicked) {
                        this.dblClick(down);
                    }
                }
            });
        });

        pointerMove$.subscribe((event) => {
            this.pointerMove(event);
        });

        doubleClick$.subscribe((event) => {
            this.dblClicked = true;
            this.dblClick(event[0][1]);

            if (!this.isPinching) {
                // console.log("Double tap", event);
            }
        });
    }


    pointerMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        this.pointerMove$.next(true);
    }

    click(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        this.click$.next(this.isShiftDown);
    }

    onDocumentKeyDown(event) {
        switch (event.keyCode) {
            case 16:
                this.isShiftDown = true;
                break;
            case 83:
                this.commandIsDown = true;
                this.controls.enablePan = false;
                this.controls.enableZoom = false;
                this.controls.enableRotate = false;
                break;
        }
    }

    onDocumentKeyUp(event) {
        switch (event.keyCode) {
            case 16:
                this.isShiftDown = false;

                break;
            case 83:
                this.commandIsDown = false;
                this.controls.enablePan = true;
                this.controls.enableZoom = true;
                this.controls.enableRotate = true;
                break;
        }
    }



}