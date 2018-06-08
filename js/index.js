var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;

var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 500);

var renderer = new THREE.WebGLRenderer({antialias: true});


var ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
scene.add(ambientLight);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh(geometry, material);
var ship;


var helper = new THREE.GridHelper(500, 500);
scene.add(helper);
scene.add(cube);


/**/

scene.background = new THREE.Color(0xcccccc);


/*var loader = new THREE.GLTFLoader();
loader.load('obj/bbb/scene.gltf', function (gltf) {
    //scene.add(gltf.scene);

    gltf.scene.scale.set(0.3, 0.3, 0.3);

    //ship = new Ship(gltf.scene);
    //cameraController.ship = ship;

    console.log(gltf);
});*/


var time = 0,
    cameraController = new CameraControl(camera, renderer.domElement, scene);

var shipManager = new ShipManager(scene, cameraController);

shipManager.createShip({
    model: {
        url: "obj/b1/ship_01.obj",
        scale: 0.03
    },
    position: {
        x: 0,
        y: 0,
        z: 0
    },
    cannons: [
        {
            position: {
                x: 0,
                y: 150,
                z: 350
            }
        },
        {
            position: {
                x: 0,
                y: 150,
                z: -100
            }
        }
    ]
});


var render = function () {
    time += 0.01;

    cube.position.x = Math.cos(time) * 4;
    cube.position.z = Math.sin(time) * 4;

    shipManager.update();
    cameraController.update();

    renderer.render(scene, cameraController.camera);

    requestAnimationFrame(render);
};

render();

/*var cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
//controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
cameraControls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
cameraControls.dampingFactor = 0.25;
cameraControls.screenSpacePanning = false;
cameraControls.minDistance = 0.1;
cameraControls.maxDistance = 1000;
cameraControls.maxPolarAngle = Math.PI;
cameraControls.enableKeys = false;*/

/*
window.addEventListener("keydown", function (e) {
    var key = e.keyCode;

    if (key === 16) {
        cameraControls.enabled = false;
        //shipCameraControls.enabled = true;
        currentCamera = shipCamera;
    }
});

window.addEventListener("keyup", function (e) {
    var key = e.keyCode;

    if (key === 16) {
        cameraControls.enabled = true;
        //shipCameraControls.enabled = false;
        currentCamera = camera;
    }

});
*/



