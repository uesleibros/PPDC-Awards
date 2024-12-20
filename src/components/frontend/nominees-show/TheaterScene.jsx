"use client";

import React, { useRef, useEffect, useState } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import * as THREE from "three";

export default function TheaterScene() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const geometries = {};
    const materials = {};
    const textures = {};

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      powerPreference: "high-performance",
      precision: "mediump"
    });
    rendererRef.current = renderer;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.4;
    renderer.outputEncoding = THREE.sRGBEncoding;

    const environment = new RoomEnvironment();
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    scene.environment = pmremGenerator.fromScene(environment).texture;
    environment.dispose();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;
    
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
    dracoLoader.preload();

    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    const textureLoader = new THREE.TextureLoader();
    const loadTexture = (url) => {
      if (!textures[url]) {
        textures[url] = textureLoader.load(url);
        textures[url].encoding = THREE.sRGBEncoding;
        textures[url].generateMipmaps = true;
        textures[url].minFilter = THREE.LinearMipmapLinearFilter;
        textures[url].magFilter = THREE.LinearFilter;
      }
      return textures[url];
    };

    const addImageToScene = (imageUrl, x, y, z, width = 2, height = 2, rotationX = 0, rotationY = 0) => {
      const geometryKey = `${width}-${height}`;
      if (!geometries[geometryKey]) {
        geometries[geometryKey] = new THREE.PlaneGeometry(width, height);
      }

      const texture = loadTexture(imageUrl);
      const materialKey = imageUrl;
      if (!materials[materialKey]) {
        materials[materialKey] = new THREE.MeshStandardMaterial({
          map: texture,
          transparent: true,
          depthWrite: false,
          alphaTest: 0.1,
        });
      }

      const plane = new THREE.Mesh(geometries[geometryKey], materials[materialKey]);
      plane.position.set(x, y, z);
      plane.rotation.set(rotationX, rotationY, 0);
      scene.add(plane);
    };

    const loadModel = (path, fileName, callback) => {
      gltfLoader.setPath(path).load(
        fileName,
        (gltf) => {
          const model = gltf.scene;
          
          model.traverse((node) => {
            if (node.isMesh) {
              console.log(node)
              if (node.geometry) {
                node.geometry.computeBoundingSphere();
                node.geometry.computeBoundingBox();
              }
              
              if (node.material) {
                node.material.precision = "mediump";
                if (node.material.map) {
                  node.material.map.anisotropy = renderer.capabilities.getMaxAnisotropy();
                }
              }
            }
          });

          callback(model);
        },
        undefined,
        (error) => console.error("Erro ao carregar modelo:", error)
      );
    };

    const stageLight = new THREE.PointLight(0xffffff, 10, 50);
    stageLight.position.set(0, 5, 0);
    scene.add(stageLight);


    loadModel("models/gltf/", "venue_stage_for_great_events.glb", (stage) => {
      scene.add(stage);
    });

    loadModel("models/gltf/", "starbucks_coffee.glb", (cup) => {
      cup.position.set(0.3, -0.4, -0.4);
      camera.add(cup);
    });

    addImageToScene("palco/daniel.png", 0, 1.7, -4);
    addImageToScene("palco/jantar-donut_policia.png", 18, 1.7, 0);

    camera.position.set(6.2, 1, 14.3);
    camera.lookAt(0, 0, -4);
    scene.add(camera);

    addImageToScene("palco/jantar-mostarda.png", camera.position.x + 1.5, camera.position.y - 0.3, camera.position.z - 1, 1.4, 1.4);
    addImageToScene("palco/jantar-repolho.png", camera.position.x + 2.5, camera.position.y - 0.3, camera.position.z - 1, 1.4, 1.4);
    addImageToScene("palco/pedro.png", camera.position.x - 10, camera.position.y, camera.position.z - 1, 1.4, 1.4);
    addImageToScene("palco/gamer.png", camera.position.x - 4, camera.position.y, camera.position.z - 1, 1.4, 1.4);
    addImageToScene("palco/erick.png", camera.position.x - 3, camera.position.y, camera.position.z - 1, 1.4, 1.4);
    addImageToScene("palco/figames.png", camera.position.x - 4, camera.position.y, camera.position.z - 0.01, 1.4, 1.4, 0, 1.5);
    addImageToScene("palco/primagi.png", camera.position.x + 5, camera.position.y, camera.position.z - 3, 1.4, 1.4);
    addImageToScene("palco/jantar-agua.png", camera.position.x - 10, camera.position.y, camera.position.z - 5, 1.4, 1.4);
    addImageToScene("brand_logo.png", 30, 4, camera.position.z - 5, 15, 5, 0, -2);
    addImageToScene("brand_logo.png", -30, 4, camera.position.z - 5, 15, 5, 0, 2);

    const euler = new THREE.Euler(0, 0, 0, "YXZ");
    let frameId = null;

    const onMouseMove = (event) => {
      if (document.pointerLockElement === mountRef.current) {
        euler.setFromQuaternion(camera.quaternion);
        
        const newX = euler.x - event.movementY * 0.002;
        euler.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, newX));
        
        const newY = euler.y - event.movementX * 0.002;
        euler.y = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, newY));
        
        camera.quaternion.setFromEuler(euler);
      }
    };

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    const cleanup = () => {
      if (frameId) cancelAnimationFrame(frameId);
      document.removeEventListener("pointerlockchange", onPointerLockChange);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      
      Object.values(geometries).forEach(geometry => geometry.dispose());
      Object.values(materials).forEach(material => material.dispose());
      Object.values(textures).forEach(texture => texture.dispose());
      renderer.dispose();
      dracoLoader.dispose();
      
      mountRef.current?.removeChild(renderer.domElement);
    };

    mountRef.current.appendChild(renderer.domElement);
    animate();

    const onPointerLockChange = () => setIsLocked(document.pointerLockElement === mountRef.current);
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    document.addEventListener("pointerlockchange", onPointerLockChange);
    document.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", handleResize);

    return cleanup;
  }, []);

  return (
    <div 
      ref={mountRef} 
      onClick={() => mountRef.current.requestPointerLock()} 
      style={{ width: "100%", height: "100vh" }}
    >
      {!isLocked && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "white",
          background: "rgba(0,0,0,0.7)",
          padding: "20px",
          borderRadius: "10px"
        }}>
          CLIQUE NA TELA PARA OLHAR AO REDOR
        </div>
      )}
    </div>
  );
}