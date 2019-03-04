
cc.Class({
    extends: cc.Component,

    properties: {
        id: 0,
        moveDirRot: 0,
        moveDirVec: cc.Vec2,
        isPlay: false
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
        // this.node.rotation = 90 - this.moveDirRot;
        // this.node.scaleX = (90 - this.moveDirRot) / 90;
        // this.arcL = 
        // this.speed = this.speed * (1 + (180 - Math.abs(this.moveDirRot)) / 180);
        
        this.node.x += this.moveDirVec.x * this.speed;
        this.node.y += this.moveDirVec.y * this.speed;
        // if (this.id == 3) {
        //     console.log(this.moveDirRot);
        // }
    },

    play: function () {
        if (!this.isPlay) {
            this.isPlay = true;
            cc.AnimationMgr.play(this.node, 'Hero');
        }
    },

    stop: function () {
        this.isPlay = true;
        cc.AnimationMgr.stop(this.node, 'Hero');
    },

    update (dt) {
        // this.node.x = this.moveDirVec.x * this.speed;
        // this.node.y = this.moveDirVec.y * this.speed;
    }
});
