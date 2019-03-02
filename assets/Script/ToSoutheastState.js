var HeroState = require('HeroState');

cc.Class({
    extends: HeroState,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    toSoutheast: function (teamDisArr) {
        this._hero.node.rotation = 90 - this._hero.moveDirRot;
        this._hero.node.x += this._hero.moveDirVec.x * this._hero.speed;
        this._hero.node.y += this._hero.moveDirVec.y * this._hero.speed;
        for (let i = 0; i < teamDisArr.teamPos.length; ++i) {
            teamDisArr.teamPos[i].x += this._hero.moveDirVec.x * this._hero.speed;
            teamDisArr.teamPos[i].y += this._hero.moveDirVec.y * this._hero.speed;
        }
        for (let i = 0; i < teamDisArr.teammate.length; ++i) {
            // teamDisArr.teammate[i].rotAndVec(this._hero.node.x, this._hero.node.y);
            teamDisArr.teammate[i].rotAndVec(teamDisArr.teamPos[i].x, teamDisArr.teamPos[i].y);
        }
    },

    toNorthwest: function (teamDisArr) {
        this._hero.setHeroState(this._hero.ToNorthwestState);
        this._hero.getHeroState().toNorthwest(teamDisArr);
    },

    toNortheast: function (teamDisArr) {
        this._hero.setHeroState(this._hero.ToNortheastState);
        this._hero.getHeroState().toNortheast(teamDisArr);
    },

    toSouth: function (teamDisArr) {
        this._hero.setHeroState(this._hero.ToSouthState);
        this._hero.getHeroState().toSouth(teamDisArr);
    },

    toSouthwest: function (teamDisArr) {
        this._hero.setHeroState(this._hero.ToSouthwestState);
        this._hero.getHeroState().toSouthwest(teamDisArr);
    },

    toNorth: function (teamDisArr) {
        this._hero.setHeroState(this._hero.ToNorthState);
        this._hero.getHeroState().toNorth(teamDisArr);
    },

    toEast: function (teamDisArr) {
        this._hero.setHeroState(this._hero.ToEastState);
        this._hero.getHeroState().toEast(teamDisArr);
    },

    toWest: function (teamDisArr) {
        this._hero.setHeroState(this._hero.ToWestState);
        this._hero.getHeroState().toWest(teamDisArr);
    }

    // update (dt) {},
});
