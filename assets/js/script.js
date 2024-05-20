import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera,
    controls,
    scene,
    renderer;
var light1,
    light2,
    light3;
var model,
    model_loaded;
var modelstatus = false;

init();
animate();

function init() {
    // scene
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x999999)//scene.fog = new THREE.FogExp2( 0xcccccc, 0.01 )

    // renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputEncoding = THREE.sRGBEncoding;
    document.body.appendChild(renderer.domElement)
    // camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000)
    camera.position.set(0, 0, 40)
    // controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.listenToKeyEvents(window); // optional
    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    //controls.screenSpacePanning = false;
    controls.enableZoom = false;
    controls.minDistance = 40;
    controls.maxDistance = 40;
    //controls.maxPolarAngle = 0;
    //controls.minPolarAngle = Math.PI/2;
    //controls.maxPolarAngle = Math.PI/2;

    // world
    const loader = new GLTFLoader()
    // Tweak the materials and transparency
    var newMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff
    });
    newMaterial.transparent = true;
    newMaterial.opacity = 0.3;
    newMaterial.metalness = 0.8;
    newMaterial.roughness = 0.5;

    const onLoad = (glb) => {
        console.log('model loaded');
        scene.add(glb.scene);
        glb.scene.scale.set(1, 1, 1)
        glb.scene.position.set(15, -8, -29);
        glb.scene.traverse((object) => {
            if (object.isMesh)
                object.material = newMaterial;
        });
        modelstatus = true;
        model_loaded = glb
        init_gsap();
    }

    loader.load('https://mitsukosato.com/wp-content/themes/lay-2/assets/wordmark-2.glb', (glb) => onLoad(glb))
    // helper
    const axesHelper = new THREE.AxesHelper(5);
    //scene.add( axesHelper );

    // lights
    light1 = new THREE.DirectionalLight(0xffffff, 5)
    light1.position.set(0, 0, 100)
    scene.add(light1)
    var helper = new THREE.DirectionalLightHelper(light1, 5)//scene.add(helper);

    light2 = new THREE.DirectionalLight(0xffffff, 2);
    light2.position.set(0, 0, -100);
    scene.add(light2);
    var helper2 = new THREE.DirectionalLightHelper(light2, 5)//scene.add(helper2);

    light3 = new THREE.AmbientLight(0x555555, 0.5);
    light3.position.set(0, 50, 50);
    scene.add(light3);

    // events
    window.addEventListener('resize', onWindowResize);
}



function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

var r = 0.0;
function animate() {

    light1.position.x = -75 * Math.cos(r);
    light1.position.z = -75 * Math.sin(r);

    light2.position.x = 75 * Math.cos(r);
    light2.position.z = 75 * Math.sin(r);
    r += 0.005;

    //
    requestAnimationFrame(animate)
    controls.update();
    render();

}

function init_gsap() {

    model = model_loaded.scene.children[0];

    var tl = gsap.timeline({
        paused: false,
        repeat: -1,
        yoyo: true
    });
    tl.fromTo(model.position, 100,
    {
        x: 0,
        y: 0,
        ease: 'none'
    },
    {
        x: -50,
        y: 0,
        ease: 'none'
    }
    );

}

function render() {
    renderer.render(scene, camera);
}