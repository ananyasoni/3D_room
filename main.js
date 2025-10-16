import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';

const floorLength = 20;
// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xDEC5E7);

// Camera setup - isometric-like view matching reference
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(18, 16, 18);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.target.set(0, 3, 0);

// Lighting - enhanced for better visibility and color accuracy
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const mainLight = new THREE.DirectionalLight(0xffffff, 1.0);
mainLight.position.set(15, 20, 15);
mainLight.castShadow = true;
mainLight.shadow.mapSize.width = 1024;
mainLight.shadow.mapSize.height = 1024;
mainLight.shadow.camera.left = -15;
mainLight.shadow.camera.right = 15;
mainLight.shadow.camera.top = 15;
mainLight.shadow.camera.bottom = -15;
scene.add(mainLight);

// Additional lights for even illumination
const fillLight1 = new THREE.DirectionalLight(0xffffff, 0.3);
fillLight1.position.set(-10, 10, -10);
scene.add(fillLight1);

const fillLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
fillLight2.position.set(10, 10, -10);
scene.add(fillLight2);

// Create room
function createRoom() {
  // Floor
  const floorGeometry = new THREE.PlaneGeometry(floorLength, floorLength);
  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0xAD80BC,
    roughness: 0.8,
    metalness: 0.1
  });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  floor.name = 'floor';
  scene.add(floor);
  
  // Walls
  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFCFFF,
    roughness: 0.9,
    side: THREE.DoubleSide
  });
  
  // Back wall
  const backWallGeometry = new THREE.PlaneGeometry(20, 10);
  const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
  backWall.position.set(0, 5, -10);
  backWall.receiveShadow = true;
  backWall.name = 'wall';
  scene.add(backWall);
  
  // Left wall
  const leftWallGeometry = new THREE.PlaneGeometry(20, 10);
  const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
  leftWall.position.set(-10, 5, 0);
  leftWall.rotation.y = Math.PI / 2;
  leftWall.receiveShadow = true;
  leftWall.name = 'wall';
  scene.add(leftWall);
  
}

// Grid configuration
const gridConfig = {
  visible: true,
  size: floorLength,
  divisions: 20,
  colorCenterLine: 0x444444,
  colorGrid: 0x888888,
  snap: true
};

// Updated model positions to match reference image
// Updated model positions with CORRECT file names matching your models directory exactly
const modelDefinitions = [
  {
    "name": "desk",
    "position": {
      "x": -7,
      "y": 0.08,
      "z": 1
    },
    "rotation": {
      "x": 2.1551,
      "y": -1.5178,
      "z": 2.1537
    },
    "scale": 1.5
  },
  {
    "name": "cute_desk_chair",
    "position": {
      "x": -6,
      "y": -0.11,
      "z": 1
    },
    "rotation": {
      "x": 0.2472,
      "y": 1.5193,
      "z": -0.2044
    },
    "scale": 1.3
  },
  {
    "name": "pastel_keyboard",
    "position": {
      "x": -6,
      "y": 2.91,
      "z": 1
    },
    "rotation": {
      "x": 3.1416,
      "y": -1.5563,
      "z": 3.1416
    },
    "scale": 0.8
  },
  {
    "name": "pink_pet_bed",
    "position": {
      "x": 1,
      "y": -0.1,
      "z": 7
    },
    "rotation": {
      "x": 1.5352,
      "y": -1.5487,
      "z": 1.5647
    },
    "scale": 1.5
  },
  {
    "name": "bunny",
    "position": {
      "x": -4,
      "y": 2.13,
      "z": 6
    },
    "rotation": {
      "x": 3.1416,
      "y": -0.957,
      "z": 3.1416
    },
    "scale": 1.2
  },
  {
    "name": "dog",
    "position": {
      "x": 2,
      "y": 0.32,
      "z": 7
    },
    "rotation": {
      "x": 0,
      "y": 4.7124,
      "z": 0
    },
    "scale": 1.8
  },
  {
    "name": "violet_bed",
    "position": {
      "x": -5,
      "y": 0,
      "z": 7
    },
    "rotation": {
      "x": -3.1413,
      "y": -1.5452,
      "z": -3.1413
    },
    "scale": 1.8
  },
  {
    "name": "gaming_desktop",
    "position": {
      "x": -7,
      "y": 2.95,
      "z": 1
    },
    "rotation": {
      "x": 0,
      "y": -1.5627,
      "z": 0
    },
    "scale": 1
  },
  {
    "name": "light-switch-1",
    "position": {
      "x": 9,
      "y": 0,
      "z": 5
    },
    "rotation": {
      "x": 0,
      "y": 4.7124,
      "z": 0
    },
    "scale": 1
  }

];

// Simple tweening system for smooth animations
class Tween {
  constructor(object, targetValues, duration = 1000) {
    this.object = object;
    this.startValues = {};
    this.targetValues = targetValues;
    this.duration = duration;
    this.startTime = Date.now();
    this.isComplete = false;
    
    // Store starting values
    for (const key in targetValues) {
      if (key === 'position' || key === 'rotation' || key === 'scale') {
        this.startValues[key] = {
          x: object[key].x,
          y: object[key].y,
          z: object[key].z
        };
      } else {
        this.startValues[key] = object[key];
      }
    }
  }
  
  update() {
    if (this.isComplete) return false;
    
    const elapsed = Date.now() - this.startTime;
    const progress = Math.min(elapsed / this.duration, 1);
    
    // Easing function (ease out cubic)
    const easeOutCubic = 1 - Math.pow(1 - progress, 3);
    
    for (const key in this.targetValues) {
      if (key === 'position' || key === 'rotation' || key === 'scale') {
        const start = this.startValues[key];
        const target = this.targetValues[key];
        
        this.object[key].x = start.x + (target.x - start.x) * easeOutCubic;
        this.object[key].y = start.y + (target.y - start.y) * easeOutCubic;
        this.object[key].z = start.z + (target.z - start.z) * easeOutCubic;
      } else {
        const start = this.startValues[key];
        const target = this.targetValues[key];
        this.object[key] = start + (target - start) * easeOutCubic;
      }
    }
    
    if (progress >= 1) {
      this.isComplete = true;
    }
    
    return !this.isComplete;
  }
}

// Animation manager
const animationManager = {
  activeTweens: [],
  
  addTween(tween) {
    this.activeTweens.push(tween);
  },
  
  update() {
    this.activeTweens = this.activeTweens.filter(tween => tween.update());
  },
  
  animatePosition(object, targetPosition, duration = 1000) {
    const tween = new Tween(object, { position: targetPosition }, duration);
    this.addTween(tween);
    return tween;
  }
};

// Improved object interaction system
const interactiveObjects = new Map();

function makeObjectInteractive(object, modelName) {
  // Store reference for easy lookup
  interactiveObjects.set(object.uuid, { object, modelName });
  
  // Add direct event listeners to each mesh in the object
  object.traverse((child) => {
    if (child.isMesh) {
      // Store reference to parent object and model name
      child.userData.parentObject = object;
      child.userData.modelName = modelName;
      
      // Make mesh clickable by adding it to a special group
      if (!child.userData.clickable) {
        child.userData.clickable = true;
        
        // Store original material for hover effects
        child.userData.originalMaterial = child.material.clone();
      }
    }
  });
  
  console.log(`Made ${modelName} interactive with ${object.children.length} child meshes`);
}

// Create array of all clickable meshes for direct raycasting
let clickableMeshes = [];

function updateClickableMeshes() {
  clickableMeshes = [];
  scene.traverse((object) => {
    if (object.isMesh && object.userData.clickable) {
      clickableMeshes.push(object);
    }
  });
  console.log(`Updated clickable meshes: ${clickableMeshes.length} meshes`);
}

// Simple, robust click detection using direct mesh array
function getClickedObject(event) {
  // Simple mouse calculation - just for the canvas element
  const rect = renderer.domElement.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  
  mouse.set(x, y);
  raycaster.setFromCamera(mouse, camera);
  
  // Only raycast against our known clickable meshes
  const intersects = raycaster.intersectObjects(clickableMeshes, false);
  
  if (intersects.length > 0) {
    const clickedMesh = intersects[0].object;
    const parentObject = clickedMesh.userData.parentObject;
    const modelName = clickedMesh.userData.modelName;
    
    if (parentObject && modelName) {
      return {
        object: parentObject,
        modelName: modelName,
        clickPoint: intersects[0].point,
        clickedMesh: clickedMesh
      };
    }
  }
  
  return null;
}

// --- 🐶 Animated Dog Loader (Frame-Based, with Color + Transparency Fix) ---
function loadAnimatedDog() {
  console.log("🐾 Initializing frame-based animated dog...");

  const dogFrames = ["dog-1", "dog-2", "dog-3"]; // must exist in /models/
  const loadedFrames = [];
  const objLoader = new OBJLoader();
  const textureLoader = new THREE.TextureLoader();

  // Animation timing
  const animationSpeed = 400; // ms per frame
  const sequence = [0, 1, 0, 2, 0, 1]; // loop pattern: 1→2→1→3→1→2
  let sequenceIndex = 0;

  // Hide static dog
  const staticDog = scene.children.find(o => o.userData?.modelName === "dog");
  if (staticDog) {
    staticDog.visible = false;
    console.log("Static dog hidden — using animated frames.");
  }

  // Find dog definition in modelDefinitions
  const dogDef = modelDefinitions.find(m => m.name === "dog");
  if (!dogDef) {
    console.warn("⚠️ Dog definition not found — cannot position animated dog.");
    return;
  }

  // Preload textures
  const textureCache = {};
  dogFrames.forEach(name => {
    const texturePath = `models/${name}.png`;
    const texture = textureLoader.load(texturePath);
    texture.encoding = THREE.sRGBEncoding;  // correct color
    texture.colorSpace = THREE.SRGBColorSpace; // ensure sRGB pipeline
    texture.flipY = false;                  // OBJ UVs are already upright
    texture.needsUpdate = true;
    textureCache[name] = texture;
  });

  // Load each OBJ frame
  dogFrames.forEach((name, i) => {
    const objPath = `models/${name}.obj`;
    objLoader.load(
      objPath,
      object => {
        const texture = textureCache[name];

        object.traverse(child => {
          if (child.isMesh) {
            // 🐕 Use original static dog's material if available
            const staticDogMesh = staticDog?.children?.[0];
            if (staticDogMesh && staticDogMesh.material) {
              child.material = staticDogMesh.material.clone();
              child.material.map = texture;
            } else {
              // ✅ Create fresh material (fully opaque)
              child.material = new THREE.MeshStandardMaterial({
                map: texture,
                roughness: 0.7,
                metalness: 0.1,
                transparent: false, // 🚫 ignore alpha
                opacity: 1.0,       // ✅ full opacity
                alphaTest: 0.0,
                depthWrite: true,
                side: THREE.FrontSide,
              });
            }

            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        // Apply same position/rotation/scale as original dog
        object.position.set(dogDef.position.x, dogDef.position.y, dogDef.position.z);
        object.rotation.set(dogDef.rotation.x, dogDef.rotation.y, dogDef.rotation.z);
        object.scale.set(dogDef.scale, dogDef.scale, dogDef.scale);
        object.visible = false;

        storeModelName(object, "dog");
        makeObjectInteractive(object, "dog");
        scene.add(object);
        loadedFrames[i] = object;

        console.log(`✅ Loaded ${name}.obj with corrected material`);

        // Start animation when all frames loaded
        if (loadedFrames.filter(Boolean).length === dogFrames.length) {
          console.log("🎬 All dog frames loaded — starting animation...");
          startDogAnimation();
        }
      },
      undefined,
      err => console.error(`❌ Failed to load ${name}.obj:`, err)
    );
  });

  // 🐾 Animation Logic
  function startDogAnimation() {
    loadedFrames.forEach(obj => (obj.visible = false));

    setInterval(() => {
      loadedFrames.forEach(obj => (obj.visible = false));

      const frameIndex = sequence[sequenceIndex];
      const next = loadedFrames[frameIndex];
      next.visible = true;

      console.log(`🐕 Frame ${sequenceIndex + 1}: showing ${dogFrames[frameIndex]}`);
      sequenceIndex = (sequenceIndex + 1) % sequence.length;
    }, animationSpeed);
  }
}



// Simplified loadModels - use textures directly, skip MTL entirely
function loadModels() {
  let loadedCount = 0;
  const totalModels = modelDefinitions.length;
  
  const loadingManager = new THREE.LoadingManager();
  loadingManager.onProgress = function(url, itemsLoaded, itemsTotal) {
    console.log(`Overall progress: ${Math.round((itemsLoaded / itemsTotal) * 100)}%`);
  };
  
  // Clear all caches
  THREE.Cache.clear();
  THREE.Cache.enabled = false;
  
  const textureLoader = new THREE.TextureLoader(loadingManager);
  textureLoader.setCrossOrigin('anonymous');
  const objLoader = new OBJLoader(loadingManager);
  
  modelDefinitions.forEach(model => {
    const objPath = `models/${model.name}.obj`;
    const texturePath = `models/${model.name}.png`;
    
    console.log(`Loading model: ${model.name}`);
    
    // Load texture ONLY - don't use MTL
    const cacheParam = Math.random().toString(36).substring(7);
    textureLoader.load(
      texturePath + '?nocache=' + cacheParam,
      (texture) => {
        console.log(`Texture loaded for ${model.name}`);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        
        // Load OBJ without MTL
        objLoader.load(
          objPath,
          (object) => {
            // Apply transformations
            object.position.set(model.position.x, model.position.y, model.position.z);
            if (model.rotation) {
              object.rotation.set(model.rotation.x, model.rotation.y, model.rotation.z);
            }
            const scale = model.scale || 1.0;
            object.scale.set(scale, scale, scale);
            
            // Apply texture to ALL meshes
            object.traverse(function(child) {
              if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                
                // Create material with texture
                child.material = new THREE.MeshStandardMaterial({
                  map: texture,
                  color: 0xFFFFFF,
                  roughness: 0.7,
                  metalness: 0.2,
                  side: THREE.DoubleSide
                });
                
                console.log(`${model.name}: Applied texture directly`);
              }
            });
            
            storeModelName(object, model.name);
            makeObjectInteractive(object, model.name);
            scene.add(object);
            console.log(`${model.name}: loaded successfully`);
            loadedCount++;
            updateClickableMeshes();
            
            if (loadedCount === totalModels) {
              console.log("All models loaded!");
              console.log(`Total clickable meshes: ${clickableMeshes.length}`);
              loadAnimatedDog(); // 🐕 start animation only once, after all models ready
            }

          },
          (xhr) => {
            const percentComplete = xhr.total > 0 ? Math.round((xhr.loaded / xhr.total) * 100) : 0;
            if (percentComplete > 0) {
              console.log(`${model.name}: ${percentComplete}% loaded`);
            }
          },
          (error) => {
            console.error(`Error loading ${model.name}:`, error);
            loadedCount++;
          }
        );
      },
      undefined,
      (error) => {
        console.warn(`Texture not found for ${model.name}: ${error.message}`);
        loadedCount++;
      }
    );
  });
}



// Add grid helper for positioning reference
function addGridHelper() {
  const gridSize = floorLength;
  const gridDivisions = floorLength;
  const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x888888, 0x444444);
  gridHelper.position.y = 0.01;
  scene.add(gridHelper);
  
  const axisHelper = new THREE.AxesHelper(5);
  axisHelper.position.y = 0.02;
  scene.add(axisHelper);
  
  const axisLabels = new THREE.Group();
  scene.add(axisLabels);
  
  const createAxisLabel = (text, position, color) => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 32;
    const context = canvas.getContext('2d');
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = '24px Arial';
    context.fillStyle = color;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    sprite.position.copy(position);
    sprite.scale.set(1, 0.5, 1);
    axisLabels.add(sprite);
  };
  
  createAxisLabel('X', new THREE.Vector3(5.5, 0.5, 0), '#ff0000');
  createAxisLabel('Y', new THREE.Vector3(0, 5.5, 0), '#00ff00');
  createAxisLabel('Z', new THREE.Vector3(0, 0.5, 5.5), '#0000ff');
  
  const coordinateDiv = document.createElement('div');
  coordinateDiv.id = 'coordinates';
  coordinateDiv.style.position = 'absolute';
  coordinateDiv.style.bottom = '10px';
  coordinateDiv.style.right = '10px';
  coordinateDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  coordinateDiv.style.color = 'white';
  coordinateDiv.style.padding = '10px';
  coordinateDiv.style.fontFamily = 'monospace';
  coordinateDiv.style.fontSize = '12px';
  coordinateDiv.style.borderRadius = '5px';
  document.body.appendChild(coordinateDiv);
  
  const toggleButton = document.createElement('button');
  toggleButton.textContent = 'Toggle Grid & Axes';
  toggleButton.style.position = 'absolute';
  toggleButton.style.bottom = '10px';
  toggleButton.style.left = '10px';
  toggleButton.style.padding = '8px 12px';
  toggleButton.style.backgroundColor = '#4CAF50';
  toggleButton.style.color = 'white';
  toggleButton.style.border = 'none';
  toggleButton.style.borderRadius = '4px';
  toggleButton.style.cursor = 'pointer';
  toggleButton.style.zIndex = '1000';
  document.body.appendChild(toggleButton);
  
  toggleButton.addEventListener('click', () => {
    gridHelper.visible = !gridHelper.visible;
    axisHelper.visible = !axisHelper.visible;
    axisLabels.visible = !axisLabels.visible;
  });
  
  return { gridHelper, axisHelper, coordinateDiv, axisLabels };
}

// Add GUI controls
function addControls(gridHelper, axisHelper) {
  const gui = new GUI();
  
  const gridFolder = gui.addFolder('Grid');
  gridFolder.add(gridConfig, 'divisions', 10, 100, 10).name('Grid Divisions').onChange((value) => {
    scene.remove(gridHelper);
    gridHelper = new THREE.GridHelper(gridConfig.size, value, gridConfig.colorCenterLine, gridConfig.colorGrid);
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);
  });
  gridFolder.add(gridConfig, 'visible').name('Show Grid').onChange((value) => {
    gridHelper.visible = value;
  });
  gridFolder.add(gridConfig, 'snap').name('Snap to Grid');
  
  const cameraFolder = gui.addFolder('Camera');
  cameraFolder.add(camera.position, 'x', -30, 30).name('Camera X');
  cameraFolder.add(camera.position, 'y', 0, 30).name('Camera Y');
  cameraFolder.add(camera.position, 'z', -30, 30).name('Camera Z');
  
  const lightFolder = gui.addFolder('Lighting');
  lightFolder.add(ambientLight, 'intensity', 0, 2).name('Ambient Light');
  lightFolder.add(mainLight, 'intensity', 0, 2).name('Main Light');
  
  return gui;
}

const gridElements = addGridHelper();
const gui = addControls(gridElements.gridHelper, gridElements.axisHelper);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Robust mouse position calculation that handles all cases
function updateMousePosition(event) {
  // Get the canvas element and its bounding rect
  const canvas = renderer.domElement;
  const rect = canvas.getBoundingClientRect();
  
  // Account for device pixel ratio and any scaling
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  
  // Calculate mouse position relative to canvas
  const canvasX = (event.clientX - rect.left) * scaleX;
  const canvasY = (event.clientY - rect.top) * scaleY;
  
  // Convert to normalized device coordinates
  mouse.x = (canvasX / canvas.width) * 2 - 1;
  mouse.y = -(canvasY / canvas.height) * 2 + 1;
  
  // Debug logging when having issues
  if (window.debugMouse) {
    console.log('Mouse calc:', {
      clientX: event.clientX, clientY: event.clientY,
      rectLeft: rect.left, rectTop: rect.top,
      rectWidth: rect.width, rectHeight: rect.height,
      canvasWidth: canvas.width, canvasHeight: canvas.height,
      scaleX, scaleY, canvasX, canvasY,
      normalizedX: mouse.x, normalizedY: mouse.y
    });
  }
}

window.addEventListener('mousemove', updateMousePosition);

// Animation loop with error handling and emergency stop
let errorCount = 0;
const maxErrors = 5;
let animationId;

function animate() {
  try {
    animationId = requestAnimationFrame(animate);
    controls.update();
    
    // Update animations
    animationManager.update();
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    
    if (intersects.length > 0) {
      const point = intersects[0].point;
      gridElements.coordinateDiv.textContent = `X: ${point.x.toFixed(2)}, Y: ${point.y.toFixed(2)}, Z: ${point.z.toFixed(2)}`;
    }
    
    renderer.render(scene, camera);
    
    // Reset error count on successful frame
    errorCount = 0;
    
  } catch (error) {
    console.error('Animation loop error:', error);
    errorCount++;
    
    // Emergency stop after too many errors
    if (errorCount >= maxErrors) {
      console.error('Too many animation errors, stopping animation loop');
      cancelAnimationFrame(animationId);
      
      // Try to recover by detaching transform controls
      if (window.transformControls) {
        try {
          window.transformControls.detach();
          scene.remove(window.transformControls);
        } catch (e) {
          console.error('Failed to clean up transform controls:', e);
        }
      }
      return;
    }
    
    // Try to recover for minor errors
    if (window.transformControls) {
      try {
        window.transformControls.detach();
      } catch (e) {
        // Ignore cleanup errors
      }
    }
  }
}

// Emergency stop function
window.stopAnimation = function() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    console.log('Animation stopped manually');
  }
};

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Add snapping functionality with proper safeguards
function enableSnapping() {
  let transformControls;
  
  try {
    transformControls = new TransformControls(camera, renderer.domElement);
    
    // Prevent stack overflow with proper configuration
    transformControls.setSize(0.75);
    transformControls.setSpace('world'); // Use world space instead of local
    transformControls.showX = true;
    transformControls.showY = true;
    transformControls.showZ = true;
    
    // Add to scene AFTER configuration
    scene.add(transformControls);
    
    // Performance optimization with debouncing
    let dragTimeout;
    let changeTimeout;
    
    transformControls.addEventListener('dragging-changed', (event) => {
      controls.enabled = !event.value;
      
      // Clear any pending timeouts
      if (dragTimeout) clearTimeout(dragTimeout);
      
      // Only log when dragging completely stops
      if (!event.value && transformControls.object) {
        dragTimeout = setTimeout(() => {
          logObjectTransform(transformControls.object);
        }, 100);
      }
    });
    
    transformControls.addEventListener('objectChange', () => {
      // Clear previous timeout
      if (changeTimeout) clearTimeout(changeTimeout);
      
      // Debounce the snapping
      changeTimeout = setTimeout(() => {
        const object = transformControls.object;
        if (object && gridConfig.snap) {
          const gridStep = gridConfig.size / gridConfig.divisions;
          object.position.x = Math.round(object.position.x / gridStep) * gridStep;
          object.position.z = Math.round(object.position.z / gridStep) * gridStep;
        }
      }, 50);
    });
    
  } catch (error) {
    console.error('Failed to create TransformControls:', error);
    return null;
  }
  
  return transformControls;
}

// Interactive portfolio system
function checkForInteractiveObject(object) {
  // Get model name from the object hierarchy
  let modelName = null;
  object.traverse((child) => {
    if (child.userData && child.userData.modelName) {
      modelName = child.userData.modelName;
    }
  });
  
  // If no userData, try to infer from position or other properties
  if (!modelName && object.children.length > 0) {
    // Try to match with modelDefinitions based on position
    const pos = object.position;
    const matchedModel = modelDefinitions.find(model => 
      Math.abs(model.position.x - pos.x) < 1 &&
      Math.abs(model.position.y - pos.y) < 1 &&
      Math.abs(model.position.z - pos.z) < 1
    );
    if (matchedModel) {
      modelName = matchedModel.name;
    }
  }
  
  if (modelName) {
    showPortfolioOverlay(modelName);
  }
}

function showPortfolioOverlay(modelName) {
  // Remove existing overlay
  const existingOverlay = document.getElementById('portfolio-overlay');
  if (existingOverlay) {
    existingOverlay.remove();
  }
  
  // Create overlay based on object type
  const overlay = document.createElement('div');
  overlay.id = 'portfolio-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 30px;
    border-radius: 15px;
    max-width: 500px;
    z-index: 1000;
    font-family: 'Arial', sans-serif;
  `;
  
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '×';
  closeBtn.style.cssText = `
    position: absolute;
    top: 10px;
    right: 15px;
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
  `;
  closeBtn.onclick = () => overlay.remove();
  
  overlay.appendChild(closeBtn);
  
  // Content based on object
  let content = '';
  switch(modelName) {
    case 'gaming_desktop':
    case 'pastel_keyboard':
      content = `
        <h2>💻 Development Setup</h2>
        <p>This is where the magic happens! My development environment features:</p>
        <ul>
          <li>Three.js for 3D web experiences</li>
          <li>React & TypeScript for robust applications</li>
          <li>Node.js backend development</li>
          <li>Creative coding with p5.js & WebGL</li>
        </ul>
        <button onclick="window.open('https://github.com/yourusername', '_blank')" 
                style="padding: 10px 20px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; margin-top: 15px;">
          View GitHub Portfolio
        </button>
      `;
      break;
    case 'violet_bed':
      content = `
        <h2>🛏️ About Me</h2>
        <p>When I'm not coding, I enjoy:</p>
        <ul>
          <li>Reading tech blogs and staying updated with latest trends</li>
          <li>Experimenting with new technologies</li>
          <li>Relaxing with my pets (check out my dog!)</li>
          <li>Designing user experiences that matter</li>
        </ul>
      `;
      break;
    case 'dog':
      content = `
        <h2>🐕 Meet My Coding Companion</h2>
        <p>This is my loyal coding companion who keeps me company during late night development sessions!</p>
        <p>Fun fact: Many of my best debugging breakthroughs happen during our walks together. 🌟</p>
      `;
      break;
    case 'bunny':
      content = `
        <h2>🐰 Creative Projects</h2>
        <p>This little guy represents my creative side:</p>
        <ul>
          <li>3D modeling and animation</li>
          <li>Interactive web experiences</li>
          <li>Game development with Three.js</li>
          <li>Generative art projects</li>
        </ul>
      `;
      break;
    default:
      content = `
        <h2>🏠 Welcome to My Digital Space</h2>
        <p>Thanks for exploring my 3D portfolio! Click around to discover more about my projects and interests.</p>
      `;
  }
  
  const contentDiv = document.createElement('div');
  contentDiv.innerHTML = content;
  overlay.appendChild(contentDiv);
  
  document.body.appendChild(overlay);
  
  // Close on background click
  overlay.onclick = (e) => {
    if (e.target === overlay) overlay.remove();
  };
}

// Store model names in objects after loading
function storeModelName(object, modelName) {
  // Set on the root object
  if (!object.userData) object.userData = {};
  object.userData.modelName = modelName;
  
  // Set on all child objects
  object.traverse((child) => {
    if (!child.userData) child.userData = {};
    child.userData.modelName = modelName;
  });
  
  console.log(`Stored model name '${modelName}' on object with ${object.children.length} children`);
}

// Logging and export functionality
function logObjectTransform(object) {
  if (!object || !object.userData.modelName) return;
  
  const modelName = object.userData.modelName;
  const pos = object.position;
  const rot = object.rotation;
  const scale = object.scale.x; // Assuming uniform scaling
  
  console.log(`%c${modelName} Transform:`, 'color: #4CAF50; font-weight: bold;');
  console.log(`  Position: { x: ${pos.x.toFixed(2)}, y: ${pos.y.toFixed(2)}, z: ${pos.z.toFixed(2)} }`);
  console.log(`  Rotation: { x: ${rot.x.toFixed(4)}, y: ${rot.y.toFixed(4)}, z: ${rot.z.toFixed(4)} }`);
  console.log(`  Scale: ${scale.toFixed(2)}`);
}

function exportRoomConfiguration() {
  const roomConfig = [];
  const processedModels = new Set();
  
  scene.traverse((object) => {
    if (object.userData && object.userData.modelName && object.parent === scene) {
      // Only process top-level model objects, avoid duplicates
      const modelId = `${object.userData.modelName}_${object.uuid}`;
      if (!processedModels.has(modelId)) {
        processedModels.add(modelId);
        
        const modelName = object.userData.modelName;
        const pos = object.position;
        const rot = object.rotation;
        const scale = object.scale.x;
        
        roomConfig.push({
          name: modelName,
          position: { x: parseFloat(pos.x.toFixed(2)), y: parseFloat(pos.y.toFixed(2)), z: parseFloat(pos.z.toFixed(2)) },
          rotation: { x: parseFloat(rot.x.toFixed(4)), y: parseFloat(rot.y.toFixed(4)), z: parseFloat(rot.z.toFixed(4)) },
          scale: parseFloat(scale.toFixed(2))
        });
      }
    }
  });
  
  console.log('%cRoom Configuration Export:', 'color: #2196F3; font-size: 16px; font-weight: bold;');
  console.log(`Found ${roomConfig.length} unique models:`);
  console.log('Copy this array to replace modelDefinitions in your code:');
  console.log(JSON.stringify(roomConfig, null, 2));
  
  // Also copy to clipboard if possible
  if (navigator.clipboard) {
    navigator.clipboard.writeText(JSON.stringify(roomConfig, null, 2)).then(() => {
      console.log('%cConfiguration copied to clipboard!', 'color: #4CAF50;');
    });
  }
  
  return roomConfig;
}



createRoom();
loadModels();
const transformControls = enableSnapping();

// Make transform controls globally accessible for debugging
if (transformControls) {
  window.transformControls = transformControls;
} else {
  console.warn('Transform controls failed to initialize - using fallback mode');
  window.transformControls = null;
}

// Object selection cycling
let currentObjectIndex = -1;
const allObjects = [];

function updateObjectsList() {
  allObjects.length = 0;
  interactiveObjects.forEach(({ object, modelName }) => {
    allObjects.push({ object, modelName });
  });
  console.log(`Updated objects list: ${allObjects.length} objects`);
}

function selectNextObject() {
  if (allObjects.length === 0) {
    updateObjectsList();
  }

  if (allObjects.length === 0) {
    showNotification('No objects available');
    return;
  }

  currentObjectIndex = (currentObjectIndex + 1) % allObjects.length;
  const selected = allObjects[currentObjectIndex];

  if (window.transformControls) {
    if (window.transformControls.object) {
      window.transformControls.detach();
    }
    window.transformControls.attach(selected.object);
    showNotification(`Transform controls attached to ${selected.modelName} (${currentObjectIndex + 1}/${allObjects.length})`);
  }
}

// Add event listeners after transform controls are ready
window.addEventListener('keydown', (event) => {
  if (!window.devMode) return;
  
  switch (event.key.toLowerCase()) {
    case 'tab':
      event.preventDefault();
      selectNextObject();
      break;
    case 'g':
      if (window.transformControls) window.transformControls.setMode('translate');
      break;
    case 'r':
      if (window.transformControls) window.transformControls.setMode('rotate');
      break;
    case 's':
      if (window.transformControls) window.transformControls.setMode('scale');
      break;
    case 'escape':
      if (window.transformControls) {
        window.transformControls.detach();
      }
      break;
    case 'x':
      // Toggle snapping with X key
      gridConfig.snap = !gridConfig.snap;
      console.log(`Grid snapping: ${gridConfig.snap ? 'ON' : 'OFF'}`);
      updateInstructions();
      break;
  }
});

// Left click for portfolio interactions - use same robust approach
renderer.domElement.addEventListener('click', (event) => {
  if (event.button !== 0 || window.devMode) return;
  
  // Use robust mouse calculation
  const mouseCoords = getMouseCoordinates(event);
  
  // Log unusual coordinates but don't block
  if (Math.abs(mouseCoords.x) > 1.1 || Math.abs(mouseCoords.y) > 1.1) {
    console.warn('Unusual mouse coordinates in left-click (but continuing):', mouseCoords);
  }
  
  mouse.set(mouseCoords.x, mouseCoords.y);
  raycaster.setFromCamera(mouse, camera);
  
  // Check clickable meshes
  const intersects = raycaster.intersectObjects(clickableMeshes, false);
  
  if (intersects.length > 0) {
    const clickedMesh = intersects[0].object;
    const parentObject = clickedMesh.userData.parentObject;
    
    if (parentObject) {
      checkForInteractiveObject(parentObject);
    }
  }
});


// Transform controls are always available in dev mode

// Robust mouse coordinate calculation that handles all viewport changes
function getMouseCoordinates(event) {
  // Get the actual canvas element and its current size
  const canvas = renderer.domElement;
  const rect = canvas.getBoundingClientRect();
  
  // Calculate the actual mouse position relative to the visible canvas
  const clientX = event.clientX;
  const clientY = event.clientY;
  
  // Convert to canvas coordinates
  const canvasX = clientX - rect.left;
  const canvasY = clientY - rect.top;
  
  // Convert to normalized device coordinates (-1 to +1)
  let x = (canvasX / rect.width) * 2 - 1;
  let y = -(canvasY / rect.height) * 2 + 1;
  
  // Always log the initial calculation for debugging
  console.log('Primary calculation result:', { x, y, clientX, clientY });
  
  // Fallback: If coordinates seem wrong, try alternative calculation
  if (Math.abs(x) > 1.1 || Math.abs(y) > 1.1 || (Math.abs(x - (-1)) < 0.01 && Math.abs(y - 1) < 0.01)) {
    console.log('Primary calculation failed, trying fallback...', { x, y });
    
    // Alternative calculation using viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    const fallbackX = (clientX / viewportWidth) * 2 - 1;
    const fallbackY = -(clientY / viewportHeight) * 2 + 1;
    
    console.log('Fallback coordinates:', { fallbackX, fallbackY, viewportWidth, viewportHeight });
    
    x = fallbackX;
    y = fallbackY;
  }
  
  // Debug logging (only if debug mode is on)
  if (window.debugMouse) {
    console.log('Mouse calc:', {
      clientX, clientY,
      rectLeft: rect.left, rectTop: rect.top,
      rectWidth: rect.width, rectHeight: rect.height,
      canvasX, canvasY,
      normalizedX: x, normalizedY: y,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight
    });
  }
  
  return { x, y };
}

// Find nearest object to screen coordinates (backup method)
function findNearestObjectToScreenPoint(screenX, screenY) {
  let nearestObject = null;
  let nearestDistance = Infinity;
  
  // Project all objects to screen space and find closest
  interactiveObjects.forEach(({ object, modelName }) => {
    const objectPosition = new THREE.Vector3();
    object.getWorldPosition(objectPosition);
    
    // Project to screen coordinates
    const projected = objectPosition.clone().project(camera);
    
    // Convert to screen pixels
    const screenPos = {
      x: (projected.x + 1) * window.innerWidth / 2,
      y: -(projected.y - 1) * window.innerHeight / 2
    };
    
    // Calculate distance to click point
    const distance = Math.sqrt(
      Math.pow(screenPos.x - screenX, 2) + Math.pow(screenPos.y - screenY, 2)
    );
    
    if (distance < nearestDistance && distance < 100) { // Within 100 pixels
      nearestDistance = distance;
      nearestObject = { object, modelName, distance };
    }
  });
  
  return nearestObject;
}

// Simple and robust right-click handler with multiple fallbacks
renderer.domElement.addEventListener('contextmenu', (event) => {
  event.preventDefault();
  
  if (!window.devMode) return;
  
  console.log('Right-click detected - checking for objects...');
  
  let selectedObject = null;
  
  // Method 1: Try raycasting
  try {
    const mouseCoords = getMouseCoordinates(event);
    console.log('Mouse position:', mouseCoords.x, mouseCoords.y);
    
    // Only try raycasting if coordinates seem reasonable
    if (Math.abs(mouseCoords.x) <= 1.1 && Math.abs(mouseCoords.y) <= 1.1) {
      mouse.set(mouseCoords.x, mouseCoords.y);
      raycaster.setFromCamera(mouse, camera);
      
      const intersects = raycaster.intersectObjects(clickableMeshes, false);
      console.log(`Raycasting found ${intersects.length} intersections`);
      
      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object;
        selectedObject = {
          object: clickedMesh.userData.parentObject,
          modelName: clickedMesh.userData.modelName
        };
        console.log(`Raycasting selected: ${selectedObject.modelName}`);
      }
    }
  } catch (error) {
    console.warn('Raycasting failed:', error);
  }
  
  // Method 2: If raycasting failed, try proximity-based selection
  if (!selectedObject) {
    console.log('Raycasting failed, trying proximity-based selection...');
    const screenX = event.clientX;
    const screenY = event.clientY;
    
    const nearestObj = findNearestObjectToScreenPoint(screenX, screenY);
    if (nearestObj) {
      selectedObject = nearestObj;
      console.log(`Proximity selected: ${selectedObject.modelName} (distance: ${selectedObject.distance.toFixed(1)}px)`);
    }
  }
  
  // Handle object selection
  if (selectedObject) {
    if (window.transformControls) {
      if (window.transformControls.object) {
        window.transformControls.detach();
      }
      window.transformControls.attach(selectedObject.object);
      showNotification(`Transform controls attached to ${selectedObject.modelName}. Use G/R/S keys.`);
    }
  } else {
    // No object found - handle empty space click
    console.log('No object found');

    if (window.transformControls && window.transformControls.object) {
      window.transformControls.detach();
      showNotification('Transform controls detached');
    }
  }
});


// Simple notification system
function showNotification(message, duration = 3000) {
  // Remove existing notification
  const existing = document.getElementById('notification');
  if (existing) {
    existing.remove();
  }
  
  const notification = document.createElement('div');
  notification.id = 'notification';
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 12px 20px;
    border-radius: 6px;
    z-index: 10000;
    font-family: Arial, sans-serif;
    font-size: 14px;
    border-left: 4px solid #4CAF50;
    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    max-width: 300px;
    animation: slideIn 0.3s ease-out;
  `;
  
  // Add CSS animation
  if (!document.getElementById('notification-style')) {
    const style = document.createElement('style');
    style.id = 'notification-style';
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Auto-hide after duration
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }
  }, duration);
}

// Emergency reset function
window.resetTransformControls = function() {
  if (window.transformControls) {
    window.transformControls.detach();
    console.log('Transform controls reset');
  }
};

// Debug functions
window.debugMouse = false;
window.toggleMouseDebug = function() {
  window.debugMouse = !window.debugMouse;
  console.log('Mouse debug:', window.debugMouse ? 'ON' : 'OFF');
  showNotification(`Mouse debug: ${window.debugMouse ? 'ON' : 'OFF'}`);
};

window.testRaycast = function() {
  console.log('Current mouse position:', mouse.x, mouse.y);
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(clickableMeshes, false);
  console.log(`Found ${intersects.length} clickable intersections:`);
  intersects.slice(0, 5).forEach((hit, i) => {
    console.log(`${i + 1}:`, hit.object.userData.modelName || hit.object.type, hit.point);
  });
};

window.listClickableMeshes = function() {
  console.log(`Total clickable meshes: ${clickableMeshes.length}`);
  const meshByModel = {};
  clickableMeshes.forEach(mesh => {
    const modelName = mesh.userData.modelName || 'Unknown';
    if (!meshByModel[modelName]) meshByModel[modelName] = 0;
    meshByModel[modelName]++;
  });
  console.table(meshByModel);
};

window.testClickAtCenter = function() {
  console.log('Testing click at screen center...');
  mouse.set(0, 0);
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(clickableMeshes, false);
  console.log(`Center click found ${intersects.length} objects`);
  if (intersects.length > 0) {
    const mesh = intersects[0].object;
    console.log('Would select:', mesh.userData.modelName);
  }
};

// Debug function to inspect scene objects
window.inspectScene = function() {
  console.log('%cScene Inspection:', 'color: #FF9800; font-size: 16px; font-weight: bold;');
  let modelCount = 0;
  scene.children.forEach((child, index) => {
    if (child.userData && child.userData.modelName) {
      modelCount++;
      console.log(`Model ${modelCount}: ${child.userData.modelName}`);
      console.log('  - Type:', child.type);
      console.log('  - Children count:', child.children.length);
      console.log('  - Position:', child.position);
      console.log('  - UserData:', child.userData);
    } else if (child.type !== 'GridHelper' && child.type !== 'AxesHelper' && child.name !== 'floor' && child.name !== 'wall') {
      console.log(`Unknown object ${index}:`, child.type, child.name, child.userData);
    }
  });
  console.log(`Total models found: ${modelCount}`);
};

// Add dev mode toggle
window.devMode = true; // Set to false for production
const devToggle = document.createElement('button');
devToggle.textContent = `Dev Mode: ${window.devMode ? 'ON' : 'OFF'}`;
devToggle.style.cssText = `
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 8px 12px;
  background: ${window.devMode ? '#FF9800' : '#4CAF50'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  z-index: 1000;
  font-weight: bold;
`;
devToggle.addEventListener('click', () => {
  window.devMode = !window.devMode;
  devToggle.textContent = `Dev Mode: ${window.devMode ? 'ON' : 'OFF'}`;
  devToggle.style.background = window.devMode ? '#FF9800' : '#4CAF50';
  if (!window.devMode && window.transformControls) {
    window.transformControls.detach();
  }
  updateInstructions();
});
document.body.appendChild(devToggle);


// Add export configuration button
const exportBtn = document.createElement('button');
exportBtn.textContent = 'Export Room Config';
exportBtn.style.cssText = `
  position: absolute;
  top: 90px;
  left: 10px;
  padding: 8px 12px;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  z-index: 1000;
  font-weight: bold;
`;
exportBtn.addEventListener('click', exportRoomConfiguration);
document.body.appendChild(exportBtn);

// Add instructions panel
const instructionsPanel = document.createElement('div');
instructionsPanel.id = 'instructions';
instructionsPanel.style.cssText = `
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 15px;
  border-radius: 8px;
  font-family: monospace;
  font-size: 12px;
  z-index: 1000;
  max-width: 250px;
`;

function updateInstructions() {
  if (window.devMode) {
    instructionsPanel.innerHTML = `
      <strong>🔨️ DEV MODE - TRANSFORM</strong><br>
      • Right-click object → attach transform controls<br>
      • <strong>Tab key → cycle through objects</strong><br>
      • G = Translate, R = Rotate, S = Scale<br>
      • Escape = Detach, X = Toggle snapping<br>
      • Transform objects directly in dev mode
    `;
  } else {
    instructionsPanel.innerHTML = `
      <strong>📱 PORTFOLIO MODE</strong><br>
      • Left-click objects to view content<br>
      • Explore the room and discover info<br>
      • Click desk setup for projects<br>
      • Click pets for personality
    `;
  }
}

updateInstructions();
document.body.appendChild(instructionsPanel);
animate();
