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

    toSoutheast: function (heroNode) {
        console.error('向东南走');
        var v = Math.sqrt(Math.pow(this._speed, 2) / 2)
        heroNode.x += v;
        heroNode.y -= v;
    },

    toNorthwest: function (heroNode) {
        this._hero.setHeroState(this._hero.ToNorthwestState);
        this._hero.getHeroState().toNorthwest(heroNode);
    },

    toNortheast: function (heroNode) {
        this._hero.setHeroState(this._hero.ToNortheastState);
        this._hero.getHeroState().toNortheast(heroNode);
    },

    toSouth: function (heroNode) {
        this._hero.setHeroState(this._hero.ToSouthState);
        this._hero.getHeroState().toSouth(heroNode);
    },

    toSouthwest: function (heroNode) {
        this._hero.setHeroState(this._hero.ToSouthwestState);
        this._hero.getHeroState().toSouthwest(heroNode);
    },

    toNorth: function (heroNode) {
        this._hero.setHeroState(this._hero.ToNorthState);
        this._hero.getHeroState().toNorth(heroNode);
    },

    toEast: function (heroNode) {
        this._hero.setHeroState(this._hero.ToEastState);
        this._hero.getHeroState().toEast(heroNode);
    },

    toWest: function (heroNode) {
        this._hero.setHeroState(this._hero.ToWestState);
        this._hero.getHeroState().toWest(heroNode);
    }

    // update (dt) {},
});
