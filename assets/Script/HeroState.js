

var HeroState = cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    ctor() {
        this._hero = null;
    },

    start () {
    
    },

    setHero: function (hero) {
        this._hero = hero;
    },

    // toEast: function () {
    // },

    // toWest: function () {
    // },

    // toSouth: function () {
    // },

    // toNorth: function () {
    // },

    // toNortheast: function () {
    // },

    // toSoutheast: function () {
    // },

    // toSouthwest: function () {
    // },

    // toNorthwest: function () {
    // },

    update (dt) {
        
    },
});