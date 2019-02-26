

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    ctor() {
        this.D = {
            NE: 0, //东北
            SE: 1, //东南
            SW: 2, //西南
            NW: 3  //西北
        }
    },

    Log: function (text) {
        var str = text.split('@');
        if (typeof str[0] == 'string') {
            if ((str[0][0] == '{' && str[0][str[0].length - 1] == '}') || (str[0][0] == '[' && str[0][str[0].length - 1] == ']'))
            {
                console.log(new Date());
                console.log(JSON.parse(str[0]));
            }
            else {
                console.log(new Date() + ': ' + str[0]);
            }
        }
        else {
            console.log(new Date() + ': ' + str[0]);
        }
        if (str.length == 2) {
            console.log(str[1]);
        }
    },
    getStackTrace: function () {
        var obj = {};
        if (Error.captureStackTrace)
            {
                Error.captureStackTrace(obj, this.getStackTrace);
            }
        return obj.stack;
    },
    
    WriteLog: function (data) {
        var log = this.Log;
        var stack = this.getStackTrace() || ""
        var matchResult = stack.match(/\(.*?\)/g) || []
        var line = matchResult[1] || ""
        for (var i in arguments) {
        }
        if (typeof arguments[i] == 'object') {
            arguments[i] = JSON.stringify(arguments[i])
        }
        arguments[i] += '@' + line.replace("(", "").replace(")", "")
        log.apply(console, arguments)
    },

    Err: function (text) {
        var str = text.split('@');
        if (typeof str[0] == 'string') {
            if ((str[0][0] == '{' && str[0][str[0].length - 1] == '}') || (str[0][0] == '[' && str[0][str[0].length - 1] == ']'))
            {
                console.error(new Date());
                console.error(JSON.parse(str[0]));
            }
            else {
                console.error(new Date() + ': ' + str[0]);
            }
        }
        else {
            console.error(new Date() + ': ' + str[0]);
        }
        if (str.length == 2) console.log(str[1]);
    },
    
    WriteError: function (text) {
        var err = this.Err;
        var stack = this.getStackTrace() || ""
        var matchResult = stack.match(/\(.*?\)/g) || []
        var line = matchResult[1] || ""
        for (var i in arguments) {
        }
        if (typeof arguments[i] == 'object') {
            arguments[i] = JSON.stringify(arguments[i])
        }
        arguments[i] += '@' + line.replace("(", "").replace(")", "")
        err.apply(console, arguments)
    },

    Warn: function (text) {
        var str = text.split('@');
        if (typeof str[0] == 'string') {
            if ((str[0][0] == '{' && str[0][str[0].length - 1] == '}') || (str[0][0] == '[' && str[0][str[0].length - 1] == ']'))
            {
                console.warn(new Date());
                console.warn(JSON.parse(str[0]));
            }
            else {
                console.warn(new Date() + ': ' + str[0]);
            }
        }
        else {
            console.warn(new Date() + ': ' + str[0]);
        }
        if (str.length == 2) console.log(str[1]);
    },
    
    WriteWarn: function (text) {
        var warn = this.Warn;
        var stack = this.getStackTrace() || ""
        var matchResult = stack.match(/\(.*?\)/g) || []
        var line = matchResult[1] || ""
        for (var i in arguments) {
        }
        if (typeof arguments[i] == 'object') {
            arguments[i] = JSON.stringify(arguments[i])
        }
        arguments[i] += '@' + line.replace("(", "").replace(")", "")
        warn.apply(console, arguments)
    },

    //类的继承
    createExtend: function (child, parent) {
        if (!(child instanceof Object)) {
            child = function(){};
        }
        function Super() { };
        Super.prototype = parent.prototype;
        child.prototype = new Super();
        child.prototype.constructor = child;
    },

    addEventHandler: function (target, component, handler, data) {
        var eventHandler = new cc.Component.EventHandler();
        eventHandler.target = target;
        eventHandler.component = component;
        eventHandler.handler = handler;
        eventHandler.customEventData = data;
        eventHandler.emit([handler]);
    },

    addClickEvent: function (node, target, component, handler) {
        let eventHandler = new cc.Component.EventHandler();
        eventHandler.target = target;
        eventHandler.component = component;
        eventHandler.handler = handler;

        let clickEvents = node.getComponent(cc.Button).clickEvents;
        clickEvents.push(eventHandler);
    },

    addToggleEvent: function (node, target, component, handler) {
        let eventHandler = new cc.Component.EventHandler();
        eventHandler.target = target;
        eventHandler.component = component;
        eventHandler.handler = handler;

        let toggleEvents = node.getComponent(cc.Toggle).clickEvents;
        toggleEvents.push(eventHandler);
    },

    addSlideEvent: function (node, target, component, handler) {
        let eventHandler = new cc.Component.EventHandler();
        eventHandler.target = target;
        eventHandler.component = component;
        eventHandler.handler = handler;

        let slideEvents = node.getComponent(cc.Slider).slideEvents;
        slideEvents.push(eventHandler);
    },

    addScrollEvent: function (node, target, component, handler) {
        let eventHandler = new cc.Component.EventHandler();
        eventHandler.target = target;
        eventHandler.component = component;
        eventHandler.handler = handler;

        let scrollViewEvents = node.getComponent(cc.ScrollView).ScrollEvents;
        scrollViewEvents.push(eventHandler);
    },

    addEscEvent: function (node) {
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
            },
            onKeyReleased: function (keyCode, event) {
                if (keyCode == cc.KEY.back) {
                    cc.vv.alert.show('提示', '确定要退出游戏吗？', function () {
                        cc.game.end();
                    }, true);
                }
            }
        }, node);
    },

    addEditReturnEvent: function (node, target, component, handler) {
        let editboxEventHandler = new cc.Component.EventHandler();
        editboxEventHandler.target = target; //这个 node 节点是你的事件处理代码组件所属的节点
        editboxEventHandler.component = component;
        editboxEventHandler.handler = handler;

        editbox.editingDidBegan.push(editboxEventHandler);
    },

    openView: function (panelName, cb) {
        // var child = cc.director.getScene().getChildByName('Canvas').getChildByName(panelName);
        // if (child != null) {
        //     child.active = true;
        //     cb && cb(child);

        //     return;
        // }
        
        // var loadPath = "Entity/" + panelName;
        // var onResLoaded = function (err, res) {

        //     if (err) {
        //         console.error(err);
        //         return;
        //     }
        //     var panelNode = cc.instantiate(res);
        //     panelNode.name = res.name;
        //     if (!cc.director.getScene().getChildByName('Canvas').getChildByName(res.name)) {
        //         cc.director.getScene().getChildByName('Canvas').addChild(panelNode);
        //     }
        //     cb && cb(panelNode);
        // }
        // cc.loader.loadRes(loadPath, onResLoaded);
        this.loadPrefab(panelName, cb, cc.director.getScene().getChildByName('Canvas'));
    },

    closeView: function (panelName) {
        var child = cc.director.getScene().getChildByName('Canvas').getChildByName(panelName);
        if (child != null) {
            child.destroy();
            return;
        }
    },

    loadPrefab: function (prefabName, cb, parent) {
        var child = null;
        if (parent) child = parent.getChildByName(prefabName);
        if (child != null) {
            child.active = true;
            cb && cb(child);
            return;
        }

        var loadPath = "Entity/" + prefabName;
        var onResLoaded = function (err, res) {

            if (err) {
                console.error(err);
                return;
            }
            var newNode = cc.instantiate(res);
            newNode.name = res.name;
            if (parent) {
                parent.addChild(newNode);
            }
            cb && cb(newNode);
        }
        cc.loader.loadRes(loadPath, onResLoaded);
    },

    popu: function (viewNode, cb) {
        viewNode.scaleX = 0;
        viewNode.scaleY = 0;
        let scaleTo1 = cc.scaleTo(0.2, 1.2, 1.2);
        let scaleTo2 = cc.scaleTo(0.2, 1, 1);
        if (cb) {
            let seq = cc.sequence(scaleTo1, scaleTo2, cc.callFunc(cb, this));
            viewNode.runAction(seq);
        }
        else {
            let seq = cc.sequence(scaleTo1, scaleTo2);
            viewNode.runAction(seq);
        }
    },

    wxGetSetting() {
        let that = this;
        if (!cc.GamePlatform.IsWechatGame()) return;
        wx.getSetting({
            success: function (res) {
                var authSetting = res.authSetting
                console.log(authSetting);
                if (authSetting['scope.userInfo'] === true) {
                    // 用户已授权，可以直接调用相关 API
                    that.wxUserInfo(true);
                } else if (authSetting['scope.userInfo'] === false) {
                    // 用户已拒绝授权，再调用相关 API 或者 wx.authorize 会失败，需要引导用户到设置页面打开授权开关
                    that.userInfoButton();
                } else {
                    // 未询问过用户授权，调用相关 API 或者 wx.authorize 会弹窗询问用户
                    that.userInfoButton();
                }
            }
        });
    },

    userInfoButton: function () {
        if (cc.GamePlatform.IsWechatGame()) {
            let winSize = cc.view.getFrameSize();
            let button = wx.createUserInfoButton({
                type: 'text',
                text: '点击登陆游戏',
                style: {
                    left: 30,
                    top: 300,
                    width: 200,
                    height: 40,
                    lineHeight: 40,
                    backgroundColor: '#ff0000',
                    color: '#ffffff',
                    textAlign: 'center',
                    fontSize: 16,
                    borderRadius: 4
                },
                withCredentials: true
            });
            button.onTap(res => {
                if (res.errMsg == "getUserInfo:ok") {
                    this.saveUserInfo(res);
                }
                else if (res.errMsg == "getUserInfo:fail auth deny") {
                    this.showWxModal('提示', '拒绝授权将无法进入游戏', () => { this.wxExitMiniProgram(); }, () => { this.userInfoButton(callback); });
                }
                button.destroy();
            });
        }
    },

    wxLoginCode: function (cb) {
        if (!cc.GamePlatform.IsWechatGame()) {
            return;
        }
        let that = this;
        //1)获取code
        wx.login({
            success: function (res) {
                // console.warn(res.code); //小游戏中,每次刷新code都会变化
                if (cb) cb();
            }
        });
    },

    wxUserInfo: function (b) {
        let that = this;
        wx.getUserInfo({
            withCredentials: b,
            success: function (retdata) {
                that.saveUserInfo(retdata);
            }
        });
    },

    showWxModal(title, content, sureFunc, cencelFunc) {
        if (!cc.GamePlatform.IsWechatGame()) {
            return;
        }

        wx.showModal({
            title: title,
            content: content,
            confirmColor: '#55E213',
            success: function (res) {
                if (res.confirm) {
                    //用户点击确定
                    sureFunc();
                } else {
                    //用户点击取消
                    cencelFunc();
                    //('用户点击确定');
                }
            }
        });
    },

    wxExitMiniProgram() {
        wx.exitMiniProgram({
            success: function (res) {
                //退出小游戏
            }
        });
    },

    saveUserInfo: function (retdata) {
        let user = {};
        user.encryptedData = retdata.encryptedData;
        user.iv = retdata.iv;
        user.signature = retdata.signature;
        user.rawData = retdata.rawData;
        cc.GameData.SetUserInfo(user);

        var userInfo = retdata.userInfo;
        cc.GameData.GetUserInfo().nickName = userInfo.nickName;
        cc.GameData.GetUserInfo().headUrl = userInfo.avatarUrl;
    },

    loadImage: function (spriteHead, imagUrl) {
        if (!imagUrl) {
            return false;
        }
        //此方法针对4人包括自己,
        let self = this;
        if (imagUrl == undefined || imagUrl == null || imagUrl == '' || imagUrl.length <= 0) return;
        cc.loader.load({ url: imagUrl, type: 'png' }, function (err, texture) {
            if (err) {
                setTimeout(() => {
                    self.loadImage(spriteHead, imagUrl);
                }, 2000);
                cc.error(err);
                return false;
            } else {
                spriteHead.spriteFrame = new cc.SpriteFrame(texture);
            }
        });
        return true;
    },

    //拷贝数组,用于扑克牌数组的拷贝
    copyMemory: function (tArray, fArray, fArrayCount, index) {
        for (var i = index; i < fArrayCount; i++) {
            if (fArray[i] != 0) {
                tArray.push(fArray[i]);
            }
        }
        return tArray;
    },

    //从数组中删除一个元素
    spliceArrayElementOne: function (array, element) {
        if (array == undefined) {
            return array;
        }
        for (var ii = 0; ii < array.length; ii++) {
            if (array[ii] == element) {
                array.splice(ii, 1);
                break;
            }
        }
        return array;
    },

    //是否有相同元素
    contains: function (arr, obj) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                return true;
            }
        }
        return false;
    },

    //计算两点距离
    distance: function (x1, y1, x2, y2) {
        return Math.sqrt(Math.abs(x1 - x2)*Math.abs(x1 - x2) + Math.abs(y1 - y2)*Math.abs(y1 - y2));
    },

    //两个坐标相等
    isEqual: function (coord1, coord2) {
        if (coord1.x == coord2.x && coord1.y == coord2.y) {
            return true;
        }
        return false;
    },

    //计算弧度
    radian: function (angle) {
        return Math.PI * angle / 180;
    },

    //计算角度
    angle: function (r) {
        return r*180 / Math.PI;
    },

    //转换坐标
    rotationCoordinate: function (coord, angle) {
        if (angle > 0) {
            var x = coord.x * Math.cos(this.radian(angle)) + coord.y * Math.sin(this.radian(angle));
            var y = coord.y * Math.cos(this.radian(angle)) + coord.x * Math.sin(this.radian(angle));
            return {x: x, y: y};
        }
        else if (angle < 0) {
            var x = coord.x * Math.cos(this.radian(angle)) - coord.y * Math.sin(this.radian(angle));
            var y = coord.y * Math.cos(this.radian(angle)) + coord.x * Math.sin(this.radian(angle));
            return {x: x, y: y};
        }
        return coord;
    },

    //相对于某个坐标点的target矩形区域所占用的范围
    rectRegion: function (x, y, target) {
        // var X1 = this.node.x - this.node.getContentSize().width / 2;
        // var X2 = this.node.getContentSize().width / 2 - this.node.x;
        // var Y1 = this.node.y - this.node.getContentSize().height / 2;
        // var Y2 = this.node.getContentSize().height / 2 - this.node.y;

        var X1 = x - target.getContentSize().width / 2;
        var X2 = target.getContentSize().width / 2 + x;
        var Y1 = y - target.getContentSize().height / 2;
        var Y2 = target.getContentSize().height / 2 + y;
        return {x1: X1, x2: X2, y1: Y1, y2: Y2};
    },

    //菱形所占用的区域
    diamRegion: function (x, y, target) {
        var coord1 = {x: x - target.getContentSize().width / 2, y: y};
        var coord2 = {x: x, y: y - target.getContentSize().width / 2};
        var coord3 = {x: x + target.getContentSize().width / 2, y: y};
        var coord4 = {x: x, y: y + target.getContentSize().width / 2};

        var equ1 = this.coordEquation(coord1, coord2);
        var equ2 = this.coordEquation(coord2, coord3);
        var equ3 = this.coordEquation(coord3, coord4);
        var equ4 = this.coordEquation(coord4, coord1);

        return {c1: coord1, c2: coord2, c3: coord3, c4: coord4, e1: equ1, e2: equ2, e3: equ3, e4: equ4};
    },

    //计算方程
    coordEquation: function (coord1, coord2) {
        var a = (coord2.y - coord1.y) / (coord2.x, coord1.x);
        var b = coord1.y - a * coord1.x;
        return {a: a, b: b};
    },

    //坐标点是否在菱形区域内 @param {cc.Node} target
    isInDiamRegion: function (coord, dia) {
        // if (this.isInDirecOfEqu(coord, this.D.NE, dia.e1, 1) && this.isInDirecOfEqu(coord, this.D.NW, dia.e2, 2) 
        // && this.isInDirecOfEqu(coord, this.D.SW, dia.e3, 3) && this.isInDirecOfEqu(coord, this.D.SE, dia.e4, 4)) 
        // {
        //     return true;
        // }

        if (this.getB(coord, dia.e1) > dia.e1.b && this.getB(coord, dia.e2) > dia.e2.b 
        && this.getB(coord, dia.e3) < dia.e3.b && this.getB(coord, dia.e4) < dia.e4.b)
        {
            return true;
        }

        return false;
    },

    getB: function (coord, equ) {
        console.log(coord);
        return coord.y - equ.a * coord.x;
    },

    //坐标点是否在方程的这个方向上，dir为方向，equ为方程
    isInDirecOfEqu: function (coord, dir, equ, a) {
        console.log(a);
        if (dir == this.D.NE || dir == this.D.NW) {
            var b = coord.y - equ.a * coord.x;
            var flag = b > equ.b ? true : false;
            return flag;
        }
        else if (dir == this.D.SW || dir == this.D.SE) {
            var b = coord.y - equ.a * coord.x;
            var flag = b < equ.b ? true : false;
            return flag;
        }
        // if (equ.a > 0) {
        //     // if (dir == this.D.SW || dir == this.D.NE) return false;
        //     // console.log('111111111111111111');
        //     var b = coord.y - equ.a * coord.x;
        //     // var d = b > equ.b ? this.D.NW : this.D.SE;
        //     var flag = b > equ.b ? ture : false;
        //     // if (dir == d) return true;
        //     return flag;
        // }
        // else if (equ.a < 0) {
        //     // if (dir == this.D.NW || dir == this.D.SE) return false;
        //     // console.log('2222222222222222');
        //     var b = coord.y - equ.a * coord.x;
        //     var d = b > equ.b ? this.D.NE : this.D.SW;
        //     if (dir == d) return true;
        // }
        return false;
    }

    // update (dt) {},
});
