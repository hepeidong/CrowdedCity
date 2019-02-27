//队员分布阵列
var TeamDistributionArr = {
    array: [
        [-1, 1],
        [-1, 0, 1],
        [-2, -1, 1, 2],
        [-2, -1, 1, 2],
        [-2, -1, 1, 2],
        [-2, -1, 1, 2],
        [-2, -1, 1, 2],
        [-2, -1, 1, 2],
        [-2, -1, 1, 2],
        [-1, 0, 1],
        [-1, 0, 1],
        [-1, 1]
    ],
    rowSpacing: 80,//行间距
    colSpacing: 100,//列间距
    teamPos: []
}

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        
    },

    ctor() {
        this.azimuth = {
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

        this.heros = [];
        this.newHero = cc.find('Canvas').getChildByName('Hero');
        this.heros.push(this.newHero.getComponent('Hero'));
        this.heros[this.heros.length - 1].setHeroState(this.heros[this.heros.length - 1].ToEastState);
        this.initTeamPos(this.newHero);
        
    },

    initTeamPos: function (node) {
        for (let i = 0; i < TeamDistributionArr.array.length; ++i) {
            for (let j = 0; j < TeamDistributionArr.array[i].length; ++j) {
                var y = TeamDistributionArr.array[i][j]*TeamDistributionArr.colSpacing + node.y;
                var x = node.x - TeamDistributionArr.rowSpacing * (i + 1);
                TeamDistributionArr.teamPos.push({x: x, y: y});
            }
        }
        // console.log(TeamDistributionArr.teamPos);
    },

    beUserious: function () {
        
        var newHero = cc.instantiate(this.newHero);
        // console.log(newHero);
        if (this.heros.length - 1 != TeamDistributionArr.teamPos.length) {
            newHero.x = TeamDistributionArr.teamPos[this.heros.length - 1].x;
            newHero.y = TeamDistributionArr.teamPos[this.heros.length - 1].y;
            newHero.parent = cc.find('Canvas');
            this.heros.push(newHero.getComponent('Hero'));
            this.heros[this.heros.length - 1].setHeroState(this.heros[this.heros.length - 1].ToEastState);
            this.heros[this.heros.length - 1].heroID++;
        }
    },


    toEast: function () {
        for (let i = 0; i < this.heros.length; ++i) {
            this.heros[i].toEast(TeamDistributionArr);
        }
    },

    toWest: function () {
        for (let i = 0; i < this.heros.length; ++i) {
            this.heros[i].toWest(TeamDistributionArr);
        }
    },

    toSouth: function () {
        for (let i = 0; i < this.heros.length; ++i) {
            this.heros[i].toSouth(TeamDistributionArr);
        }
    },

    toNorth: function () {
        for (let i = 0; i < this.heros.length; ++i) {
            this.heros[i].toNorth(TeamDistributionArr);
        }
    },

    toNortheast: function () {
        for (let i = 0; i < this.heros.length; ++i) {
            this.heros[i].toNortheast(TeamDistributionArr);
        }
    },

    toSoutheast: function () {
        for (let i = 0; i < this.heros.length; ++i) {
            this.heros[i].toSoutheast(TeamDistributionArr);
        }
    },

    toSouthwest: function () {
        for (let i = 0; i < this.heros.length; ++i) {
            this.heros[i].toSouthwest(TeamDistributionArr);
        }
    },

    toNorthwest: function () {
        for (let i = 0; i < this.heros.length; ++i) {
            this.heros[i].toNorthwest(TeamDistributionArr);
        }
    }

    // update (dt) {},
});
