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
        HP: 1,
        heroID: 0,
        row: 0,
        col: 0,
        moveDirRot: 0,
        moveDirVec: cc.Vec2
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

    toEast: function (teamDA) {
        // this._state.toEast(teamDA);
        this.azimuth = azimuth.TO_EAST;
        this.teamDA = teamDA;
        this.moveDirVec = cc.pForAngle(cc.Utl.radian(0));
    },

    toWest: function (teamDA) {
        // this._state.toWest(teamDA);
        this.azimuth = azimuth.TO_WEST;
        this.teamDA = teamDA;
        this.moveDirVec = cc.pForAngle(cc.Utl.radian(180));
    },

    toSouth: function (teamDA) {
        // this._state.toSouth(teamDA);
        this.azimuth = azimuth.TO_SOUTH;
        this.teamDA = teamDA;
        this.moveDirVec = cc.pForAngle(cc.Utl.radian(90));
    },

    toNorth: function (teamDA) {
        // this._state.toNorth(teamDA);
        this.azimuth = azimuth.TO_NORTH;
        this.teamDA = teamDA;
        this.moveDirVec = cc.pForAngle(cc.Utl.radian(270));
        console.log(this.moveDirVec);
    },

    toNortheast: function (teamDA) {
        // this._state.toNortheast(teamDA);
        this.azimuth = azimuth.TO_NORTHEAST;
        this.teamDA = teamDA;
        this.moveDirVec = cc.pForAngle(cc.Utl.radian(315));
    },

    toSoutheast: function (teamDA) {
        // this._state.toSoutheast(teamDA);
        this.azimuth = azimuth.TO_SOUTHEAST;
        this.teamDA = teamDA;
        this.moveDirVec = cc.pForAngle(cc.Utl.radian(45));
    },

    toSouthwest: function (teamDA) {
        // this._state.toSouthwest(teamDA);
        this.azimuth = azimuth.TO_SOUTHWEST;
        this.teamDA = teamDA;
        this.moveDirVec = cc.pForAngle(cc.Utl.radian(135));
    },

    toNorthwest: function (teamDA) {
        // this._state.toNorthwest(teamDA);
        this.azimuth = azimuth.TO_NORTHWEST;
        this.teamDA = teamDA;
        this.moveDirVec = cc.pForAngle(cc.Utl.radian(225));
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
