

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    onCollisionEnter: function (other, self) {
        this.node.parent.removeChild(this.node);
        var hero = other.node.getComponent('Hero');
        
    },

    onCollisionStay: function (other, self) {

    },

    onCollisionExit: function (other, self) {

    }

    // update (dt) {},
});
