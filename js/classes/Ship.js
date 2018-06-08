class Ship {

    constructor(scene, config) {
        var me = this;

        me.container = new THREE.Group();

        scene.add(me.container);

        me.config = config;
        me.position = new THREE.Vector3(
            config.position.x,
            config.position.y,
            config.position.z
        );

        me.cannons = this.createCannons(me.container, config.cannons);

        me.maxSpeed = 10;
        me.curSpeed = 0;
        me.acceleration = 0.0005;
        me.direction = 0;
        me.directionChangeSpeed = 0.2;

        me.isAccelerates = false;
        me.isDeaccelerates = false;
        me.isTrunsLeft = false;
        me.isTrunsRight = false;

        me.loadModel(me.container, config.model);
    }

    createCannons(container, cannonsConfig) {
        var cannons = [];

        cannonsConfig.forEach(function (cannonConfig) {
            var cannon = new Cannon(container, cannonConfig);

            cannons.push(cannon);
        });

        return cannons;
    }

    loadModel(container, modelConfig) {
        var me = this,
            OBJLoader = new THREE.OBJLoader(),
            scale = modelConfig.scale,
            material = new THREE.MeshNormalMaterial();

        OBJLoader.load(modelConfig.url, function (object) {

            object.scale.set(scale, scale, scale);

            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = material;
                }
            });

            container.add(object);

            //me.mesh = object;

            console.log(object);
        });
    }

    update() {
        var me = this,
            x = me.position.x,
            z = me.position.z,
            speedPercent = me.curSpeed / me.maxSpeed,
            container = me.container;

        if(!me.mesh){
            return;
        }

        if (me.isAccelerates) {
            me.curSpeed += me.acceleration;
        } else if (me.isDeaccelerates) {
            me.curSpeed -= me.acceleration;
        }

        if (me.isTrunsLeft) {
            me.direction += me.directionChangeSpeed * speedPercent;
        } else if (me.isTrunsRight) {
            me.direction -= me.directionChangeSpeed * speedPercent;
        }

        me.position.x = me.position.x + Math.sin(me.direction) * me.curSpeed;
        me.position.z = me.position.z + Math.cos(me.direction) * me.curSpeed;

        container.position.x = me.position.x;
        container.position.y = me.position.y;
        container.position.z = me.position.z;

        container.rotation.y = me.direction;

        me.cannons.forEach((cannon) => cannon.update());
    }
}