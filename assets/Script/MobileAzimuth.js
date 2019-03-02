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
        // TeamDistributionArr.teamPos = null;
        // TeamDistributionArr.teamPos = [];
        // for (let i = 0; i < TeamDistributionArr.array.length; ++i) {
        //     for (let j = 0; j < TeamDistributionArr.array[i].length; ++j) {
        //         var y = TeamDistributionArr.array[i][j]*(this.heroWidth + TeamDistributionArr.colSpacing) + this.newHero.y;
        //         var x = this.newHero.x - this.heroHeight * (i+1) - TeamDistributionArr.rowSpacing * (i+1);
        //         TeamDistributionArr.teamPos.push({x: x, y: y});
        //     }
        // }
        this.hero.toEast(TeamDistributionArr);
    },

    toWest: function () {
        // TeamDistributionArr.teamPos = null;
        // TeamDistributionArr.teamPos = [];
        // for (let i = 0; i < TeamDistributionArr.array.length; ++i) {
        //     for (let j = 0; j < TeamDistributionArr.array[i].length; ++j) {
        //         var y = -TeamDistributionArr.array[i][j]*(this.heroHeight + TeamDistributionArr.colSpacing) + this.newHero.y;
        //         var x = this.newHero.x + this.heroWidth * (i+1) + TeamDistributionArr.rowSpacing * (i+1);
        //         TeamDistributionArr.teamPos.push({x: x, y: y});
        //     }
        // }
        this.hero.toWest(TeamDistributionArr);
    },

    toSouth: function () {
        // TeamDistributionArr.teamPos = null;
        // TeamDistributionArr.teamPos = [];
        // for (let i = 0; i < TeamDistributionArr.array.length; ++i) {
        //     for (let j = 0; j < TeamDistributionArr.array[i].length; ++j) {
        //         var x = -TeamDistributionArr.array[i][j]*(this.heroWidth + TeamDistributionArr.colSpacing) + this.newHero.x;
        //         var y = this.newHero.y + this.heroHeight * (i+1) + TeamDistributionArr.rowSpacing * (i+1);
        //         TeamDistributionArr.teamPos.push({x: x, y: y});
        //     }
        // }
        this.hero.toSouth(TeamDistributionArr);
    },

    toNorth: function () {
        // TeamDistributionArr.teamPos = null;
        // TeamDistributionArr.teamPos = [];
        // for (let i = 0; i < TeamDistributionArr.array.length; ++i) {
        //     for (let j = 0; j < TeamDistributionArr.array[i].length; ++j) {
        //         var x = TeamDistributionArr.array[i][j]*(this.heroWidth + TeamDistributionArr.colSpacing) + this.newHero.x;
        //         var y = this.newHero.y - this.heroHeight * (i+1) - TeamDistributionArr.rowSpacing * (i+1);
        //         TeamDistributionArr.teamPos.push({x: x, y: y});
        //     }
        // }
        this.hero.toNorth(TeamDistributionArr);
    },

    /**
     * 计算坐标用到三角函数，根据规定的队友分布阵列，算出L，L是队友相对于直角坐标系，与队长斜向距离，例如=》
     * 东南方向的坐标分布
     *          |  #（队友）
     *    ------|----------> （x轴）       
     *         #（队长）
     * L1是队友相对于队长往后退的距离，因为队友不能和队长并列行走，例如=》
     * 东南方向的坐标分布
     *             #（队友）
     *   ---------------------->（x轴）      
     *               #（队长）
     *         #（队友）
     * 在上述图像中，队友都在同一条斜线上，并且都往后退了一步
     * L是根据分布阵列和队友的（精灵）宽度加上列间距计算
     * L1是根据队友排在第几行和队友的（精灵）高度加上行间距计算
     */
    toNortheast: function () {
        // TeamDistributionArr.teamPos = null;
        // TeamDistributionArr.teamPos = [];
        // for (let i = 0; i < TeamDistributionArr.array.length; ++i) {
        //     for (let j = 0; j < TeamDistributionArr.array[i].length; ++j) {
        //         var L = TeamDistributionArr.array[i][j]*(this.heroWidth + TeamDistributionArr.colSpacing);
        //         var L1 = this.heroHeight * (i+1) + TeamDistributionArr.rowSpacing * (i+1);
        //         var x = this.newHero.x - L*Math.cos(cc.Utl.radian(45)) - L1*Math.cos(cc.Utl.radian(45));
        //         var y = this.newHero.y + L*Math.sin(cc.Utl.radian(45)) - L1*Math.sin(cc.Utl.radian(45));
        //         TeamDistributionArr.teamPos.push({x: x, y: y});
        //     }
        // }
        this.hero.toNortheast(TeamDistributionArr);
    },

    toSoutheast: function () {
        // TeamDistributionArr.teamPos = null;
        // TeamDistributionArr.teamPos = [];
        // for (let i = 0; i < TeamDistributionArr.array.length; ++i) {
        //     for (let j = 0; j < TeamDistributionArr.array[i].length; ++j) {
        //         var L = TeamDistributionArr.array[i][j]*(this.heroWidth + TeamDistributionArr.colSpacing);
        //         var L1 = this.heroHeight * (i+1) + TeamDistributionArr.rowSpacing * (i+1);
        //         var x = this.newHero.x - L*Math.cos(cc.Utl.radian(45)) - L1*Math.cos(cc.Utl.radian(45));
        //         var y = this.newHero.y + L*Math.sin(cc.Utl.radian(45)) + L1*Math.sin(cc.Utl.radian(45));
        //         TeamDistributionArr.teamPos.push({x: x, y: y});
        //     }
        // }
        this.hero.toSoutheast(TeamDistributionArr);
    },

    toSouthwest: function () {
        // TeamDistributionArr.teamPos = null;
        // TeamDistributionArr.teamPos = [];
        // for (let i = 0; i < TeamDistributionArr.array.length; ++i) {
        //     for (let j = 0; j < TeamDistributionArr.array[i].length; ++j) {
        //         var L = TeamDistributionArr.array[i][j]*(this.heroWidth + TeamDistributionArr.colSpacing);
        //         var L1 = this.heroHeight * i + TeamDistributionArr.rowSpacing
        //         var x = this.newHero.x - L*Math.cos(cc.Utl.radian(45)) + L1*Math.cos(cc.Utl.radian(45));
        //         var y = this.newHero.y + L*Math.sin(cc.Utl.radian(45)) + L1*Math.sin(cc.Utl.radian(45));
        //         TeamDistributionArr.teamPos.push({x: x, y: y});
        //     }
        // }
        this.hero.toSouthwest(TeamDistributionArr);
    },

    toNorthwest: function () {
        // TeamDistributionArr.teamPos = null;
        // TeamDistributionArr.teamPos = [];
        // for (let i = 0; i < TeamDistributionArr.array.length; ++i) {
        //     for (let j = 0; j < TeamDistributionArr.array[i].length; ++j) {
        //         var L = TeamDistributionArr.array[i][j]*(this.heroWidth + TeamDistributionArr.colSpacing);
        //         var L1 = this.heroHeight * i + TeamDistributionArr.rowSpacing
        //         var x = this.newHero.x + L*Math.cos(cc.Utl.radian(45)) + L1*Math.cos(cc.Utl.radian(45));
        //         var y = this.newHero.y + L*Math.sin(cc.Utl.radian(45)) - L1*Math.sin(cc.Utl.radian(45));
        //         TeamDistributionArr.teamPos.push({x: x, y: y});
        //     }
        // }
        this.hero.toNorthwest(TeamDistributionArr);
    },

    stand: function () {
        this.hero.stand();
    }

    // update (dt) {},
});
