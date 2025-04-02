import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const floorLength = 20;
// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xDEC5E7); // Light blue-gray background

// Camera setup
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-20, 10, 20);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
mainLight.position.set(10, 10, 10);
mainLight.castShadow = true;
mainLight.shadow.mapSize.width = 2048;
mainLight.shadow.mapSize.height = 2048;
scene.add(mainLight);

// Create room
function createRoom() {
    // Floor
    const floorGeometry = new THREE.PlaneGeometry(floorLength, floorLength);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0xAD80BC,
      roughness: 0.8
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);
    // Walls (optional)
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFCFFF,
      roughness: 0.9
    });
    // Back wall
    const backWallGeometry = new THREE.PlaneGeometry(20, 10);
    const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
    backWall.position.set(0, 5, -10);
    backWall.receiveShadow = true;
    scene.add(backWall);
    // Left wall
    const leftWallGeometry = new THREE.PlaneGeometry(20, 10);
    const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
    leftWall.position.set(10, 5, 0);
    leftWall.rotation.y = Math.PI / 2;
    //leftWall.receiveShadow = true;
    scene.add(leftWall);
}

// Grid configuration
const gridConfig = {
  visible: true,
  size: floorLength,
  divisions: 20,
  colorCenterLine: 0x444444,
  colorGrid: 0x888888,
  snap: true // Add this property
};

// List of models with their positions
const modelDefinitions = [
    {
      name: "arched_door",
      position: { x: -9.5, y: 0, z: -9.5 },
      rotation: { x: 0, y: Math.PI / 4, z: 0 },
      scale: 1.0
    },
    {
      name: "desk",
      position: { x: -5, y: 0, z: -8 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: 0.9
    },
    {
      name: "cute_desk_chair",
      position: { x: -5, y: 0, z: -6 }, 
      rotation: { x: 0, y: Math.PI / 6, z: 0 },
      scale: 0.8
    },
    {
      name: "pastel_keyboard",
      position: { x: -5, y: 1.1, z: -8.5 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: 0.5
    },
    {
      name: "gaming_desktop",
      position: { x: -6.5, y: 1.1, z: -8.5 },
      rotation: { x: 0, y: Math.PI / 8, z: 0 },
      scale: 0.7
    },
    {
      name: "pencil",
      position: { x: -4, y: 1.1, z: -8 },
      rotation: { x: 0, y: Math.PI / 4, z: 0 },
      scale: 0.4
    },
    {
      name: "book",
      position: { x: -3.5, y: 1.1, z: -7.5 },
      rotation: { x: 0, y: Math.PI / 3, z: 0 },
      scale: 0.5
    },
    {
      name: "violet_bed",
      position: { x: 5, y: 0, z: -8 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: 1.0
    },
    {
      name: "pink_pet_bed",
      position: { x: 8, y: 0, z: -5 },
      rotation: { x: 0, y: -Math.PI / 6, z: 0 },
      scale: 0.8
    },
    {
      name: "dog",
      position: { x: -8, y: 0, z: 8 },
      rotation: { x: 0, y: 180, z: 0 },
      scale: 1.0
    },
    {
      name: "cat_feeder",
      position: { x: 8, y: 0, z: -3 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: 0.7
    },
    {
      name: "bunny",
      position: { x: 0, y: 0, z: -5 },
      rotation: { x: 0, y: Math.PI / 2, z: 0 },
      scale: 0.6
    },
    {
      name: "pocket_pet",
      position: { x: 2, y: 0, z: -5 },
      rotation: { x: 0, y: -Math.PI / 4, z: 0 },
      scale: 0.5
    },
    {
      name: "tassel_rug",
      position: { x: 0, y: 0.01, z: 0 },
      rotation: { x: -Math.PI / 2, y: 0, z: 0 },
      scale: 1.5
    },
    {
      name: "tassel_rug_2",
      position: { x: 5, y: 0.01, z: 5 },
      rotation: { x: -Math.PI / 2, y: 0, z: 0 },
      scale: 1.2
    },
    {
      name: "organizer",
      position: { x: -8, y: 0, z: 5 },
      rotation: { x: 0, y: Math.PI / 2, z: 0 },
      scale: 0.8
    },
    { 
      name: "old_radio",
      position: { x: -8, y: 1.5, z: 5 },
      rotation: { x: 0, y: Math.PI / 2, z: 0 },
      scale: 0.7
    },
    {
      name: "night_light",
      position: { x: 7, y: 0, z: -8 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: 0.7
    },
    {
      name: "light_switch",
      position: { x: -9.9, y: 4, z: 0 },
      rotation: { x: 0, y: Math.PI / 2, z: 0 },
      scale: 0.8
    },
    {
      name: "orchids",
      position: { x: -5, y: 1.1, z: -7 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: 0.5
    },
    {
      name: "tulip_guestbook",
      position: { x: 0, y: 0, z: 8 },
      rotation: { x: 0, y: -Math.PI / 4, z: 0 },
      scale: 0.8
    }
];

// Load OBJ+MTL models
function loadModels() {
    let loadedCount = 0;
    const totalModels = modelDefinitions.length;
    // Create loading manager to track progress
    const loadingManager = new THREE.LoadingManager();
    loadingManager.onProgress = function(url, itemsLoaded, itemsTotal) {
      console.log(`Overall progress: ${Math.round((itemsLoaded / itemsTotal) * 100)}%`);
    };
    const mtlLoader = new MTLLoader(loadingManager);
    const objLoader = new OBJLoader(loadingManager);
    modelDefinitions.forEach(model => {
      const mtlPath = `models/${model.name}.mtl`;
      const objPath = `models/${model.name}.obj`;
      console.log(`Loading model: ${model.name}`);
      mtlLoader.load(mtlPath, (materials) => {
        materials.preload();

        objLoader.setMaterials(materials);
        objLoader.load(objPath, (object) => {
          // Apply position, rotation and scale
          object.position.set(model.position.x, model.position.y, model.position.z);
          if (model.rotation) {
            object.rotation.set(model.rotation.x, model.rotation.y, model.rotation.z);
          }
          const scale = model.scale || 1.0;
          object.scale.set(scale, scale, scale);
          // Add shadows
          object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
          scene.add(object);
          console.log(`${model.name}: 100% loaded`);
          loadedCount++;
          if (loadedCount === totalModels) {
            console.log("All models loaded");
          }
        },
        (xhr) => {
          // Progress callback
          const percentComplete = Math.round((xhr.loaded / xhr.total) * 100);
          console.log(`${model.name}: ${percentComplete}% loaded`);
        },
        (error) => {
          console.error(`Error loading ${model.name}:`, error);
          loadedCount++;
        });
      }, undefined, (error) => {
        console.error(`Error loading MTL for ${model.name}:`, error);
        loadedCount++;
      });
    });
}

// Add grid helper for positioning reference
function addGridHelper() {
  // Create a grid helper
  const gridSize = floorLength;
  const gridDivisions = floorLength;
  const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x888888, 0x444444);
  gridHelper.position.y = 0.01; // Slightly above the floor
  scene.add(gridHelper);
  // Add axis helper for orientation
  const axisHelper = new THREE.AxesHelper(5);
  axisHelper.position.y = 0.02; // Slightly above the grid
  scene.add(axisHelper);
  
  // Add labels for the axes
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
  
  // Create labels for each axis
  createAxisLabel('X', new THREE.Vector3(5.5, 0.5, 0), '#ff0000');
  createAxisLabel('Y', new THREE.Vector3(0, 5.5, 0), '#00ff00');
  createAxisLabel('Z', new THREE.Vector3(0, 0.5, 5.5), '#0000ff');
  // Add coordinate display in corner
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
  // Add grid toggle button - MOVED TO BOTTOM LEFT
  const toggleButton = document.createElement('button');
  toggleButton.textContent = 'Toggle Grid & Axes';
  toggleButton.style.position = 'absolute';
  toggleButton.style.bottom = '10px'; // Changed from top to bottom
  toggleButton.style.left = '10px';   // Changed from right to left
  toggleButton.style.padding = '8px 12px';
  toggleButton.style.backgroundColor = '#4CAF50';
  toggleButton.style.color = 'white';
  toggleButton.style.border = 'none';
  toggleButton.style.borderRadius = '4px';
  toggleButton.style.cursor = 'pointer';
  toggleButton.style.zIndex = '1000'; // Ensure it's above other elements
  document.body.appendChild(toggleButton);
  toggleButton.addEventListener('click', () => {
    gridHelper.visible = !gridHelper.visible;
    axisHelper.visible = !axisHelper.visible;
    axisLabels.visible = !axisLabels.visible;
  });
  
  return { gridHelper, axisHelper, coordinateDiv };
}

// Import dat.GUI
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

// Add GUI controls
function addControls(gridHelper, axisHelper) {
  const gui = new GUI();
  // Grid folder
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
  // Add snap to grid option
  gridFolder.add(gridConfig, 'snap').name('Snap to Grid');
  // Camera folder
  const cameraFolder = gui.addFolder('Camera');
  cameraFolder.add(camera.position, 'x', -20, 20).name('Camera X');
  cameraFolder.add(camera.position, 'y', 0, 20).name('Camera Y');
  cameraFolder.add(camera.position, 'z', -20, 20).name('Camera Z');
  // Lighting folder
  const lightFolder = gui.addFolder('Lighting');
  lightFolder.add(ambientLight, 'intensity', 0, 1).name('Ambient Light');
  lightFolder.add(mainLight, 'intensity', 0, 1).name('Main Light');
  return gui;
}

// Add the grid helper
const gridElements = addGridHelper();

// Call this after creating the grid helper
const gui = addControls(gridElements.gridHelper, gridElements.axisHelper);

// Update coordinate display in animation loop
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Add mouse move event listener
window.addEventListener('mousemove', (event) => {
  // Calculate mouse position in normalized device coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    
    // Update coordinate display
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    
    if (intersects.length > 0) {
      const point = intersects[0].point;
      gridElements.coordinateDiv.textContent = `X: ${point.x.toFixed(2)}, Y: ${point.y.toFixed(2)}, Z: ${point.z.toFixed(2)}`;
    }
    
    renderer.render(scene, camera);
  }
  
  

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Add snapping functionality
function enableSnapping() {
    const transformControls = new TransformControls(camera, renderer.domElement);
    scene.add(transformControls);
    
    // Disable orbit controls when using transform controls
    transformControls.addEventListener('dragging-changed', (event) => {
      controls.enabled = !event.value;
    });
    
    // Add snap to grid functionality
    transformControls.addEventListener('objectChange', () => {
      const object = transformControls.object;
      if (object) {
        // Snap to grid
        if (gridConfig.snap) {
          const gridStep = gridConfig.size / gridConfig.divisions;
          object.position.x = Math.round(object.position.x / gridStep) * gridStep;
          object.position.z = Math.round(object.position.z / gridStep) * gridStep;
        }
      }
    });
    
    // Add key controls
    window.addEventListener('keydown', (event) => {
      switch (event.key.toLowerCase()) {
        case 'g':
          transformControls.setMode('translate');
          break;
        case 'r':
          transformControls.setMode('rotate');
          break;
        case 's':
          transformControls.setMode('scale');
          break;
        case 'escape':
          transformControls.detach();
          break;
      }
    });
    
    // Add click to select object
    window.addEventListener('click', (event) => {
      if (event.button !== 0) return; // Left click only
      
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);
      
      if (intersects.length > 0) {
        // Find the first non-grid, non-floor object
        for (let i = 0; i < intersects.length; i++) {
          const object = intersects[i].object;
          if (object !== gridElements.gridHelper && 
              object.name !== 'floor' && 
              object.name !== 'wall') {
            // Find the parent object (the loaded model)
            let parent = object;
            while (parent.parent && parent.parent !== scene) {
              parent = parent.parent;
            }
            transformControls.attach(parent);
            break;
          }
        }
      }
    });
    
    return transformControls;
  }

// Initialize
createRoom();
loadModels();
animate();
