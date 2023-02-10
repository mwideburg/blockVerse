import ReactDOM from 'react-dom'
import React from "react";
import { Canvas , useFrame} from '@react-three/fiber'
import { OrbitControls } from "@react-three/drei";
import "./styles.css";
function MyRotatingBox() {
  const myMesh = React.useRef();

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.x = a;
  });

  return (
    <mesh ref={myMesh} >
      <boxBufferGeometry args={[2, 2, 2]} />
      <meshPhongMaterial color="royalblue" />
    </mesh>
  );
}

export default function App() {
  return (
    <div className="App">
      <Canvas>
        <MyRotatingBox />
        <OrbitControls
        enableZoom={false}
        rotateSpeed={2}
        autoRotate={true}
        autoRotateSpeed={5}
        />
        <ambientLight intensity={0.1} />
        <directionalLight />
      </Canvas>
    </div>
  );
}


ReactDOM.render(<App />, document.getElementById('root'))


