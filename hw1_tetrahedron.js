// import THREE
import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js"
// import Orbit controls
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

// Set up the scene, camera, and renderer
var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 4

var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Define Material//
const material = new THREE.LineBasicMaterial({ color: 0xfffff })

// create vertices
const vertices = [
    new THREE.Vector3(1, 1, 1),
    new THREE.Vector3(-1, -1, 1),
    new THREE.Vector3(-1, 1, -1),
    new THREE.Vector3(1, -1, -1)
];

// connect verts with edges
const edges = [ [0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3] ];

// make lines
const points = [];
edges.forEach(([start, end]) => {
	points.push(vertices[start], vertices[end]);
});

//create geometry
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const tetrahedron = new THREE.LineSegments(geometry, material);
scene.add(tetrahedron);

// orbital controls
var controls = new OrbitControls (camera, renderer.domElement);

// Set up animation
var animate = function () {
  requestAnimationFrame(animate);
  tetrahedron.rotation.x += .1;
  tetrahedron.rotation.y += .01;
  
  controls.update();
  renderer.render(scene, camera);
};


// start animation
animate();
