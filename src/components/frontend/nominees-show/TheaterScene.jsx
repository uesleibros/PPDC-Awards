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
  const raycasterRef = useRef(new THREE.Raycaster());
  const selectableObjects = useRef([]);
  const [isLocked, setIsLocked] = useState(false);
  const [highlightedObject, setHighlightedObject] = useState(null);

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

    camera.position.set(6.2, 1, 14.3);
    camera.lookAt(0, 0, -4);
    scene.add(camera);

    /*const listener = new THREE.AudioListener();
    camera.add(listener);

    const sound = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load("sounds/waiting-theme.ogg", function (buffer) {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.4);
      sound.play();
    });*/
    
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
    dracoLoader.preload();

    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    const textureLoader = new THREE.TextureLoader();
    const loadTexture = (url) => {
      if (!textures[url]) {
        textures[url] = textureLoader.load(url);
        textures[url].generateMipmaps = true;
        textures[url].minFilter = THREE.LinearMipmapLinearFilter;
        textures[url].magFilter = THREE.LinearFilter;
      }
      return textures[url];
    };

    const addImageToScene = (imageUrl, x, y, z, width = 2, height = 2, rotationX = 0, rotationY = 0, rotationZ = 0, name = null) => {
      const geometryKey = `${width}-${height}`;
      if (!geometries[geometryKey]) {
        geometries[geometryKey] = new THREE.PlaneGeometry(width, height);
      }

      const texture = loadTexture(imageUrl);
      const frontMaterialKey = `front-${imageUrl}`;
      const backMaterialKey = `back-${imageUrl}`;

      if (!materials[frontMaterialKey]) {
        materials[frontMaterialKey] = new THREE.MeshStandardMaterial({
          map: texture,
          transparent: true,
          depthWrite: false,
          alphaTest: 0.1,
          side: THREE.FrontSide,
        });
      }

      if (!materials[backMaterialKey]) {
        materials[backMaterialKey] = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          depthWrite: false,
          alphaTest: 0.1,
          color: 0x000000,
          side: THREE.BackSide,
        });
      }

      const frontPlane = new THREE.Mesh(geometries[geometryKey], materials[frontMaterialKey]);
      const backPlane = new THREE.Mesh(geometries[geometryKey], materials[backMaterialKey]);

      const planeGroup = new THREE.Group();
      planeGroup.add(frontPlane);
      planeGroup.add(backPlane);

      planeGroup.position.set(x, y, z);
      planeGroup.rotation.set(rotationX, rotationY, rotationZ);
      planeGroup.userData.name = name;
      planeGroup.userData.imgSrc = imageUrl;
      scene.add(planeGroup);
      selectableObjects.current.push(planeGroup);
    };

    const loadModel = (path, fileName, callback) => {
      gltfLoader.setPath(path).load(
        fileName,
        (gltf) => {
          const model = gltf.scene;
          
          model.traverse((node) => {
            if (node.isMesh) {
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
      cup.position.set(0.4, -0.5, -0.5);
      camera.add(cup);
    });

    // --- Jantar ---
    addImageToScene("palco/jantar/donut_policia.png", 18, 1.7, -4, 2, 2, 0, 0, 0, "Donut Polícia - Jantar");
    addImageToScene("palco/jantar/mostarda.png", camera.position.x + 1.5, camera.position.y - 0.3, camera.position.z - 1.2, 1.4, 1.4, 0, Math.PI, 0, "Mostarda - Jantar");
    addImageToScene("palco/jantar/repolho.png", camera.position.x + 2.2, camera.position.y - 0.3, camera.position.z - 1.2, 1.4, 1.4, 0, Math.PI, 0, "Repolho - Jantar");
    addImageToScene("palco/jantar/algodao_doce.png", camera.position.x - 3, camera.position.y - 0.3, camera.position.z + 1.4, 1.4, 1.4, 0, Math.PI, 0, "Algodão Doce - Jantar");
    addImageToScene("palco/jantar/0_lactose.png", camera.position.x - 7.6, camera.position.y - 0.3, camera.position.z + 1.4, 1.4, 1.4, 0, Math.PI, 0, "0 Lactose - Jantar");
    addImageToScene("palco/jantar/cenoura.png", camera.position.x - 8.2, camera.position.y - 0.3, camera.position.z + 1.4, 1.4, 1.4, 0, Math.PI, 0, "Cenoura - Jantar");
    addImageToScene("palco/jantar/milkzonho.png", camera.position.x - 9.2, camera.position.y - 0.3, camera.position.z + 1.4, 1.4, 1.4, 0, Math.PI, 0, "Milkzonho - Jantar");
    addImageToScene("palco/jantar/queijo.png", camera.position.x - 9.7, camera.position.y - 0.3, camera.position.z + 1.4, 1.4, 1.4, 0, Math.PI, 0, "Queijo - Jantar");
    addImageToScene("palco/jantar/ketchupdt_mais_ou_menos_do_tamanho_do_leite.png", camera.position.x - 10.4, camera.position.y - 0.3, camera.position.z + 1.4, 1.4, 1.4, 0, Math.PI, 0, "Ketchup Amongus - Jantar");
    addImageToScene("palco/jantar/leite.png", camera.position.x - 11.2, camera.position.y - 0.3, camera.position.z + 1.4, 1.4, 1.4, 0, Math.PI, 0, "Leite - Jantar");
    addImageToScene("palco/jantar/uva.png", camera.position.x - 11.9, camera.position.y - 0.3, camera.position.z + 1.4, 1.4, 1.4, 0, Math.PI, 0, "Uva - Jantar");
    addImageToScene("palco/jantar/metal_leite.png", camera.position.x - 12.7, camera.position.y - 0.3, camera.position.z + 1.4, 1.4, 1.4, 0, Math.PI, 0, "Metal Leite - Jantar");
    addImageToScene("palco/jantar/amiga_do_leite.png", camera.position.x - 13.3, camera.position.y - 0.3, camera.position.z + 1.4, 1.4, 1.4, 0, Math.PI, 0, "Amiga do Leite - Jantar");
    addImageToScene("palco/jantar/maca.png", camera.position.x - 14, camera.position.y - 0.3, camera.position.z + 1.4, 1.4, 1.4, 0, Math.PI, 0, "Maçã - Jantar");
    addImageToScene("palco/jantar/ameixa_seca.png", camera.position.x - 14.8, camera.position.y - 0.3, camera.position.z + 1.4, 1.4, 1.4, 0, Math.PI, 0, "Ameixa Seca - Jantar");
    addImageToScene("palco/jantar/mae_do_leite.png", camera.position.x - 15.7, camera.position.y - 0.3, camera.position.z + 1.4, 1.4, 1.4, 0, Math.PI, 0, "Mãe do Leite - Jantar");
    addImageToScene("palco/jantar/requeijao.png", camera.position.x - 16.2, camera.position.y - 0.3, camera.position.z + 1.4, 1.4, 1.4, 0, Math.PI, 0, "Requeijão - Jantar");
    addImageToScene("palco/jantar/coisa_nossa_bot.png", camera.position.x - 16.8, camera.position.y - 0.3, camera.position.z + 1.4, 1.4, 1.4, 0, Math.PI, 0, "Coisa Nossa BOT - Jantar");

    // --- PPDiscord ---
    addImageToScene("palco/daniel.png", 0, 1.7, -4, 2, 2, 0, 0, 0, "Daniel Clímaco - PPDiscord");
    addImageToScene("palco/pedro.png", camera.position.x - 10, camera.position.y - 0.2, camera.position.z - 1.2, 1.4, 1.4, 0, Math.PI, 0, "Peedroplays - PPDiscord");
    addImageToScene("palco/gamer.png", camera.position.x - 3.9, camera.position.y - 0.2, camera.position.z - 1.2, 1.4, 1.4, 0, Math.PI, 0, "UmGamerQualquer - PPDiscord");
    addImageToScene("palco/erick.png", camera.position.x - 3.1, camera.position.y - 0.2, camera.position.z - 1.2, 1.4, 1.4, 0, Math.PI, 0, "Erick Luiz VB - PPDiscord");
    addImageToScene("palco/davimac.png", camera.position.x - 2.4, camera.position.y - 0.2, camera.position.z - 1.2, 1.4, 1.4, 0, Math.PI, 0, "DaviMac - PPDiscord");
    addImageToScene("palco/gabb.png", camera.position.x - 1.5, camera.position.y - 0.2, camera.position.z - 1.2, 1.4, 1.4, 0, Math.PI, 0, "Gabb - PPDiscord");
    addImageToScene("palco/fabinho.png", camera.position.x - 0.8, camera.position.y - 0.2, camera.position.z - 1.2, 1.4, 1.4, 0, Math.PI, 0, "Fabinho - PPDiscord");
    addImageToScene("palco/fefe.png", camera.position.x - 0.2, camera.position.y - 0.2, camera.position.z - 1.2, 1.4, 1.4, 0, Math.PI, 0, "Fefe PPMations - PPDiscord");
    addImageToScene("palco/erico.png", camera.position.x + 0.5, camera.position.y - 0.2, camera.position.z - 1.2, 1.4, 1.4, 0, Math.PI, 0, "Erico (Cockers) - PPDiscord");
    addImageToScene("palco/mr_morian.png", camera.position.x + 2.7, camera.position.y - 0.2, camera.position.z - 1.2, 1.4, 1.4, 0, Math.PI, 0, "MRMorian - PPDiscord");
    addImageToScene("palco/tet.png", camera.position.x + 3.4, camera.position.y - 0.2, camera.position.z - 1.2, 1.4, 1.4, 0, Math.PI, 0, "O Tet - PPDiscord");
    addImageToScene("palco/rafael_espinheiro.png", camera.position.x + 4.2, camera.position.y - 0.2, camera.position.z - 1.2, 1.4, 1.4, 0, Math.PI, 0, "Rafael Espinheiro - PPDiscord");
    addImageToScene("palco/richard.png", camera.position.x + 4.8, camera.position.y - 0.2, camera.position.z - 1.2, 1.4, 1.4, 0, Math.PI, 0, "Richard (ZMaster) - PPDiscord");
    addImageToScene("palco/enzo.png", camera.position.x - 4.45, camera.position.y - 0.2, camera.position.z - 1.2, 1.4, 1.4, 0, Math.PI, 0, "Enzo da Órbita da Jogatina - PPDiscord");
    addImageToScene("palco/figames.png", camera.position.x - 3.7, camera.position.y - 0.2, camera.position.z + 1.4, 1.4, 1.4, 0, Math.PI, 0, "Figames - PPDiscord");
    addImageToScene("palco/super_creeper.png", camera.position.x - 4.4, camera.position.y - 0.2, camera.position.z + 1.4, 1.4, 1.4, 0, Math.PI, 0, "Super Creeper - PPDiscord");
    addImageToScene("palco/miguel_kj.png", camera.position.x - 2.3, camera.position.y - 0.2, camera.position.z + 1.4, 1.4, 1.4, 0, Math.PI, 0, "MiguelKJ - PPDiscord");
    addImageToScene("palco/zenon.png", camera.position.x - 1.6, camera.position.y - 0.2, camera.position.z + 1.4, 1.4, 1.4, 0, Math.PI, 0, "Zenon - PPDiscord");
    addImageToScene("palco/arthu.png", camera.position.x - 0.7, camera.position.y - 0.2, camera.position.z + 1.4, 1.4, 1.4, 0, Math.PI, 0, "Arthu - PPDiscord");
    addImageToScene("palco/aten.png", camera.position.x + 0.1, camera.position.y - 0.2, camera.position.z + 1.4, 1.4, 1.4, 0, Math.PI, 0, "Aten - PPDiscord");
    addImageToScene("palco/arfur.png", camera.position.x + 0.8, camera.position.y - 0.2, camera.position.z + 1.4, 1.4, 1.4, 0, Math.PI, 0, "Arfur - PPDiscord");
    addImageToScene("palco/luscao.png", camera.position.x + 1.4, camera.position.y - 0.2, camera.position.z + 1.4, 1.4, 1.4, 0, Math.PI, 0, "Luscao - PPDiscord");
    addImageToScene("palco/neutrico.png", camera.position.x + 1.9, camera.position.y - 0.2, camera.position.z + 1.4, 1.4, 1.4, 0, Math.PI, 0, "Apenas o Neutrico - PPDiscord");
    addImageToScene("palco/luidy.png", camera.position.x + 2.7, camera.position.y - 0.2, camera.position.z + 1.4, 1.4, 1.4, 0, Math.PI, 0, "Luidy - PPDiscord");
    addImageToScene("palco/taszite.png", camera.position.x + 3.4, camera.position.y - 0.2, camera.position.z + 1.4, 1.4, 1.4, 0, Math.PI, 0, "Taszite - PPDiscord");
    addImageToScene("palco/cati.png", camera.position.x + 4.1, camera.position.y - 0.2, camera.position.z + 1.4, 1.4, 1.4, 0, Math.PI, 0, "Cati - PPDiscord");
    addImageToScene("palco/artur_sla.png", camera.position.x + 4.9, camera.position.y - 0.2, camera.position.z + 1.4, 1.4, 1.4, 0, Math.PI, 0, "ArturSLA - PPDiscord");

    // --- Marca ---
    addImageToScene("brand_logo.png", 30, 4, camera.position.z - 5, 15, 5, 0, -2);
    addImageToScene("brand_logo.png", -30, 4, camera.position.z - 5, 15, 5, 0, 2);

    const euler = new THREE.Euler(0, 0, 0, "YXZ");
    let frameId = null;
    let isFreeCameraMode = false;
    let isMovementMode = false;
    
    const velocity = new THREE.Vector3();
    const moveSpeed = 0.1;
    const direction = new THREE.Vector3();
    let prevTime = performance.now();

    function toggleFreeCameraMode() {
      isFreeCameraMode = !isFreeCameraMode;
    }

    function toggleFreeMovementMode() {
      isMovementMode = !isMovementMode;
    }

    const onMouseMove = (event) => {
      if (document.pointerLockElement === mountRef.current) {
        euler.setFromQuaternion(camera.quaternion);

        const newX = euler.x - event.movementY * 0.002;
        euler.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, newX));
        
        if (isFreeCameraMode) {
          euler.y -= event.movementX * 0.002;
        } else {
          const newY = euler.y - event.movementX * 0.002;
          euler.y = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, newY));
        }

        camera.quaternion.setFromEuler(euler);

        raycasterRef.current.setFromCamera({ x: 0, y: 0 }, camera);
        const intersects = raycasterRef.current.intersectObjects(selectableObjects.current, true);

        if (intersects.length > 0) {
          const selectedObject = intersects[0].object.parent;
          if (selectedObject.userData.name && selectedObject.userData.name !== highlightedObject?.name) {
            console.log(selectedObject.userData.imgSrc)
            setHighlightedObject({ name: selectedObject.userData.name || null, imgSrc: selectedObject.userData.imgSrc || null });
          }
        } else {
          setHighlightedObject(null);
        }
      }
    };

    const onKeyDown = (event) => {
      if (event.key === 'o' || event.key === 'O') {
        toggleFreeCameraMode();
      }

      if (event.key === 'm' || event.key === 'M') {
        toggleFreeMovementMode();
      }

      if (isMovementMode) {
        const cameraDirection = new THREE.Vector3();
        camera.getWorldDirection(cameraDirection);
        cameraDirection.y = 0;

        if (event.key === 'w' || event.key === 'W') {
          velocity.set(0, 0, 0);
          velocity.addScaledVector(cameraDirection, moveSpeed);
        }
        if (event.key === 's' || event.key === 'S') {
          velocity.set(0, 0, 0);  
          velocity.addScaledVector(cameraDirection, -moveSpeed);
        }

        if (event.key === 'a' || event.key === 'A') {
          const left = new THREE.Vector3();
          camera.getWorldDirection(left);
          left.cross(camera.up).normalize();
          left.negate();

          velocity.set(0, 0, 0);
          velocity.addScaledVector(left, moveSpeed);
        }
        if (event.key === 'd' || event.key === 'D') {
          const right = new THREE.Vector3();
          camera.getWorldDirection(right);
          right.cross(camera.up).normalize();

          velocity.set(0, 0, 0);
          velocity.addScaledVector(right, moveSpeed);
        }
      }
    };

    const onKeyUp = (event) => {
      if (event.key === 'w' || event.key === 's' || event.key === 'a' || event.key === 'd') {
        velocity.set(0, 0, 0);
      }
    };

    const moveCamera = () => {
      camera.position.add(velocity);
    };

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      moveCamera();
      renderer.render(scene, camera);
    };

    const cleanup = () => {
      if (frameId) cancelAnimationFrame(frameId);
      document.removeEventListener("pointerlockchange", onPointerLockChange);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
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
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", handleResize);

    return cleanup;
  }, []);

  return (
    <div 
      ref={mountRef} 
      onClick={() => mountRef.current.requestPointerLock()} 
      style={{ width: "100%", height: "100vh" }}
    >
      {!isLocked ? (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "white",
          background: "rgba(0,0,0,0.7)",
          padding: "20px",
          borderRadius: "10px",
          userSelect: "none"
        }}>
          CLIQUE NA TELA PARA OLHAR AO REDOR
        </div>
      ) : (
        <>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "20px",
              height: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                backgroundColor: "white",
                width: "2px",
                height: "100%",
              }}
            />
            <div
              style={{
                position: "absolute",
                backgroundColor: "white",
                width: "100%",
                height: "2px",
              }}
            />
          </div>
          {highlightedObject && (
            <div
              style={{
                position: "absolute",
                bottom: "10%",
                left: "50%",
                transform: "translateX(-50%)",
                color: "white",
                background: "rgba(0,0,0,0.7)",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <p>
                {highlightedObject.name}
              </p>
              <img className="mx-auto mt-1 w-[40px] h-[40px]" src={`/${highlightedObject.imgSrc}`} alt={highlightedObject.name} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
