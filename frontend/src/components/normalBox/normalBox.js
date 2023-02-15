import React from "react";
import { Canvas} from '@react-three/fiber'
import { OrbitControls } from "@react-three/drei";
import "../../styles.css";
function MyBox() {
  const myMesh = React.useRef();

  return (
    <mesh ref={myMesh} >
      <boxBufferGeometry args={[2, 2, 2]} />
      <meshPhongMaterial color="royalblue" />
    </mesh>
  );
}

export default function RotateBox() {
  return (
    <div className="App">
        <Canvas>
        <MyBox />
        <OrbitControls
        enableZoom={false}
        />
        <ambientLight intensity={0.1} />
        <directionalLight />
      </Canvas>
    </div>
  );
}