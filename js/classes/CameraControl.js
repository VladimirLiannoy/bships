class CameraControl {
    constructor(camera, domElement, scene) {
        this.camera = camera;
        this.domElement = domElement;
        this.ship = null;

        this.seeking = false;
        this.seekingPrevX = 0;
        this.camRot = 0;//Math.PI + Math.PI / 2;

        this.cameraHeigth = 30;

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.addEventHandlers(domElement);

        this.pointer = this.addRedPointer(scene);
        this.line = this.targetLinePointer(scene);

        var TextureLoader = new THREE.TextureLoader();
        var imgTxt = TextureLoader.load("img/sea.jpg");
        imgTxt.wrapS = THREE.RepeatWrapping;
        imgTxt.wrapT = THREE.RepeatWrapping;
        imgTxt.repeat.set(30, 30);
        var mtrl = new THREE.MeshBasicMaterial({map: imgTxt});
        mtrl.transparent = true;
        mtrl.opacity = 0.8;

        var mesh = new THREE.Mesh(new THREE.PlaneGeometry(500, 500), mtrl);
        mesh.rotation.x = Math.PI + Math.PI / 2;
        mesh.name = "water";
        scene.add(mesh);

        this.mesh = mesh;
    }

    addRedPointer(scene) {
        var geometry = new THREE.BoxGeometry(1, 1);
        var material = new THREE.MeshNormalMaterial();
        var pointer = new THREE.Mesh(geometry, material);

        scene.add(pointer);

        return pointer;
    }

    targetLinePointer(scene) {
        var material = new THREE.LineBasicMaterial({
            color: 0x0000ff
        });

        var geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3(0, 1, 0),
            new THREE.Vector3(0, 1, 0)
        );

        var line = new THREE.Line(geometry, material);

        scene.add(line);

        console.error(line);

        return line;
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

    update() {
        var me = this,
            shipPosition = me.ship.position;
            /*mesh = me.mesh,
            shipPosition = me.ship.getMesh().position,
            shipScale = me.ship.getMesh().scale,
            shipRotation = me.ship.getMesh().rotation,
            cannonPosition = me.cannon.position,
            cPos = new THREE.Vector3(
                cannonPosition.x * shipScale.x,
                cannonPosition.y * shipScale.y,
                cannonPosition.z * shipScale.z
            );*/

        /*function rotateVectorByAngle(vector, angle) {
            return new THREE.Vector2(
                Math.cos(angle) * vector.x - Math.sin(angle) * vector.y,
                Math.sin(angle) * vector.x + Math.cos(angle) * vector.y
            );
        }*/

        me.camera.position.x = shipPosition.x + Math.sin(me.camRot) * me.cameraHeigth;
        me.camera.position.z = shipPosition.z + Math.cos(me.camRot) * me.cameraHeigth;

        me.camera.position.y = me.cameraHeigth;

        me.camera.lookAt(shipPosition);

        /*me.raycaster.setFromCamera(me.mouse, me.camera);

        var intersects = me.raycaster.intersectObject(mesh);

        for (var i = 0; i < intersects.length; i++) {
            if (intersects[i].object.name === "water") {
                //console.log(intersects[i].point.x, intersects[i].point.z);
                me.pointer.position.x = intersects[i].point.x;
                me.pointer.position.z = intersects[i].point.z;

                var newRotCPos = rotateVectorByAngle(new THREE.Vector2(cPos.x, cPos.z), Math.PI * 2 - shipRotation.y);

                cPos.x = newRotCPos.x + shipPosition.x;
                cPos.z = newRotCPos.y + shipPosition.z;

                me.line.geometry.vertices[0].x = cPos.x;
                me.line.geometry.vertices[0].z = cPos.z;
                me.line.geometry.vertices[0].y = cPos.y;

                me.line.geometry.vertices[1].x = intersects[i].point.x;
                me.line.geometry.vertices[1].z = intersects[i].point.z;

                me.line.geometry.verticesNeedUpdate = true;

                var angl = Math.atan2(intersects[i].point.x - cPos.x, intersects[i].point.z - cPos.z) -
                    me.ship.getMesh().rotation.y;

                me.cannon.rotation.y = angl;
            }
        }*/

        //console.log(intersects);

    }
}