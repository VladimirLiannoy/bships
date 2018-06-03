var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;

var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
var shipCamera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();

//var light = new THREE.AmbientLight( 0xFFCC33 );

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh(geometry, material);
var ship;

//var loader = new THREE.ObjectLoader();

/*loader.load("obj/pirate-ship-giant2.json", function (obj) {

    var grp = new THREE.Group();

    obj.rotation.x = Math.PI / 2;
    obj.rotation.y = Math.PI;

    grp.add(obj);
    scene.add(grp);

    ship = new Ship(grp);
});*/


THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());
THREE.Loader.Handlers.add(/\.tga$/i, new THREE.TGALoader());

var ldr = new THREE.MTLLoader();

ldr.setPath('obj/');
ldr.load('b1.mtl', function (materials) {
    materials.preload();

    var ldr2 = new THREE.OBJLoader();

    ldr2.setMaterials(materials);
    ldr2.setPath('obj/');
    ldr2.load('b1.obj', function (object) {
        scene.add(object);

        object.children.forEach(function (obj) {

            obj.material = new THREE.MeshNormalMaterial();
        });

        console.log(object);

        //var grp = new THREE.Group();

        /*obj.rotation.x = Math.PI / 2;
        obj.rotation.y = Math.PI;*/

        //grp.add(object);
        //scene.add(object);

        ship = new Ship(object);
    });
});


var helper = new THREE.GridHelper(150, 5);
helper.rotation.x = Math.PI / 2;
scene.add(helper);

scene.add(cube);
//scene.add( light );

scene.background = new THREE.Color(0xcccccc);

var camRot = Math.PI + Math.PI / 2;

var time = 0,
    currentCamera = camera;


var render = function () {
    time += 0.01;

    requestAnimationFrame(render);
    //cube.rotation.z += 0.1;
    //cube.rotation.y += 0.01;
    cube.position.x = Math.cos(time) * 4;
    cube.position.y = Math.sin(time) * 4;
    renderer.render(scene, currentCamera);

    if (ship) {
        ship.update();
        //shipCamera.position.x = ship.meshElement.position.x;
        //shipCamera.position.y = ship.meshElement.position.y;

        camera.position.z = 30;
        camera.position.x = ship.meshElement.position.x + Math.cos(camRot) * 10;
        camera.position.y = ship.meshElement.position.y + Math.sin(camRot) * 10;

        //camera.rotation.x = Math.PI / 4;

        camRot+=0.005;
    }
};

render();

shipCamera.rotation.x = Math.PI / 2;
//hipCamera.position.y = 5.939456736779443;
shipCamera.position.z = 4;


/*var cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
//controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
cameraControls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
cameraControls.dampingFactor = 0.25;
cameraControls.screenSpacePanning = false;
cameraControls.minDistance = 0.1;
cameraControls.maxDistance = 1000;
cameraControls.maxPolarAngle = Math.PI;
cameraControls.enableKeys = false;*/

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

var seeking = false, seekingPrevX = 0;

renderer.domElement.addEventListener("mousedown", function (e) {
    console.log(e);

    e.preventDefault();
    //e.stopPropagation();

    if (e.button === 2) {
        seeking = true;
        handleMouseMoveRotate(e);
    }

}, false);

renderer.domElement.addEventListener("mousemove", function (e) {
    //console.log(e);

    e.preventDefault();
    //e.stopPropagation();

    if (seeking) {
        handleMouseMoveRotate(e);
    }

}, false);

renderer.domElement.addEventListener("mouseup", function (e) {
    //console.log(e);

    e.preventDefault();
    //e.stopPropagation();

    if (e.button === 2) {
        handleMouseMoveRotate(e);
        seeking = false;
    }

}, false);

renderer.domElement.addEventListener("contextmenu", function (e) {
    e.preventDefault();
}, false);

function handleMouseMoveRotate(event) {

    //console.log( 'handleMouseMoveRotate' );


    var rotateDelta = seekingPrevX - event.clientX;
    seekingPrevX = event.clientX;

    camRot += rotateDelta / 100;

}


