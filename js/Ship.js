class Ship {

    constructor(meshElement, axesHelper) {
        var me = this;

        me.meshElement = meshElement;
        me.axesHelper = axesHelper;

        axesHelper.position.z = 5;

        me.maxSpeed = 10;
        me.curSpeed = 0;
        me.acceleration = 0.0005;
        me.direction = 0;
        me.directionChangeSpeed = 0.2;

        me.isAccelerates = false;
        me.isDeaccelerates = false;
        me.isTrunsLeft = false;
        me.isTrunsRight = false;

        window.addEventListener("keydown", function (e) {
            var key = e.keyCode;

            if (key === 38) {
                me.isAccelerates = true;
            } else if (key === 40) {
                me.isDeaccelerates = true;
            } else if (key === 37) {
                me.isTrunsLeft = true;
            } else if (key === 39) {
                me.isTrunsRight = true;
            }
        });

        window.addEventListener("keyup", function (e) {
            var key = e.keyCode;

            if (key === 38) {
                me.isAccelerates = false;
            } else if (key === 40) {
                me.isDeaccelerates = false;
            } else if (key === 37) {
                me.isTrunsLeft = false;
            } else if (key === 39) {
                me.isTrunsRight = false;
            }
        });
    }

    update() {
        var me = this,
            x = me.meshElement.position.x,
            z = me.meshElement.position.z,
            speedPercent = me.curSpeed / me.maxSpeed;

        if (me.isAccelerates) {
            me.curSpeed += me.acceleration;
        } else if (me.isDeaccelerates) {
            me.curSpeed -= me.acceleration;
        }

        if (me.isTrunsLeft) {
            me.direction += me.directionChangeSpeed;// * speedPercent;
        } else if (me.isTrunsRight) {
            me.direction -= me.directionChangeSpeed;// * speedPercent;
        }

        x = x + Math.sin(me.direction) * me.curSpeed;
        z = z + Math.cos(me.direction) * me.curSpeed;

        me.meshElement.position.x = x;
        me.meshElement.position.z = z;

        me.axesHelper.position.x = x;
        me.axesHelper.position.z = z;

        me.meshElement.rotation.y = me.direction;// + Math.PI;
        me.axesHelper.rotation.y = me.direction;
    }

    getMesh() {
        return this.meshElement;
    }
}