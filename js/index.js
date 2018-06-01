var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

//var light = new THREE.AmbientLight( 0x444444 );

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh(geometry, material);
var ship;

var loader = new THREE.ObjectLoader();

loader.load("obj/pirate-ship-giant2.json", function (obj) {

    var grp = new THREE.Group();

    obj.rotation.x = Math.PI / 2;
    obj.rotation.y = Math.PI;

    grp.add(obj);
    scene.add(grp);

    ship = new Ship(grp);
});


/*THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());
THREE.Loader.Handlers.add(/\.tga$/i, new THREE.TGALoader());

var ldr = new THREE.MTLLoader();

ldr.setPath('obj/fishing-boat-obj/');
ldr.load('fishing-boat.mtl', function (materials) {
    materials.preload();

    var ldr2 = new THREE.OBJLoader();

    ldr2.setMaterials(materials);
    ldr2.setPath('obj/fishing-boat-obj/');
    ldr2.load('fishing-boat.obj', function (object) {
        //object.position.y = - 95;
        object.rotation.x = Math.PI / 2;
        object.rotation.y = Math.PI / 2;
        scene.add(object);

        //var grp = new THREE.Group();

        /!*obj.rotation.x = Math.PI / 2;
        obj.rotation.y = Math.PI;*!/

        //grp.add(object);
        //scene.add(object);

        ship = new Ship(object);
    });
});*/


var helper = new THREE.GridHelper(150, 5);
helper.rotation.x = Math.PI / 2;
scene.add(helper);

scene.add(cube);
//scene.add( light );

scene.background = new THREE.Color(0xcccccc);

camera.position.z = 10;

var time = 0;


var render = function () {
    time += 0.01;

    requestAnimationFrame(render);
    //cube.rotation.z += 0.1;
    //cube.rotation.y += 0.01;
    cube.position.x = Math.cos(time) * 2;
    cube.position.y = Math.sin(time) * 2;
    renderer.render(scene, camera);

    if (ship) {
        ship.update();
    }
};

render();

/*camera.position.x = 7.701354114139927;
camera.position.y = 5.939456736779443;
camera.position.z = 2.326370237203313;*/

var controls = new THREE.OrbitControls(camera, renderer.domElement);
//controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.minDistance = 0.1;
controls.maxDistance = 1000;
controls.maxPolarAngle = Math.PI;
controls.enableKeys = false;



