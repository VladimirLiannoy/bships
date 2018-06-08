class ShipManager {
    constructor(scene, cameraController) {
        var me = this;

        me.ships = [];

        me.currentShip = null;

        me.scene = scene;
        me.cameraController = cameraController;

        me.createEventListeners();
    }

    createShip(config) {
        var me = this,
            newShip = new Ship(me.scene, config);

        me.ships.push(newShip);

        //TODO:refactor this
        me.currentShip = newShip;
        me.cameraController.ship = newShip;
    }

    createEventListeners() {
        var me = this;

        window.addEventListener("keydown", function (e) {
            var key = e.keyCode;

            if (key === 38) {
                me.currentShip.isAccelerates = true;
            } else if (key === 40) {
                me.currentShip.isDeaccelerates = true;
            } else if (key === 37) {
                me.currentShip.isTrunsLeft = true;
            } else if (key === 39) {
                me.currentShip.isTrunsRight = true;
            }
        });

        window.addEventListener("keyup", function (e) {
            var key = e.keyCode;

            if (key === 38) {
                me.currentShip.isAccelerates = false;
            } else if (key === 40) {
                me.currentShip.isDeaccelerates = false;
            } else if (key === 37) {
                me.currentShip.isTrunsLeft = false;
            } else if (key === 39) {
                me.currentShip.isTrunsRight = false;
            }
        });
    }

    update() {


        this.ships.forEach((ship) => ship.update());
    }
}