import React from 'react';
import ViewGL from './ThreeManagerClass';
import * as THREE from 'three'
export default class Scene extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.saveScene = this.saveScene.bind(this)
    }

    // ******************* COMPONENT LIFECYCLE ******************* //
    componentDidMount() {
        // Get canvas, pass to custom class
        const canvas = this.canvasRef.current;
        this.threeManager = new ViewGL(canvas);
        // Init any event listeners
        console.log(this.threeManager)
        window.addEventListener('resize', this.handleResize);

        // this.threeManager.onInit()
    }

    componentWillUnmount() {
        // Remove any event listeners
        window.removeEventListener('resize', this.handleResize);
    }

    saveScene(){
        const serializedScene = this.threeManager.serializeScene()
        console.log(serializedScene)
    }

    // ******************* EVENT LISTENERS ******************* //

    handleResize = () => {
        this.threeManager.onWindowResize(window.innerWidth, window.innerHeight);
    };

    render() {
        return (
            <div className="canvasContainer" id="renderDiv">
                <button onClick={this.saveScene}>SAVE</button>
                <canvas ref={this.canvasRef} style={{width: '100vw', height:'100vh'}}/>
            </div>
        );
    }
}