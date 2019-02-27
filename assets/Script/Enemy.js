

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        // var MobileAzimuth = require('MobileAzimuth');
        // this.mobileAzimuth = new MobileAzimuth();
    },

    onCollisionEnter: function (other, self) {
        this.node.parent.removeChild(this.node);
        cc.MobileAzimuth.beUserious();
    },

    onCollisionStay: function (other, self) {

    },

    onCollisionExit: function (other, self) {

    }

    // update (dt) {},
});
