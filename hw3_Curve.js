// Import THREE
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';

// Import OrbitControls
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

// Create renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth /
window.innerHeight, 1, 500);
camera.position.set(0, 0, .5);

// Create OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Adds smooth motion
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 10;
controls.maxDistance = 500;

// Create scene
const scene = new THREE.Scene();

// Create a circle
const curveMaterial = new THREE.PointsMaterial({ color: 0xff0000, size: 0.05 });
const curvePoints = [];
const segments = 500; // Number of segments to approximate the circle
const maxR = 2;

function computeF(x, y){
		return Math.pow(x*x + y*y, 2) - 4 * (x*x - y*y);
}

for (let i = -segments; i <= segments; i++) {
    for(let r = -segments; r <= segments; r++){
        const x = (i/segments) * maxR;
        const y = (r/segments) * maxR;
        // if r gives a smaller f, update best radius
        if(Math.abs(computeF(x, y)) < .05){
            curvePoints.push(new THREE.Vector3(x, y, 0));
      	}
    }
}

const curveGeometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
const curve = new THREE.Points(curveGeometry, curveMaterial);
scene.add(curve);

// Animation loop for rendering and controls update
function animate() {
		requestAnimationFrame(animate);
		controls.update(); // Required for damping to work
		renderer.render(scene, camera);
}

// Start the animation loop
animate();
