

cc.Class({
    extends: cc.Component,

    properties: {
        hero: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log('follow');
        var action = cc.follow(this.hero, cc.rect(-960 / 2, -320, 2000, 1000));
        this.node.runAction(action);
    },

    start () {

    },

    // update (dt) {},
});
