class Ship {

    constructor(meshElement) {
        var me = this;

        me.meshElement = meshElement;

        me.curSpeed = 0;
        me.acceleration = 0.001;
        me.direction = 0;
        me.directionChangeSpeed = 0.01;

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
        var me = this;

        if (me.isAccelerates) {
            me.curSpeed += me.acceleration;
        } else if (me.isDeaccelerates) {
            me.curSpeed -= me.acceleration;
        } else if (me.isTrunsLeft) {
            me.direction += me.directionChangeSpeed;
        } else if (me.isTrunsRight) {
            me.direction -= me.directionChangeSpeed;
        }

        me.meshElement.position.x = me.meshElement.position.x + Math.cos(me.direction) * me.curSpeed;
        me.meshElement.position.y = me.meshElement.position.y + Math.sin(me.direction) * me.curSpeed;


        me.meshElement.rotation.z = me.direction;
    }
}