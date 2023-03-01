import { connect } from 'react-redux';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function CreateWorld() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 60000);
    camera.position.set(500, 800, 1300);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    const gridHelper = new THREE.GridHelper(5000, 100);
    scene.background = new THREE.Color("white");
    scene.add(gridHelper);
    const geometry = new THREE.PlaneGeometry(5000, 5000);
    geometry.rotateX(-Math.PI / 2);

    const plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ visible: false }));
    plane.name = "plane";
    scene.add(plane);

    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
      return needResize;
    }

    function animate() {
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    animate();
  }, []);

  return (
    <canvas ref={canvasRef} style={{ width: '100vw', height: '100vh' }} />
  );
}

export default connect(null, null)(CreateWorld);
