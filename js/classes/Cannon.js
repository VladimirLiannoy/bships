class Cannon {
    constructor(parentContainer, cannonConfig) {


        var geometry2 = new THREE.CubeGeometry(30, 30, 30);
        var geometry3 = new THREE.SphereGeometry(15, 32, 32);

        var material2 = new THREE.MeshNormalMaterial();
        var material3 = new THREE.MeshNormalMaterial();

        var cannon = new THREE.Mesh(geometry2, material2);
        var cannonDulo = new THREE.Mesh(geometry3, material3);

        cannonDulo.position.z = 20;

        var cannonContainer = new THREE.Group();
        cannonContainer.position.y = 150;
        cannonContainer.position.z = 350;


        cannonContainer.add(cannon);
        cannonContainer.add(cannonDulo);

        parentContainer.add(cannonContainer);

        /*var axesHelper = new THREE.AxesHelper(50);
        scene.add(axesHelper);*/


    }

    update() {

    }
}