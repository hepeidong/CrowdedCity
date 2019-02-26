

var HeroState = cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    ctor() {
        this._speed = 5;
    },

    start () {
    
    },

    setHero: function (hero) {
        this._hero = hero;
    },

    toEast: function (heroNode) {
    },

    toWest: function (heroNode) {
    },

    toSouth: function (heroNode) {
    },

    toNorth: function (heroNode) {
    },

    toNortheast: function (heroNode) {
    },

    toSoutheast: function (heroNode) {
    },

    toSouthwest: function (heroNode) {
    },

    toNorthwest: function (heroNode) {
    },

    // update (dt) {},
});