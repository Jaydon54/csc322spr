// import THREE
import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js"
// import Orbit controls
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

// Set up the scene, camera, and renderer
var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000)
// adj camera pos to see whole monument
camera.position.set(0, 750, 600);

//rendrer
var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// All vertices(x, y, z)
const vertices = new Float32Array( [
	//base corners
  27.5, 0, 27.5, 	// 0
  -27.5, 0, 27.5, 	// 1
  -27.5, 0, -27.5, // 2
  27.5, 0, -27.5, 	// 3
  
 // Top corners (below pyramid)
 -17, 500, 17, 		// 4 
 17, 500, 17, 			// 5
 -17, 500, -17,	 	// 6
 17, 500, -17, 		// 7
 
 //pyramid peak
 0, 555, 0				// 8
] );

//define faces using indices
const indices = [
// tower faces
	2, 3, 7,  2, 6, 7, //front 	
  0, 3, 7,  0, 5, 7, //right	
  0, 1, 4,  0, 4, 5, //back	
  1, 2, 4,  2, 4, 6, //left	
  
  //pyramid
  4, 5, 8,	
  5, 7, 8,		
  7, 6, 8,		
  6, 4, 8			
];

// create geometry
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
geometry.setIndex(indices);
geometry.computeVertexNormals();

//materials/colors for different sides
const material = [
		new THREE.MeshBasicMaterial({color: 0x00ff00, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({color: "rgb(255, 0, 0)", side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({color: "skyblue", side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({color: "rgb(123, 5, 90)", side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({color: "yellow", side: THREE.DoubleSide})
]

// noew assign colors to faces
geometry.clearGroups();
geometry.addGroup(0, 6, 0); // front face = color[0]
geometry.addGroup(6, 6, 1); // right face = color[1]
geometry.addGroup(12, 6, 2); // back face = color[2]
geometry.addGroup(18, 6, 3); // left face = color[3]
geometry.addGroup(24, 3, 4); // pyramid = color[4] face 1
geometry.addGroup(27, 3, 4); //face1
geometry.addGroup(30, 3, 4); // face3
geometry.addGroup(33, 3, 4); // face4

//mesh
const monument = new THREE.Mesh(geometry, material);
scene.add(monument);


// orbital controls
var controls = new OrbitControls (camera, renderer.domElement);
controls.target.set(0, 250, 0);
// Set up animation
var animate = function () {
  requestAnimationFrame(animate);
  monument.rotation.y += 0.01;
  
  controls.update();

  renderer.render(scene, camera);
};


// start animation
animate();
