var direction = {
    ERROR: -1,
    EAST: 0,
    NORTH: 1,
    WEST: 2,
    SOUTH: 3,
    NORTH_EAST: 4,
    NORTH_WEST: 5,
    SOUTH_WEST: 6,
    SOUTH_EAST: 7
}

var angle_dir = {
    EAST: {angle1: 67.5, angle2: 112.5},
    NORTH: {angle1: -22.5, angle2: 22.5},
    WEST: {angle1: -112.5, angle2: -67.5},
    SOUTH: {angle1: -157.5, angle2: 157.5},
    NORTH_EAST: {angle1: 22.5, angle2: 67.5},
    NORTH_WEST: {angle1: -67.5, angle2: -22.5},
    SOUTH_WEST: {angle1: -157.5, angle2: -112.5},
    SOUTH_EAST: {angle1: 112.5, angle2: 157.5}
}

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.raduis = 100;
        this.rocker = this.node.getChildByName('Rocker');
        this.rockerPosition = {x: this.rocker.x, y: this.rocker.y};

        this.node.on(cc.Node.EventType.TOUCH_START, this.onStartEvent.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onMoveEvent.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onEndEvent.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onCancelEvent.bind(this), this);
    },

    start () {

    },

    //计算角度
    angle: function (r) {
        return r*180 / Math.PI;
    },

    getRaduis: function (x, y) {
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    },

    getAngle: function (x, y) {
        return cc.Utl.angle(Math.atan2(x, y));
    },

    directionOfAngle: function (angle) {
        if (angle > angle_dir.EAST.angle1 && angle <= angle_dir.EAST.angle2) {
            return direction.EAST;
        }
        else if (angle > angle_dir.NORTH.angle1 && angle <= angle_dir.NORTH.angle2) {
            return direction.NORTH;
        }
        else if (angle > angle_dir.WEST.angle1 && angle <= angle_dir.WEST.angle2) {
            return direction.WEST;
        }
        else if (angle <= angle_dir.SOUTH.angle1 || angle > angle_dir.SOUTH.angle2 && angle <= 180) {
            return direction.SOUTH;
        }
        else if (angle > angle_dir.NORTH_EAST.angle1 && angle <= angle_dir.NORTH_EAST.angle2) {
            return direction.NORTH_EAST;
        }
        else if (angle > angle_dir.NORTH_WEST.angle1 && angle <= angle_dir.NORTH_WEST.angle2) {
            return direction.NORTH_WEST;
        }
        else if (angle > angle_dir.SOUTH_WEST.angle1 && angle <= angle_dir.SOUTH_WEST.angle2) {
            return direction.SOUTH_WEST;
        }
        else if (angle > angle_dir.SOUTH_EAST.angle1 && angle <= angle_dir.SOUTH_EAST.angle2) {
            return direction.SOUTH_EAST;
        }
    },

    eightDirectionExcute: function (angle) {
        if (this.directionOfAngle(angle) == direction.EAST) {
            //东
            cc.MobileAzimuth.toEast();
        }
        else if (this.directionOfAngle(angle) == direction.NORTH) {
            //北
            cc.MobileAzimuth.toNorth();
        }
        else if (this.directionOfAngle(angle) == direction.WEST) {
            //西
            cc.MobileAzimuth.toWest();
        }
        else if (this.directionOfAngle(angle) == direction.SOUTH) {
            //南
            cc.MobileAzimuth.toSouth();
        }
        else if (this.directionOfAngle(angle) == direction.NORTH_EAST) {
            //东北
            cc.MobileAzimuth.toNortheast();
        }
        else if (this.directionOfAngle(angle) == direction.NORTH_WEST) {
            //西北
            cc.MobileAzimuth.toNorthwest();
        }
        else if (this.directionOfAngle(angle) == direction.SOUTH_WEST) {
            //西南
            cc.MobileAzimuth.toSouthwest();
        }
        else if (this.directionOfAngle(angle) == direction.SOUTH_EAST) {
            //东南
            cc.MobileAzimuth.toSoutheast();
        }
    },

    onStartEvent: function (event) {

    },

    onMoveEvent: function (event) {
        var delta = event.touch.getDelta();
        this.rockerPosition.x += delta.x;
        this.rockerPosition.y += delta.y;
        this.angle = this.getAngle(this.rockerPosition.x, this.rockerPosition.y);
        this.eightDirectionExcute(this.angle);
        if (this.getRaduis(this.rockerPosition.x, this.rockerPosition.y) <= this.raduis) {
            this.rocker.x = this.rockerPosition.x;
            this.rocker.y = this.rockerPosition.y;
        }
        else {
            var y = Math.cos(Math.atan2(this.rockerPosition.x, this.rockerPosition.y)) * this.raduis;
            var x = Math.sin(Math.atan2(this.rockerPosition.x, this.rockerPosition.y)) * this.raduis;
            this.rocker.x = x;
            this.rocker.y = y;
        }
    },

    onEndEvent: function (event) {
        this.rocker.x = 0;
        this.rocker.y = 0;
        this.rockerPosition.x = 0;
        this.rockerPosition.y = 0;
        this.angle = null;
        cc.MobileAzimuth.stand();
    },

    onCancelEvent: function (event) {
        this.rocker.x = 0;
        this.rocker.y = 0;
        this.rockerPosition.x = 0;
        this.rockerPosition.y = 0;
        this.angle = null;
        cc.MobileAzimuth.stand();
    },

    update (dt) {
        if (this.angle != null) {
            // this.eightDirectionExcute(this.angle);
        }
    },
});
