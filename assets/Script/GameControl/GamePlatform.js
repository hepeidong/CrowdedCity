
var EXPLOIT_PIXELS_W = 540//设计分辨率宽
var EXPLOIT_PIXELS_H = 960//设计分辨率高
//模拟机型分辨率
var MODULE_PIXELS_W = 540
var MODULE_PIXELS_H = 960
//有刘海全屏的分辨率
var BANGS_PIXELS_W = 540
var BANGS_PIXELS_H = 1080


function GamePlatform() {
    this.screenSize = null;
    this.sysInfo = null;
    if (this.IsWechatGame())
    {
        this.sysInfo = wx.getSystemInfoSync();
    }
}

GamePlatform.prototype = {
    GetScreenSize() {
        // return cc.director.getWinSize();
        return cc.director.getVisibleSize();
    },
    GetWinSizeInPixels() {
        return cc.director.getWinSizeInPixels();
    },
    GetScreenScaleX() {
        return (this.GetScreenSize().width / EXPLOIT_PIXELS_W) * this.GetScale();
    },
    GetScreenScaleY() {
        return (this.GetScreenSize().height / EXPLOIT_PIXELS_H) * this.GetScale();
    },
    GetScale() {
        return (this.GetScreenSize().width*EXPLOIT_PIXELS_H) / (this.GetScreenSize().height*EXPLOIT_PIXELS_W);
    },
    ScreenFitWidth() {
        let canvas = cc.find('Canvas').getComponent(cc.Canvas);
        let winSize = this.GetScreenSize();
        if (winSize.height / winSize.width > EXPLOIT_PIXELS_H / EXPLOIT_PIXELS_W)
        {
            canvas.fitHeight = false;
            canvas.fitWidth = true;
            // canvas.node.scaleX = winSize.width / EXPLOIT_PIXELS_W;
            canvas.node.scaleY = winSize.height / EXPLOIT_PIXELS_H;
            // if (winSize.height / winSize.width > BANGS_PIXELS_H / BANGS_PIXELS_W)
            // {
            //     canvas.node.scaleY = winSize.height / BANGS_PIXELS_H;
            //     // this.screenSize = new cc.size(cc.director.getVisibleSize().width, BANGS_PIXELS_H);
            // }
            // else
            // {
            //     // canvas.node.scaleX = winSize.width / EXPLOIT_PIXELS_W;
            //     canvas.node.scaleY = winSize.height / EXPLOIT_PIXELS_H;
            // }
        }
    },
    ScreenFitWidthOfLayer(layerName, parent) {
        let layer = cc.director.getScene().getChildByName('Canvas').getChildByName(layerName);
        if (!layer) {
            if (!parent) return;
            layer = parent.getChildByName(layerName);
        }
        let layerSize = layer.getContentSize();
        let visibleSize = this.GetScreenSize();

        if (visibleSize.height / visibleSize.width > EXPLOIT_PIXELS_H / EXPLOIT_PIXELS_W) {
            //960为设计分辨率
            if (visibleSize.height / visibleSize.width > BANGS_PIXELS_H / BANGS_PIXELS_W)
            {
                //有刘海的全屏适配
                layerSize.height = visibleSize.height;
                layerSize.width = visibleSize.width;
                layer.setContentSize(layerSize);
                // layer.scaleX = 1440 / visibleSize.width;
            }
            else {
                layerSize.height = visibleSize.height;
                layerSize.width = visibleSize.width;
                layer.setContentSize(layerSize);
            }
        }
    },
    GetVisibleSize() {
        if (this.screenSize) return this.screenSize;
        return cc.director.getVisibleSize();
    },
    IsWechatGame() {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            return true;
        }

        return false;
    }
}

module.exports = GamePlatform;
