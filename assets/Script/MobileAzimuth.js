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
        teamComp.id = this.teamCount;
        teamComp.setSpeed(this.hero.speed);
        TeamDistributionArr.teammate.push(teamComp);
    },

    beUserious: function () {
        var x = TeamDistributionArr.teamPos[this.teamCount].x;
        var y = TeamDistributionArr.teamPos[this.teamCount].y;
        this.createTeam(x, y);
        this.teamCount++;  
    },


    toEast: function () {
        this.hero.toEast(TeamDistributionArr);
    },

    toWest: function () {
        this.hero.toWest(TeamDistributionArr);
    },

    toSouth: function () {
        this.hero.toSouth(TeamDistributionArr);
    },

    toNorth: function () {
        this.hero.toNorth(TeamDistributionArr);
    },

    toNortheast: function () {
        this.hero.toNortheast(TeamDistributionArr);
    },

    toSoutheast: function () {
        this.hero.toSoutheast(TeamDistributionArr);
    },

    toSouthwest: function () {
        this.hero.toSouthwest(TeamDistributionArr);
    },

    toNorthwest: function () {
        this.hero.toNorthwest(TeamDistributionArr);
    },

    stand: function () {
        this.hero.stand();
    }

    // update (dt) {},
});
