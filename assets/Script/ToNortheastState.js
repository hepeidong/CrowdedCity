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

    toNortheast: function (teamDisArr) {
        var v = Math.sqrt(Math.pow(this._speed, 2) / 2)
        this._hero.node.x += v;
        this._hero.node.y += v;
        for (let i = 0; i < teamDisArr.teamPos.length; ++i) {
            teamDisArr.teamPos[i].x += v;
            teamDisArr.teamPos[i].y += v;
        }
    },

    toSouth: function (teamDisArr) {
        this._hero.setHeroState(this._hero.ToSouthState);
        this._hero.getHeroState().toSouth(teamDisArr);
    },

    toSoutheast: function (teamDisArr) {
        this._hero.setHeroState(this._hero.ToSoutheastState);
        this._hero.getHeroState().toSoutheast(teamDisArr);
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
    },

    toNorthwest: function (teamDisArr) {
        this._hero.setHeroState(this._hero.ToNorthwestState);
        this._hero.getHeroState().toNorthwest(teamDisArr);
    }

    // update (dt) {},
});
