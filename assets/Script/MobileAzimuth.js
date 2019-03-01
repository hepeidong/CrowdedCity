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
    teamPos: [],
    teammate: []
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
        this.newHero = cc.find('Canvas').getChildByName('Hero');
        this.heroWidth = this.newHero.getContentSize().width;
        this.heroHeight = this.newHero.getContentSize().height;
        this.hero = this.newHero.getComponent('Hero');
        this.hero.setHeroState(this.hero.ToEastState);
        this.teamCount = 0;
        this.initTeamPool();
    },

    initTeamPool: function () {
        if (!this.teamPool) {
            this.teamPool = new cc.NodePool();
        }
        if (this.teamPool.size() <= 0) {
            var len = TeamDistributionArr.array.length*TeamDistributionArr.array[0].length;
            for (let i = 0; i < len; ++i) {
                let team = cc.instantiate(this.hero.teammate);
                this.teamPool.put(team);
            }
        }
    },

    createTeam: function (x, y) {
        var team = null;
        if (this.teamPool.size() > 0) {
            team = this.teamPool.get();
        }
        else {
            team = cc.instantiate(this.hero.teammate);
            this.teamPool.put(team);
        }
        team.parent = cc.find('Canvas');
        team.x = x;
        team.y = y;
        var teamComp = team.getComponent('Teammate');
        teamComp.setSpeed(this.hero.speed);
        TeamDistributionArr.teammate.push(teamComp);
    },

    beUserious: function () {
        var x = TeamDistributionArr.teamPos[this.teamCount].x;
        var y = TeamDistributionArr.teamPos[this.teamCount].y;
        this.teamCount++;  
        this.createTeam(x, y);
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
        this.hero.toEast(TeamDistributionArr);
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
        this.hero.toWest(TeamDistributionArr);
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
        this.hero.toSouth(TeamDistributionArr);
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
        this.hero.toNorth(TeamDistributionArr);
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
        this.hero.toNortheast(TeamDistributionArr);
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
        this.hero.toSoutheast(TeamDistributionArr);
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
        this.hero.toSouthwest(TeamDistributionArr);
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
        this.hero.toNorthwest(TeamDistributionArr);
    },

    stand: function () {
        this.hero.stand();
    }

    // update (dt) {},
});
