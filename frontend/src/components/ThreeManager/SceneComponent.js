import React from 'react';
import ThreeManagerClass from './ThreeManagerClass';

export default class Scene extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    // ******************* COMPONENT LIFECYCLE ******************* //
    componentDidMount() {
        // Get canvas, pass to custom class
        const canvas = this.canvasRef.current;
        this.threeManager = new ThreeManagerClass(canvas);

        // Init any event listeners
        console.log(this.threeManager)
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        // Remove any event listeners
        window.removeEventListener('resize', this.handleResize);
    }

    // ******************* EVENT LISTENERS ******************* //

    handleResize = () => {
        this.threeManager.renderEngine.resize(window.innerWidth, window.innerHeight);
    };

    render() {
        return (
            <div className="canvasContainer" id="renderDiv">
                <canvas ref={this.canvasRef} />
            </div>
        );
    }
}