import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { bufferTime, distinctUntilChanged, filter, fromEvent, map, Subject } from "rxjs";


export class InteractionService{

    constructor(objectManager, camera){
        this.objectManager = objectManager
        this.camera = camera
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
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

        const nativeElement = this.domElement;
        // pointerup obervable
        // ----------------------------------------------------------------------
        // console.log("HELLO");
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
            // console.log(this.evCache);
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
            // console.log(this.evCache);
        });

        // click will select unit no mater what so dblClick just needs to move camera and not select Unit
        // ----------------------------------------------------------------------
        pointerDown$.subscribe((down) => {
            pointerUp$.subscribe((up) => {
                if (!this.isPinching && !this.dblClicked) {
                    if (up.timeStamp - down.timeStamp < 150 && !this.dblClicked) {
                        // const intersect = this.click(down);
                        // if (intersect) {
                        //     this.click(intersect);
                        // } else {
                        //     this.objectService.removeHover();
                        //     this.hoverSummaryService.hide();
                        // }
                        this.click(down);
                    }
                } else {
                    if (up.timeStamp - down.timeStamp < 150 && this.dblClicked) {
                        this.dblClick(down);
                    }
                }

                // console.log("UP DOWN", up.timeStamp, down.timeStamp);
                // return [down, up];
            });
        });

        pointerMove$.subscribe((event) => {
            // console.log(this.commandIsDown);

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

        // const intersects = this.raycaster.intersectObjects(this.objectService.objects);

        this.pointerMove$.next(true);
    }


}