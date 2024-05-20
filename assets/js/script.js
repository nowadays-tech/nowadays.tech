import * as THREE from 'three';

import { AsciiEffect } from 'three/addons/effects/AsciiEffect.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';

let camera, controls, scene, renderer, effect;

let sphere, plane;
const myMesh = new THREE.Mesh();

//Material
const material = new THREE.MeshStandardMaterial()
material.flatShading = true
material.side = THREE.DoubleSide;

const start = Date.now();
const stlLoader = new STLLoader()

init();
animate();

function init() {

  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.y = 0;
  camera.position.z = 0;

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0, 0, 0 );

  const pointLight1 = new THREE.PointLight( 0xffffff, 3, 0, 0 );
  pointLight1.position.set( 500, 500, 500 );
  scene.add( pointLight1 );

  const pointLight2 = new THREE.PointLight( 0xffffff, 1, 0, 0 );
  pointLight2.position.set( - 500, - 500, - 500 );
  scene.add( pointLight2 );

  stlLoader.load(
    './assets/3d/nowadays.stl',
    function (geometry) {

        myMesh.material = material;
        myMesh.geometry = geometry;

        var tempGeometry = new THREE.Mesh(geometry, material)
        myMesh.position.copy = (tempGeometry.position)

        geometry.computeVertexNormals();
        myMesh.geometry.center()

        myMesh.rotation.y = Math.PI / 2;

        myMesh.geometry.computeBoundingBox();
        var bbox = myMesh.geometry.boundingBox;

        // myMesh.position.y = ((bbox.max.z - bbox.min.z));

        camera.position.x = ((bbox.max.x * 0.9));
        // camera.position.y = ((bbox.max.y / 2));
        camera.position.z = ((bbox.max.z / 2));

        scene.add(myMesh);
      }
   )


  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );

  effect = new AsciiEffect( renderer, ' .:-+*=%@#', { invert: true } );
  effect.setSize( window.innerWidth, window.innerHeight );
  effect.domElement.style.color = 'white';
  effect.domElement.style.backgroundColor = 'gray';

  // Special case: append effect.domElement, instead of renderer.domElement.
  // AsciiEffect creates a custom domElement (a div container) where the ASCII elements are placed.

  document.body.appendChild( effect.domElement );

  controls = new TrackballControls( camera, effect.domElement );

  //

  window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
  effect.setSize( window.innerWidth, window.innerHeight );

}

//

function animate() {

  requestAnimationFrame( animate );

  render();

}

function render() {
  const timer = Date.now() - start;

  myMesh.rotation.y = Math.PI / 180 * timer * 0.01;

  controls.update();

  effect.render( scene, camera );
}