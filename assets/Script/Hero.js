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
        speed: 5,
        isPlay: false
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

    play: function () {
        if (!this.isPlay) {
            this.isPlay = true;
            cc.AnimationMgr.play(this.node, 'Hero');
        }
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

    /**
     * 计算坐标用到三角函数，根据规定的队友分布阵列，算出L，L是队友相对于直角坐标系，与队长斜向距离，例如=》
     * 东南方向的坐标分布
     *          |  #（队友）
     *    ------|----------> （x轴）       
     *         #（队长）
     * L1是队友相对于队长往后退的距离，因为队友不能和队长并列行走，例如=》
     * 东南方向的坐标分布
     *             #（队友）
     *   ---------------------->（x轴）      
     *               #（队长）
     *         #（队友）
     * 在上述图像中，队友都在同一条斜线上，并且都往后退了一步
     * L是根据分布阵列和队友的（精灵）宽度加上列间距计算
     * L1是根据队友排在第几行和队友的（精灵）高度加上行间距计算
     */
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
        this.play();
    },

    toWest: function (teamDA) {
        // this._state.toWest(teamDA);
        this.azimuth = azimuth.TO_WEST;
        // this.teamDA = teamDA;
        var aimVec = cc.p(this.node.x - this.speed, this.node.y);
        this.rotAndVec(aimVec);
        this.calculateCoordAtLevel(teamDA, cc.pToAngle(this.moveDirVec));
        this.play();
    },

    toSouth: function (teamDA) {
        // this._state.toSouth(teamDA);
        this.azimuth = azimuth.TO_SOUTH;
        // this.teamDA = teamDA;
        var aimVec = cc.p(this.node.x, this.node.y - this.speed);
        var selfVec = cc.p(this.node.x, this.node.y);
        this.rotAndVec(aimVec, selfVec);
        this.calculateCoordAtVertical(teamDA, cc.pToAngle(this.moveDirVec));
        this.play();
    },

    toNorth: function (teamDA) {
        // this._state.toNorth(teamDA);
        this.azimuth = azimuth.TO_NORTH;
        // this.teamDA = teamDA;
        var aimVec = cc.p(this.node.x, this.node.y + this.speed);
        this.rotAndVec(aimVec);
        this.calculateCoordAtVertical(teamDA, cc.pToAngle(this.moveDirVec));
        this.play();
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
        this.play();
    },

    toSoutheast: function (teamDA) {
        // this._state.toSoutheast(teamDA);
        this.azimuth = azimuth.TO_SOUTHEAST;
        // this.teamDA = teamDA;
        var v = Math.sqrt(Math.pow(this.speed, 2) / 2)
        var aimVec = cc.p(this.node.x + v, this.node.y - v);
        this.rotAndVec(aimVec);
        //计算斜率为负的斜方向上的坐标
        this.calculateCoordAtOblique2(teamDA, cc.pToAngle(this.moveDirVec));
        this.play();
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
        this.play();
    },

    toNorthwest: function (teamDA) {
        // this._state.toNorthwest(teamDA);
        this.azimuth = azimuth.TO_NORTHWEST;
        // this.teamDA = teamDA;
        var v = Math.sqrt(Math.pow(this.speed, 2) / 2)
        var aimVec = cc.p(this.node.x - v, this.node.y + v);
        this.rotAndVec(aimVec);
        //计算斜率为负的斜方向上的坐标
        this.calculateCoordAtOblique2(teamDA, cc.pToAngle(this.moveDirVec));
        this.play();
    },

    stand: function () {
        this.azimuth = azimuth.ERROR;
        this.isPlay = false;
        cc.AnimationMgr.stop(this.node, 'Hero');
        for (let i = 0; i < this.teamDA.teammate.length; ++i) {
            this.teamDA.teammate[i].stop();
        }
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
