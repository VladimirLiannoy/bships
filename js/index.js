var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;

var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 500);

var renderer = new THREE.WebGLRenderer({antialias: true});


var ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
scene.add(ambientLight);
/*var directionalLight = new THREE.DirectionalLight(0xeeeeee);
directionalLight.position.set(1, 1, -1);
directionalLight.position.normalize();
scene.add(directionalLight);*/

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



var TextureLoader = new THREE.TextureLoader();
var imgTxt = TextureLoader.load( "img/sea.jpg" );
imgTxt.wrapS = THREE.RepeatWrapping;
imgTxt.wrapT = THREE.RepeatWrapping;
imgTxt.repeat.set( 30, 30 );
var mtrl = new THREE.MeshBasicMaterial({ map: imgTxt });
mtrl.transparent = true;
mtrl.opacity = 0.8;

var mesh = new THREE.Mesh(new THREE.PlaneGeometry(500, 500), mtrl);
mesh.rotation.x = Math.PI + Math.PI / 2;
mesh.name = "water";
scene.add(mesh);


scene.background = new THREE.Color(0xcccccc);


/*var loader = new THREE.GLTFLoader();
loader.load('obj/bbb/scene.gltf', function (gltf) {
    //scene.add(gltf.scene);

    gltf.scene.scale.set(0.3, 0.3, 0.3);

    //ship = new Ship(gltf.scene);
    //cameraController.ship = ship;

    console.log(gltf);
});*/

var tst, obj;

var MTLLoader = new THREE.MTLLoader();
MTLLoader.setPath('obj/b1/');
MTLLoader.load('ship_01.mtl', function (materials) {
    materials.preload();

    var OBJLoader = new THREE.OBJLoader();

    OBJLoader.setMaterials(materials);
    OBJLoader.setPath('obj/b1/');
    OBJLoader.load('ship_01.obj', function (object) {
        object.scale.set(0.03, 0.03, 0.03);
        scene.add(object);

        var material = new THREE.MeshNormalMaterial();

        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = material;
            }
        });

        console.log(object);

        var geometry2 = new THREE.CubeGeometry(30, 30, 30);
        var geometry3 = new THREE.SphereGeometry(15, 32, 32);

        var material2 = new THREE.MeshNormalMaterial();
        var material3 = new THREE.MeshNormalMaterial();

        var cannon = new THREE.Mesh(geometry2, material2);
        var cannonDulo = new THREE.Mesh(geometry3, material3);

        cannonDulo.position.z = 20;

        var turelGroup = new THREE.Group();
        turelGroup.position.y = 150;
        turelGroup.position.z = 350;


        turelGroup.add(cannon);
        turelGroup.add(cannonDulo);
        object.add(turelGroup);

        var axesHelper = new THREE.AxesHelper(50);
        scene.add(axesHelper);

        tst = object.children[0];
        obj = object;

        ship = new Ship(object, axesHelper);

        cameraController.ship = ship;
        cameraController.cannon = turelGroup;
    });


});


var time = 0,
    cameraController = new CameraControl(camera, renderer.domElement, scene);


var render = function () {
    time += 0.01;

    requestAnimationFrame(render);

    cube.position.x = Math.cos(time) * 4;
    cube.position.z = Math.sin(time) * 4;

    if (ship) {
        ship.update();
        cameraController.update(mesh);
    }

    renderer.render(scene, cameraController.camera);
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



