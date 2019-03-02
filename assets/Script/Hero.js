var ToWestState = require('ToWestState');
var ToSouthState = require('ToSouthState');
var ToEastState = require('ToEastState');
var ToNorthState = require('ToNorthState');
var ToNortheastState = require('ToNortheastState');
var ToSoutheastState = require('ToSoutheastState');
var ToSouthwestState = require('ToSouthwestState');
var ToNorthwestState = require('ToNorthwestState');

var azimuth = {
    ERROR: 0,
    TO_EAST: 1,
    TO_NORTH: 2,
    TO_WEST: 3,
    TO_SOUTH: 4,
    TO_NORTHEAST: 5,
    TO_NORTHWEST: 6,
    TO_SOUTHWEST: 7,
    TO_SOUTHEAST: 8
}

cc.Class({
    extends: cc.Component,

    properties: {
        teammate: cc.Prefab,
        HP: 1,
        heroID: 0,
        row: 0,
        col: 0,
        moveDirRot: 0,
        moveDirVec: cc.Vec2,
        speed: 5
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    ctor() {
        this._state = null;
        this.azimuth = null;

        this.ToEastState = new ToEastState();//东
        this.ToWestState = new ToWestState();//西
        this.ToNorthState = new ToNorthState();//北
        this.ToSouthState = new ToSouthState();//南
        this.ToNortheastState = new ToNortheastState();//东北
        this.ToSoutheastState = new ToSoutheastState;//东南
        this.ToSouthwestState = new ToSouthwestState;//西南
        this.ToNorthwestState = new ToNorthwestState(); //西北
    },

    start () {
        
    },



    setHeroState: function (state) {
        this._state = state;
        this._state.setHero(this);
    },

    clearHeroState: function () {
        this._state = null;
    },

    getHeroState: function () {
        return this._state;
    },

    //计算旋转角度和向量
    rotAndVec: function (aimVec) {
        var selfVec = cc.p(this.node.x, this.node.y);
        this.moveDirVec = cc.pNormalize(cc.pSub(aimVec, selfVec));
        this.moveDirRot = cc.Utl.angle(cc.pToAngle(this.moveDirVec));
    },

    //在水平方向上计算坐标
    calculateCoordAtLevel: function (teamDisButArr, radian) {
        teamDisButArr.teamPos = null;
        teamDisButArr.teamPos = [];
        for (let i = 0; i < teamDisButArr.array.length; ++i) {
            for (let j = 0; j < teamDisButArr.array[i].length; ++j) {
                var y = Math.cos(radian - cc.Utl.radian(180)) * teamDisButArr.array[i][j]*(this.node.width + teamDisButArr.colSpacing) + this.node.y;
                var x = this.node.x - Math.cos(radian) * this.node.height * (i+1) - Math.cos(radian) * teamDisButArr.rowSpacing * (i+1);
                teamDisButArr.teamPos.push({x: x, y: y});
            }
        }
        this.teamDA = teamDisButArr;
    },

    //在垂直方式向上计算坐标
    calculateCoordAtVertical: function (teamDisButArr, radian) {
        teamDisButArr.teamPos = null;
        teamDisButArr.teamPos = [];
        for (let i = 0; i < teamDisButArr.array.length; ++i) {
            for (let j = 0; j < teamDisButArr.array[i].length; ++j) {
                var x = Math.sin(radian) * teamDisButArr.array[i][j]*(this.node.width + teamDisButArr.colSpacing) + this.node.x;
                var y = this.node.y - Math.sin(radian) * this.node.height * (i+1) - Math.sin(radian) * teamDisButArr.rowSpacing * (i+1);
                teamDisButArr.teamPos.push({x: x, y: y});
            }
        }
        this.teamDA = teamDisButArr;
    },

    //在斜率为正的倾斜方向上计算坐标，适用于东北，西南方向
    calculateCoordAtOblique1: function (teamDisButArr, radian) {
        teamDisButArr.teamPos = null;
        teamDisButArr.teamPos = [];
        for (let i = 0; i < teamDisButArr.array.length; ++i) {
            for (let j = 0; j < teamDisButArr.array[i].length; ++j) {
                var L = teamDisButArr.array[i][j]*(this.node.width + teamDisButArr.colSpacing);
                var L1 = this.node.height * (i+1) + teamDisButArr.rowSpacing * (i+1);
                var x = this.node.x + L*Math.cos(radian) - L1*Math.cos(radian);
                var y = this.node.y - L*Math.sin(radian) - L1*Math.sin(radian);
                teamDisButArr.teamPos.push({x: x, y: y});
            }
        }
        this.teamDA = teamDisButArr;
    },

    //在斜率为负的倾斜方向上计算坐标，适用于西北，东南方向
    calculateCoordAtOblique2: function (teamDisButArr, radian) {
        teamDisButArr.teamPos = null;
        teamDisButArr.teamPos = [];
        for (let i = 0; i < teamDisButArr.array.length; ++i) {
            for (let j = 0; j < teamDisButArr.array[i].length; ++j) {
                var L = teamDisButArr.array[i][j]*(this.node.width + teamDisButArr.colSpacing);
                var L1 = this.node.height * (i+1) + teamDisButArr.rowSpacing * (i+1);
                var x = this.node.x - L*Math.cos(radian) - L1*Math.cos(radian);
                var y = this.node.y + L*Math.sin(radian) - L1*Math.sin(radian);
                teamDisButArr.teamPos.push({x: x, y: y});
            }
        }
        this.teamDA = teamDisButArr;
    },

    toEast: function (teamDA) {
        // this._state.toEast(teamDA);
        this.azimuth = azimuth.TO_EAST;
        // this.teamDA = teamDA;
        var aimVec = cc.p(this.node.x + this.speed, this.node.y);
        this.rotAndVec(aimVec);
        this.calculateCoordAtLevel(teamDA, cc.pToAngle(this.moveDirVec));
    },

    toWest: function (teamDA) {
        // this._state.toWest(teamDA);
        this.azimuth = azimuth.TO_WEST;
        // this.teamDA = teamDA;
        var aimVec = cc.p(this.node.x - this.speed, this.node.y);
        this.rotAndVec(aimVec);
        this.calculateCoordAtLevel(teamDA, cc.pToAngle(this.moveDirVec));
    },

    toSouth: function (teamDA) {
        // this._state.toSouth(teamDA);
        this.azimuth = azimuth.TO_SOUTH;
        // this.teamDA = teamDA;
        var aimVec = cc.p(this.node.x, this.node.y - this.speed);
        var selfVec = cc.p(this.node.x, this.node.y);
        this.rotAndVec(aimVec, selfVec);
        this.calculateCoordAtVertical(teamDA, cc.pToAngle(this.moveDirVec));
    },

    toNorth: function (teamDA) {
        // this._state.toNorth(teamDA);
        this.azimuth = azimuth.TO_NORTH;
        // this.teamDA = teamDA;
        var aimVec = cc.p(this.node.x, this.node.y + this.speed);
        this.rotAndVec(aimVec);
        this.calculateCoordAtVertical(teamDA, cc.pToAngle(this.moveDirVec));
    },

    toNortheast: function (teamDA) {
        // this._state.toNortheast(teamDA);
        this.azimuth = azimuth.TO_NORTHEAST;
        // this.teamDA = teamDA;
        var v = Math.sqrt(Math.pow(this.speed, 2) / 2);
        var aimVec = cc.p(this.node.x + v, this.node.y + v);
        this.rotAndVec(aimVec);
        //计算斜率为正的斜方向上的坐标
        this.calculateCoordAtOblique1(teamDA, cc.pToAngle(this.moveDirVec));
        // console.log(cc.pToAngle(cc.p(this.node.x, this.node.y)) * 180 / Math.PI);
    },

    toSoutheast: function (teamDA) {
        // this._state.toSoutheast(teamDA);
        this.azimuth = azimuth.TO_SOUTHEAST;
        this.teamDA = teamDA;
        var v = Math.sqrt(Math.pow(this.speed, 2) / 2)
        var aimVec = cc.p(this.node.x + v, this.node.y - v);
        this.rotAndVec(aimVec);
        //计算斜率为负的斜方向上的坐标
        this.calculateCoordAtOblique2(teamDA, cc.pToAngle(this.moveDirVec));
    },

    toSouthwest: function (teamDA) {
        // this._state.toSouthwest(teamDA);
        this.azimuth = azimuth.TO_SOUTHWEST;
        this.teamDA = teamDA;
        var v = Math.sqrt(Math.pow(this.speed, 2) / 2)
        var aimVec = cc.p(this.node.x - v, this.node.y - v);
        this.rotAndVec(aimVec);
        //计算斜率为正的斜方向上的坐标
        this.calculateCoordAtOblique1(teamDA, cc.pToAngle(this.moveDirVec));
    },

    toNorthwest: function (teamDA) {
        // this._state.toNorthwest(teamDA);
        this.azimuth = azimuth.TO_NORTHWEST;
        this.teamDA = teamDA;
        var v = Math.sqrt(Math.pow(this.speed, 2) / 2)
        var aimVec = cc.p(this.node.x - v, this.node.y + v);
        this.rotAndVec(aimVec);
        //计算斜率为负的斜方向上的坐标
        this.calculateCoordAtOblique2(teamDA, cc.pToAngle(this.moveDirVec));
    },

    stand: function () {
        this.azimuth = azimuth.ERROR;
    },

    update (dt) {
        if (this.azimuth == azimuth.TO_EAST) {
            this._state.toEast(this.teamDA);
        }
        else if (this.azimuth == azimuth.TO_NORTH) {
            this._state.toNorth(this.teamDA);
        }
        else if (this.azimuth == azimuth.TO_WEST) {
            this._state.toWest(this.teamDA);
        }
        else if (this.azimuth == azimuth.TO_SOUTH) {
            this._state.toSouth(this.teamDA);
        }
        else if (this.azimuth == azimuth.TO_NORTHEAST) {
            this._state.toNortheast(this.teamDA);
        }
        else if (this.azimuth == azimuth.TO_NORTHWEST) {
            this._state.toNorthwest(this.teamDA);
        }
        else if (this.azimuth == azimuth.TO_SOUTHEAST) {
            this._state.toSoutheast(this.teamDA);
        }
        else if (this.azimuth == azimuth.TO_SOUTHWEST) {
            this._state.toSouthwest(this.teamDA);
        }
    },
});
