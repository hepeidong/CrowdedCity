/**************
 * created:		2018/11/2
 * author:      
 * purpose:		动画管理器
 */ 

//炸弹动画位置坐标
var BEZIER_COORD = {
    //起点  切点   终点
    0: [cc.v2(-550, 54), cc.v2(-200, 230), cc.v2(5, 59)],//down
    1: [cc.v2(-550, 173), cc.v2(-200, 430), cc.v2(5, 59)],//left
    2: [cc.v2(578, 173), cc.v2(300, 400), cc.v2(5, 59)]//right
}

//连对，顺子动画位置坐标
var SINGLE_LINE_AND_DOUBLE_LINE_COORD = {
    0: cc.v2(52, -76),
    1: cc.v2(-249, 139),
    2: cc.v2(310, 139)
}

var AnimationManager = (function () {
    function constructor() {
        return {
            //动画的方位
            Anima_Pos: {
                DOWN: 0,
                LEFT: 1,
                RIGHT: 2
            },

            //播放动画
            play: function (node, animaName) {
                if (animaName) return node.getComponent(cc.Animation).play(animaName);
                else return node.getComponent(cc.Animation).play();
            },
            //停止播放动画
            stop: function (node, animaName) {
                if (animaName) return node.getComponent(cc.Animation).stop(animaName);
                else return node.getComponent(cc.Animation).stop();
            },
            //播放炸弹动画
            playBombAnima: function (node, pos) {
                node.position = BEZIER_COORD[pos][0];
                let bezierTo = cc.bezierTo(0.5, BEZIER_COORD[pos]);

                let self = this;
                let bombAction = cc.spawn(bezierTo, cc.sequence(cc.delayTime(0.4), cc.callFunc(() => {
                    node.stopAction(bezierTo);
                    self.play(node);
                })));

                this.onStop(node, () => {
                    node.active = false;
                    let animState = node.getComponent(cc.Animation).getAnimationState('bomb');
                    animState.time = 0;
                    animState.sample();
                });

                node.runAction(bombAction);
            },
            //播放连牌动画（顺子，连对）
            playLineAnima: function (node, pos) {
                node.position = SINGLE_LINE_AND_DOUBLE_LINE_COORD[pos];
                this.play(node);
                this.onStop(node, () => {
                    node.active = false;
                });
            },
            //开始播放回调
            onPlay: function (node, callback) {
                node.getComponent(cc.Animation).on('play', callback, node.getComponent(cc.Animation));
            },
            //动画结束回调
            onStop: function (node, callback) {
                node.getComponent(cc.Animation).on('stop', callback, node.getComponent(cc.Animation));
            }
        }
    }
    return {
        Instance: null,
        getInstance: function () {
            if (AnimationManager.Instance == null)
            {
                AnimationManager.Instance = constructor();
            }
            return AnimationManager.Instance;
        }
    }
})();

module.exports = AnimationManager;
