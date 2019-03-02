
cc.Class({
    extends: cc.Component,

    properties: {
        moveDirRot: 0,
        moveDirVec: cc.Vec2
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    setSpeed: function (s) {
        this.speed = s;
    },

    rotAndVec: function (x, y) {
        var aimVec = cc.p(x, y);
        var selfVec = cc.p(this.node.x, this.node.y);
        this.moveDirVec = cc.pNormalize(cc.pSub(aimVec, selfVec));
        this.moveDirRot = cc.Utl.angle(cc.pToAngle(this.moveDirVec));
        this.node.x += this.moveDirVec.x * this.speed;
        this.node.y += this.moveDirVec.y * this.speed;
        this.node.rotation = 90 - this.moveDirRot;
    },



    update (dt) {
        // this.node.x = this.moveDirVec.x * this.speed;
        // this.node.y = this.moveDirVec.y * this.speed;
    }
});
