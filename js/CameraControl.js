class CameraControl {
    constructor(camera, domElement, scene) {
        this.camera = camera;
        this.domElement = domElement;
        this.ship = null;

        this.seeking = false;
        this.seekingPrevX = 0;
        this.camRot = Math.PI + Math.PI / 2;

        this.cameraHeigth = 30;

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.addEventHandlers(domElement);

        this.pointer = this.addRedPointer(scene);
    }

    addRedPointer(scene){
        var geometry = new THREE.BoxGeometry(1, 1);
        var material = new THREE.MeshNormalMaterial();
        var pointer = new THREE.Mesh(geometry, material);

        scene.add(pointer);

        return pointer;
    }

    addEventHandlers(domElement) {
        var me = this;

        domElement.addEventListener("mousedown", function (event) {
            event.preventDefault();

            if (event.button === 2) {
                me.seeking = true;
                me.seekingPrevX = event.clientX;
                me.handleMouseMoveRotate(event);
            }

        }, false);

        domElement.addEventListener("mousemove", function (event) {
            event.preventDefault();

            if (me.seeking) {
                me.handleMouseMoveRotate(event);
            }

            me.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            me.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        }, false);

        domElement.addEventListener("mouseup", function (e) {
            e.preventDefault();

            if (e.button === 2) {
                me.handleMouseMoveRotate(e);
                me.seeking = false;
            }

        }, false);

        domElement.addEventListener("wheel", function (event) {
            if (event.deltaY < 0) {

                me.dollyOut();

            } else if (event.deltaY > 0) {

                me.dollyIn();

            }

        }, false);

        domElement.addEventListener("contextmenu", function (e) {
            e.preventDefault();
        }, false);
    }

    handleMouseMoveRotate(event) {
        var me = this,
            rotateDelta = me.seekingPrevX - event.clientX;

        me.seekingPrevX = event.clientX;

        me.camRot += rotateDelta / 100;
    }

    dollyOut() {
        var me = this;

        me.cameraHeigth -= 1;
    }

    dollyIn() {
        var me = this;

        me.cameraHeigth += 1;
    }

    update(mesh) {
        var me = this,
            shipPosition = me.ship.getMesh().position;

        me.camera.position.x = shipPosition.x + Math.sin(me.camRot) * me.cameraHeigth;
        me.camera.position.z = shipPosition.z + Math.cos(me.camRot) * me.cameraHeigth;

        me.camera.position.y = me.cameraHeigth;

        me.camera.lookAt(shipPosition);

        me.raycaster.setFromCamera(me.mouse, me.camera);

        var intersects = me.raycaster.intersectObject(mesh);

        for (var i = 0; i < intersects.length; i++) {
            if (intersects[i].object.name === "water") {
                //console.log(intersects[i].point.x, intersects[i].point.z);
                me.pointer.position.x = intersects[i].point.x;
                me.pointer.position.z = intersects[i].point.z;
            }
        }

        //console.log(intersects);

    }
}