var GameControl = require('GameControl');

cc.Class({
    extends: cc.Component,

    properties: {
        enemy: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if (GameControl.runGameControl()) {
            cc.Utl.WriteLog('游戏框架启动成功');
            cc.game.setFrameRate(30);
            cc.director.getCollisionManager().enabled = true;
            cc.Utl.WriteLog(cc.GamePlatform.GetScreenScaleX());
            cc.Utl.WriteLog(cc.GamePlatform.GetScreenScaleY());
            // cc.director.getCollisionManager().enabledDebugDraw  = true;
            // cc.GamePlatform.ScreenFitWidth();
            // var canvas = cc.find('Canvas');
            // for (let key in canvas.children) {
            //     canvas.children[key].scaleX = cc.GamePlatform.GetScreenScaleX();
            //     canvas.children[key].scaleY = cc.GamePlatform.GetScreenScaleY();
            // }

            // var StateMachine = require('StateMachine');
            // var fsm = new StateMachine();
            // fsm.setupState({
            //     states: ['A', 'B'],
            //     events: [
            //         {name: 'StateA', from: ['B', 'C'], to: 'A'},
            //         {name: 'StateB', form: ['A', 'C'], to: 'B'},
            //         {name: 'StateC', form: ['A', 'B'], to: 'B'}
            //     ],
            //     callbacks: {
            //         onA: function() { console.log('测试 A'); },
            //         onB: function() { console.log('测试 B'); },
            //         onC: function() { console.log('测试 C'); }
            //     }
            // });
            // var s = fsm.doEvent('StateA');
            // console.log(s);
            // s.onA();
            // s.onB();
            // s.onC();
            // console.log(fsm);

            for (let i = 0; i < 20; ++i) {
                var x = Math.random()*500;
                var y = Math.random()*300;
                var newNode = cc.instantiate(this.enemy);
                newNode.x = x;
                newNode.y = y;
                newNode.parent = this.node;
            }
            
        }
    },

    start () {

    },

    onButton: function (event) {
        // console.log('Room onButton');
        cc.GameData.Set(cc.Gl.Key_EditMode, !cc.GameData.Get(cc.Gl.Key_EditMode));
        this.DecorateList.active = !this.DecorateList.active;
    }

    // update (dt) {},
});
