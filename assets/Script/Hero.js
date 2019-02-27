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
        HP: 1,
        heroID: 0
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

    toEast: function (teamDA) {
        this._state.toEast(teamDA);
    },

    toWest: function (teamDA) {
        this._state.toWest(teamDA);
    },

    toSouth: function (teamDA) {
        this._state.toSouth(teamDA);
    },

    toNorth: function (teamDA) {
        this._state.toNorth(teamDA);
    },

    toNortheast: function (teamDA) {
        this._state.toNortheast(teamDA);
    },

    toSoutheast: function (teamDA) {
        this._state.toSoutheast(teamDA);
    },

    toSouthwest: function (teamDA) {
        this._state.toSouthwest(teamDA);
    },

    toNorthwest: function (teamDA) {
        this._state.toNorthwest(teamDA);
    }

    // update (dt) {},
});
