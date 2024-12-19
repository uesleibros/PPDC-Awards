"use client";

import React, { useRef, useEffect, useState } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import * as THREE from "three";

export default function TheaterScene() {
  const mountRef = useRef(null);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const scene = new THREE.Scene();
    const environment = new RoomEnvironment();
    scene.background = new THREE.Color(0x1a1a1a);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(environment).texture;
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 0.1;
    mountRef.current.appendChild(renderer.domElement);

    const loadChairRow = (numberOfChairs, numberOfRows) => {
      const chairSpacing = 1;
      const rowHeight = 0.8;
      const frontSpacing = 1.5;
      const half = Math.floor(numberOfChairs / 2);

      new GLTFLoader()
        .setPath("models/gltf/")
        .load("SheenChair.glb", function (gltf) {
          for (let y = 0; y <= numberOfRows; y++) {
            const floor = new THREE.Mesh(
              new THREE.BoxGeometry(numberOfChairs * chairSpacing, 0.1, 2),
              new THREE.MeshStandardMaterial({ 
                color: 0x333333,
                roughness: 0.8, 
                metalness: 0.2 
              })
            );
            floor.position.set(
              camera.position.x,
              camera.position.y - (y * rowHeight) - 1.4,
              camera.position.z - (y * frontSpacing)
            );
            floor.receiveShadow = true;
            scene.add(floor);
            for (let i = -half; i <= half; i++) {
              const chair = gltf.scene.clone();

              chair.position.set(camera.position.x + i * chairSpacing, (camera.position.y - 1) - (y * rowHeight), camera.position.z - (y * frontSpacing));
              chair.rotation.y = Math.PI;

              if (y === 0 && i === -1) {
                addImageToScene(scene, "/palco/primagi.png", chair.position.x, chair.position.y + 1, chair.position.z - 0.1, 1.2, 1.2, 0, 1);
              }

              if (y === 2 && i === -1) {
                addImageToScene(scene, "/palco/pedro.png", chair.position.x, chair.position.y + 1, chair.position.z - 0.1, 1.2, 1.2, 0, 1);
              }

              scene.add(chair);
              const object = chair.getObjectByName("SheenChair_fabric");
            }
          }
        });
    };

    loadChairRow(7, 4);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 30),
      new THREE.MeshStandardMaterial({ color: 0x332222 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2;
    floor.receiveShadow = true;
    scene.add(floor);
    const stage = new THREE.Mesh(
      new THREE.BoxGeometry(12, 1, 6),
      new THREE.MeshStandardMaterial({ color: 0x8B4513 })
    );
    stage.position.set(0, -1.5, -4);
    stage.receiveShadow = true;
    scene.add(stage);

    const loader = new THREE.ImageLoader();

    const addImageToScene = (scene, imageUrl, x, y, z, width = 2, height = 2, rotationX = 0, rotationY = 0) => {
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(imageUrl);

      const planeGeometry = new THREE.PlaneGeometry(width, height);
      const planeMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
        alphaTest: 0.1,
      });

      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.position.set(x, y, z);
      plane.rotation.x = rotationX;
      plane.rotation.y = rotationY;
      scene.add(plane);
    };

    addImageToScene(scene, "/palco/erick.png", stage.position.x, stage.position.y + 2, stage.position.z + 1.5);
    addImageToScene(scene, "/palco/figames.png", stage.position.x - 10, stage.position.y + 1, stage.position.z - 5);
    addImageToScene(scene, "/palco/daniel.png", stage.position.x + 2, stage.position.y + 2, stage.position.z + 3.5);

    const createViewCup = () => {
      const cupGroup = new THREE.Group();

      const cup = new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.12, 0.3, 32),
        new THREE.MeshStandardMaterial({ 
          color: 0xFFFFFF,
          roughness: 0.2,
          metalness: 0.8
        })
      );
      cup.castShadow = true;
      cupGroup.add(cup);

      const coffee = new THREE.Mesh(
        new THREE.CylinderGeometry(0.14, 0.14, 0.1, 32),
        new THREE.MeshStandardMaterial({ 
          color: 0x4A2F24,
          roughness: 0.3
        })
      );
      coffee.position.y = 0.11;
      cupGroup.add(coffee);

      const steamParticles = [];
      const smokeGeometry = new THREE.SphereGeometry(0.05, 8, 8);

      const smokeMaterial = new THREE.MeshBasicMaterial({
        color: 0xFFFFFF,
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      for (let i = 0; i < 15; i++) {
        const steam = new THREE.Mesh(smokeGeometry, smokeMaterial);
        steam.position.set(
          Math.sin(i) * 0.1,
          0.25 + Math.random() * 0.1,
          Math.cos(i) * 0.1 
        );

        steam.scale.set(0.5 + Math.random(), 0.5 + Math.random(), 0.5 + Math.random());

        steamParticles.push(steam);
        cupGroup.add(steam);
      }

      const animateSteam = () => {
        steamParticles.forEach((particle, index) => {
          particle.position.y += Math.random() * 0.005 + 0.001;
          particle.position.x += Math.sin(Date.now() * 0.001 + index) * 0.002;
          particle.position.z += Math.cos(Date.now() * 0.001 + index) * 0.002;

          particle.material.opacity = Math.max(0.1, particle.material.opacity - 0.0005);

          if (particle.position.y > 0.5) {
            particle.position.set(
              Math.sin(index) * 0.1,
              0.25,
              Math.cos(index) * 0.1
            );
            particle.material.opacity = 0.4;
          }
        });
      };

      cupGroup.position.set(0.4, -0.3, -0.5);
      cupGroup.rotation.x = Math.PI / 6;

      return { cupGroup, steamParticles };
    };

    camera.position.set(0, 2, 6);
    camera.lookAt(0, 0, -4);

    const { cupGroup, steamParticles } = createViewCup();
    camera.add(cupGroup);
    scene.add(camera);

    const euler = new THREE.Euler(0, 0, 0, "YXZ");
    let initialRotation = camera.rotation.clone();

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

    const onPointerLockChange = () => {
      setIsLocked(document.pointerLockElement === mountRef.current);
    };

    document.addEventListener("pointerlockchange", onPointerLockChange);
    document.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      steamParticles.forEach((particle, index) => {
        particle.position.y += 0.002;
        particle.position.x = Math.sin(Date.now() * 0.001 + index) * 0.05;
        particle.material.opacity = (Math.sin(Date.now() * 0.002 + index) + 1) * 0.2;
        
        if(particle.position.y > 0.5) {
          particle.position.y = 0.25;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("pointerlockchange", onPointerLockChange);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} onClick={() => mountRef.current.requestPointerLock()} style={{ width: "100%", height: "100vh" }}>
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
          Clique na tela para olhar ao redor
        </div>
      )}
    </div>
  );
}