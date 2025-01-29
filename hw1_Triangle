// import THREE
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';

// Set up the scene, camera, and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(150, window.innerWidth / window.innerHeight, 1.1, 100);
camera.position.z = 4;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Define Material//
const material = new THREE.LineBasicMaterial({color: 0xfffff});

// create points
const points = [];
points.push( new THREE.Vector3( 0, 0, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );
points.push( new THREE.Vector3( 10, 10, 0 ) );
points.push( new THREE.Vector3( -1000, -1000, -10000 ) );


const geometry = new THREE.BufferGeometry().setFromPoints( points );

// turn those points into a line

const line = new THREE.Line( geometry, material );

// now render scene
scene.add(line);
renderer.render(scene, camera);
