//队员分布阵列
var TeamDistributionArr = {
    array: [
        [-1.5, -0.5, 0.5, 1.5],
        [-1.5, -0.5, 0.5, 1.5],
        [-1.5, -0.5, 0.5, 1.5],
        [-1.5, -0.5, 0.5, 1.5],
        [-1.5, -0.5, 0.5, 1.5],
        [-1.5, -0.5, 0.5, 1.5],
        [-1.5, -0.5, 0.5, 1.5],
        [-1.5, -0.5, 0.5, 1.5]
    ],
    rowSpacing: 30,//行间距
    colSpacing: 30,//列间距
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
        this.heros = [];
        this.newHero = cc.find('Canvas').getChildByName('Hero');
        this.heroWidth = this.newHero.getContentSize().width;
        this.heroHeight = this.newHero.getContentSize().height;
        this.heros.push(this.newHero.getComponent('Hero'));
        this.heros[this.heros.length - 1].setHeroState(this.heros[this.heros.length - 1].ToEastState);
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
        TeamDistributionArr.teamPos = null;
        TeamDistributionArr.teamPos = [];
        for (let i = 0; i < TeamDistributionArr.array.length; ++i) {
            for (let j = 0; j < TeamDistributionArr.array[i].length; ++j) {
                var y = -TeamDistributionArr.array[i][j]*(this.heroHeight + TeamDistributionArr.colSpacing) + this.newHero.y;
                var x = this.newHero.x - this.heroWidth / 2 * i - TeamDistributionArr.rowSpacing;
                TeamDistributionArr.teamPos.push({x: x, y: y});
            }
        }
        for (let i = 0; i < this.heros.length; ++i) {
            this.heros[i].toEast(TeamDistributionArr);
        }
    },

    toWest: function () {
        TeamDistributionArr.teamPos = null;
        TeamDistributionArr.teamPos = [];
        for (let i = 0; i < TeamDistributionArr.array.length; ++i) {
            for (let j = 0; j < TeamDistributionArr.array[i].length; ++j) {
                var y = -TeamDistributionArr.array[i][j]*(this.heroHeight + TeamDistributionArr.colSpacing) + this.newHero.y;
                var x = this.newHero.x + this.heroWidth / 2 * i + TeamDistributionArr.rowSpacing;
                TeamDistributionArr.teamPos.push({x: x, y: y});
            }
        }
        for (let i = 0; i < this.heros.length; ++i) {
            this.heros[i].toWest(TeamDistributionArr);
        }
    },

    toSouth: function () {
        TeamDistributionArr.teamPos = null;
        TeamDistributionArr.teamPos = [];
        for (let i = 0; i < TeamDistributionArr.array.length; ++i) {
            for (let j = 0; j < TeamDistributionArr.array[i].length; ++j) {
                var x = -TeamDistributionArr.array[i][j]*(this.heroWidth + TeamDistributionArr.colSpacing) + this.newHero.x;
                var y = this.newHero.y + this.heroHeight / 2 * i + TeamDistributionArr.rowSpacing;
                TeamDistributionArr.teamPos.push({x: x, y: y});
            }
        }
        for (let i = 0; i < this.heros.length; ++i) {
            this.heros[i].toSouth(TeamDistributionArr);
        }
    },

    toNorth: function () {
        TeamDistributionArr.teamPos = null;
        TeamDistributionArr.teamPos = [];
        for (let i = 0; i < TeamDistributionArr.array.length; ++i) {
            for (let j = 0; j < TeamDistributionArr.array[i].length; ++j) {
                var x = TeamDistributionArr.array[i][j]*(this.heroWidth + TeamDistributionArr.colSpacing) + this.newHero.x;
                var y = this.newHero.y - this.heroHeight / 2 * i - TeamDistributionArr.rowSpacing;
                TeamDistributionArr.teamPos.push({x: x, y: y});
            }
        }
        for (let i = 0; i < this.heros.length; ++i) {
            this.heros[i].toNorth(TeamDistributionArr);
        }
    },

    toNortheast: function () {
        TeamDistributionArr.teamPos = null;
        TeamDistributionArr.teamPos = [];
        for (let i = 0; i < TeamDistributionArr.array.length; ++i) {
            for (let j = 0; j < TeamDistributionArr.array[i].length; ++j) {
                var L = TeamDistributionArr.array[i][j]*(this.heroWidth + TeamDistributionArr.colSpacing);
                var L1 = this.heroHeight / 2 * i + TeamDistributionArr.rowSpacing
                var x = this.newHero.x + L*Math.cos(cc.Utl.radian(45)) - L1*Math.cos(cc.Utl.radian(45));
                var y = this.newHero.y + L*Math.sin(cc.Utl.radian(45)) - L1*Math.sin(cc.Utl.radian(45));
                TeamDistributionArr.teamPos.push({x: x, y: y});
            }
        }
        for (let i = 0; i < this.heros.length; ++i) {
            this.heros[i].toNortheast(TeamDistributionArr);
        }
    },

    toSoutheast: function () {
        TeamDistributionArr.teamPos = null;
        TeamDistributionArr.teamPos = [];
        for (let i = 0; i < TeamDistributionArr.array.length; ++i) {
            for (let j = 0; j < TeamDistributionArr.array[i].length; ++j) {
                var L = -TeamDistributionArr.array[i][j]*(this.heroWidth + TeamDistributionArr.colSpacing);
                var L1 = this.heroHeight / 2 * i + TeamDistributionArr.rowSpacing
                var x = this.newHero.x + L*Math.cos(cc.Utl.radian(45)) - L1*Math.cos(cc.Utl.radian(45));
                var y = this.newHero.y + L*Math.sin(cc.Utl.radian(45)) + L1*Math.sin(cc.Utl.radian(45));
                TeamDistributionArr.teamPos.push({x: x, y: y});
            }
        }
        for (let i = 0; i < this.heros.length; ++i) {
            this.heros[i].toSoutheast(TeamDistributionArr);
        }
    },

    toSouthwest: function () {
        TeamDistributionArr.teamPos = null;
        TeamDistributionArr.teamPos = [];
        for (let i = 0; i < TeamDistributionArr.array.length; ++i) {
            for (let j = 0; j < TeamDistributionArr.array[i].length; ++j) {
                var L = -TeamDistributionArr.array[i][j]*(this.heroWidth + TeamDistributionArr.colSpacing);
                var L1 = this.heroHeight / 2 * i + TeamDistributionArr.rowSpacing
                var x = this.newHero.x + L*Math.cos(cc.Utl.radian(45)) + L1*Math.cos(cc.Utl.radian(45));
                var y = this.newHero.y + L*Math.sin(cc.Utl.radian(45)) + L1*Math.sin(cc.Utl.radian(45));
                TeamDistributionArr.teamPos.push({x: x, y: y});
            }
        }
        for (let i = 0; i < this.heros.length; ++i) {
            this.heros[i].toSouthwest(TeamDistributionArr);
        }
    },

    toNorthwest: function () {
        TeamDistributionArr.teamPos = null;
        TeamDistributionArr.teamPos = [];
        for (let i = 0; i < TeamDistributionArr.array.length; ++i) {
            for (let j = 0; j < TeamDistributionArr.array[i].length; ++j) {
                var L = TeamDistributionArr.array[i][j]*(this.heroWidth + TeamDistributionArr.colSpacing);
                var L1 = this.heroHeight / 2 * i + TeamDistributionArr.rowSpacing
                var x = this.newHero.x + L*Math.cos(cc.Utl.radian(45)) + L1*Math.cos(cc.Utl.radian(45));
                var y = this.newHero.y - L*Math.sin(cc.Utl.radian(45)) - L1*Math.sin(cc.Utl.radian(45));
                TeamDistributionArr.teamPos.push({x: x, y: y});
            }
        }
        for (let i = 0; i < this.heros.length; ++i) {
            this.heros[i].toNorthwest(TeamDistributionArr);
        }
    },

    stand: function () {
        for (let i = 0; i < this.heros.length; ++i) {
            this.heros[i].stand();
        }
    }

    // update (dt) {},
});
