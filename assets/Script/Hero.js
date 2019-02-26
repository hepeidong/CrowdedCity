var ToWestState = require('ToWestState');
var ToSouthState = require('ToSouthState');
var ToEastState = require('ToEastState');
var ToNorthState = require('ToNorthState');
var ToNortheastState = require('ToNortheastState');
var ToSoutheastState = require('ToSoutheastState');
var ToSouthwestState = require('ToSouthwestState');
var ToNorthwestState = require('ToNorthwestState');

cc.Class({
    extends: cc.Component,

    properties: {
        HP: 1
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    ctor() {
        this._state = null;

        this.ToEastState = new ToEastState();//东
        this.ToWestState = new ToWestState();//西
        this.ToNorthState = new ToNorthState();//北
        this.ToSouthState = new ToSouthState();//南
        this.ToNortheastState = new ToNortheastState();//东北
        this.ToSoutheastState = new ToSoutheastState;//东南
        this.ToSouthwestState = new ToSouthwestState;//西南
        this.ToNorthwestState = new ToNorthwestState(); //西北
        // this.BeUsuriousState = new BeUsuriousState();//吃人


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

    beUserious: function () {
        // this._state.beUserious();
    },

    toEast: function () {
        this._state.toEast(this.node);
    },

    toWest: function () {
        this._state.toWest(this.node);
    },

    toSouth: function () {
        this._state.toSouth(this.node);
    },

    toNorth: function () {
        this._state.toNorth(this.node);
    },

    toNortheast: function () {
        this._state.toNortheast(this.node);
    },

    toSoutheast: function () {
        this._state.toSoutheast(this.node);
    },

    toSouthwest: function () {
        this._state.toSouthwest(this.node);
    },

    toNorthwest: function () {
        this._state.toNorthwest(this.node);
    }

    // update (dt) {},
});
