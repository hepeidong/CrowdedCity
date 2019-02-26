// let UILoader = require('UILoader');

cc.Class({
    extends: cc.Component,

    properties: {
        // UI_IMAG_HALL: 'resources/UI/Hall/Imag_hall/',
        // UI_IMAG_TABLE: 'resources/UI/Table/Imag_table/',
        // UI_IMAG_TEMPLATE: 'resources/UI/Template/Imag_template/',
        // UI_IMAG_POKERS: 'resources/UI/Pokers/',
        // UI_IMAG_MATCH: 'resources/UI/Match/Imag_match/',

        // IMAG_HALL: 'UI/Hall/Imag_hall/',
        // IMAG_TABLE: 'UI/Table/Imag_table/',
        // IMAG_TEMPLATE: 'UI/Template/Imag_template/',
        // IMAG_POKERS: 'UI/Pokers/',
        // IMAG_MATCH: 'UI/Match/Imag_match/',

        // UI_BTN_HALL: 'resources/UI/Hall/Btn_hall/',
        // UI_BTN_TABLE: 'resources/UI/Table/Btn_table/',
        // UI_BTN_TEMPLATE: 'resources/UI/Template/Btn_template/',
        // UI_BTN_MATCH: 'resources/UI/Match/Btn_match/',

        // BTN_HALL: 'UI/Hall/Btn_hall/',
        // BTN_TABLE: 'UI/Table/Btn_table/',
        // BTN_TEMPLATE: 'UI/Template/Btn_template/',
        // BTN_MATCH: 'UI/Match/Btn_match/',

        IMAGE_DECORATE: 'resources/Decorate_Img/'
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    setTexture: function(node, texture) {
        if (!(node instanceof cc.Node) || !(texture instanceof cc.Texture2D))
        {
            if (!(node instanceof cc.Node)) 
            {
                cc.error('node:');
                cc.error(node);
            }
            if (!(texture instanceof cc.Texture2D)) 
            {
                cc.error('texture:');
                cc.error(texture);
            }
            return;
        }
        node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
    },

    DecorateTexture(fileName) {
        var url = this.IMAGE_DECORATE + fileName;
        var texture = cc.textureCache.addImage(cc.url.raw(url));
        return texture;
    }

    // setSpriteFrame: function(node, spriteFrame) {
    //     // if (!(node instanceof cc.Node) || !(spriteFrame instanceof cc.SpriteFrame))
    //     // {
    //     //     if (!(node instanceof cc.Node))
    //     //     {
    //     //         cc.error('node:');
    //     //         cc.error(node);
    //     //     }
    //     //     if (!(spriteFrame instanceof cc.SpriteFrame))
    //     //     {
    //     //         cc.error('spriteFrame:');
    //     //         cc.error(spriteFrame);
    //     //     }
    //     // }
    //     // node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    //     UILoader.replaceSpriteTexture(node, spriteFrame);
    // },

    // Landlord_SpriteFrame: function(fileName) {
    //     return cc.ResManager.spriteAtlas.atlasList[0].getSpriteFrame(fileName);
    // },

    // Normal_SpriteFrame: function(fileName) {
    //     return cc.ResManager.spriteAtlas.atlasList[1].getSpriteFrame(fileName);
    // },

    // HeadFrame_SpriteFrame: function(fileName) {
    //     return cc.ResManager.spriteAtlas.atlasList[2].getSpriteFrame(fileName);
    // },

    // LevelIcon_SpriteFrame: function(fileName) {
    //     return cc.ResManager.spriteAtlas.atlasList[3].getSpriteFrame(fileName);
    // },

    // LevelName_SpriteFrame: function(fileName) {
    //     return cc.ResManager.spriteAtlas.atlasList[4].getSpriteFrame(fileName);
    // },

    // Sprite_Texture(target, fileName, tag) {
    //     if (tag == null)
    //     {
    //         UILoader.loadStaticRes(fileName, cc.SpriteFrame, null, (spriteFrame) => {
    //             UILoader.replaceSpriteTexture(target, spriteFrame);
    //         });
    //     }
    //     else if (tag == 'Hall')
    //     {
    //         this.Hall_Texture(target, fileName);
    //     }
    //     else if (tag == 'Pokers')
    //     {
    //         this.Poker_Texture(target, fileName);
    //     }
    //     else if (tag == 'Match')
    //     {
    //         this.Match_Texture(target, fileName);
    //     }
    //     else if (tag == 'Table')
    //     {
    //         this.Table_Texture(target, fileName);
    //     }
    //     else if (tag == 'Temp')
    //     {
    //         this.Temp_Texture(target, fileName);
    //     }
    //     else 
    //     {
    //         if (!contains(UILoader.tags, tag)) {
    //             UILoader.tags.push(tag);
    //         }
    //         UILoader.loadStaticRes(fileName, cc.SpriteFrame, tag, (spriteFrame) => {
    //             UILoader.replaceSpriteTexture(target, spriteFrame);
    //         });
    //     }
    // },

    // Hall_Texture(target, fileName) {
    //     if (!contains(UILoader.tags, 'Hall')) {
    //         UILoader.tags.push('Hall');
    //     }
    //     let url = this.IMAG_HALL + fileName;
    //     UILoader.loadStaticRes(url, cc.SpriteFrame, 'Hall', (spriteFrame) => {
    //         UILoader.replaceSpriteTexture(target, spriteFrame);
    //     });
    // },

    // Get_Hall_Imag_Texture: function(fileName) {
    //     let tUrl = this.UI_IMAG_HALL + fileName; 
    //     let texture = cc.textureCache.addImage(cc.url.raw(tUrl));
    //     return texture;
    // },

    // Poker_Texture(target, fileName) {
    //     if (!contains(UILoader.tags, 'Pokers')) {
    //         UILoader.tags.push('Pokers');
    //     }
    //     let url = this.IMAG_POKERS + fileName;
    //     UILoader.loadStaticRes(url, cc.SpriteFrame, 'Pokers', (spriteFrame) => {
    //         UILoader.replaceSpriteTexture(target, spriteFrame);
    //     });
    // },

    // Get_Poker_Imag_Texture: function(fileName) {
    //     let tUrl = this.UI_IMAG_POKERS + fileName; 
    //     let texture = cc.textureCache.addImage(cc.url.raw(tUrl));
    //     return texture;
    // },

    // Table_Texture(target, fileName) {
    //     if (!contains(UILoader.tags, 'Table')) {
    //         UILoader.tags.push('Table');
    //     }
    //     let url = this.IMAG_TABLE + fileName;
    //     UILoader.loadStaticRes(url, cc.SpriteFrame, 'Table', (spriteFrame) => {
    //         UILoader.replaceSpriteTexture(target, spriteFrame);
    //     });
    // },

    // Get_Table_Imag_Texture: function(fileName) {
    //     let tUrl = this.UI_IMAG_TABLE + fileName; 
    //     let texture = cc.textureCache.addImage(cc.url.raw(tUrl));
    //     return texture;
    // },

    // Temp_Texture() {
    //     if (!contains(UILoader.tags, 'Temp')) {
    //         UILoader.tags.push('Temp');
    //     }
    //     let url = this.IMAG_TEMPLATE + fileName;
    //     UILoader.loadStaticRes(url, cc.SpriteFrame, 'Temp', (spriteFrame) => {
    //         UILoader.replaceSpriteTexture(target, spriteFrame);
    //     });
    // },

    // Get_Temp_Imag_Texture: function(fileName) {
    //     let tUrl = this.UI_IMAG_TEMPLATE + fileName; 
    //     let texture = cc.textureCache.addImage(cc.url.raw(tUrl));
    //     return texture;
    // },

    // Match_Texture(target, fileName) {
    //     if (!contains(UILoader.tags, 'Match')) {
    //         UILoader.tags.push('Match');
    //     }
    //     let url = this.IMAG_MATCH + fileName;
    //     UILoader.loadStaticRes(url, cc.SpriteFrame, 'Match', (spriteFrame) => {
    //         UILoader.replaceSpriteTexture(target, spriteFrame);
    //     })
    // },

    // Get_Match_Imag_Texture: function (fileName) {
    //     let tUrl = this.UI_IMAG_MATCH + fileName; 
    //     let texture = cc.textureCache.addImage(cc.url.raw(tUrl));
    //     return texture;
    // },

    // Button_Normal(target, url, tag) {
    //     if (tag == null)
    //     {
    //         UILoader.loadRes(url, cc.SpriteFrame, (spriteFrame) => {
    //             UILoader.replaceButtonTexture(spriteNode, spriteFrame, null, null, null);
    //         });
    //     }
    //     else if (tag == 'Hall')
    //     {
    //         UILoader.loadRes(this.BTN_HALL + url, cc.SpriteFrame, (spriteFrame) => {
    //             UILoader.replaceButtonTexture(spriteNode, spriteFrame, null, null, null);
    //         });
    //     }
    //     else if (tag == 'Temp')
    //     {
    //         UILoader.loadRes(this.BTN_TEMPLATE + url, cc.SpriteFrame, (spriteFrame) => {
    //             UILoader.replaceButtonTexture(spriteNode, spriteFrame, null, null, null);
    //         });
    //     }
    //     else if (tag == 'Table')
    //     {
    //         UILoader.loadRes(this.BTN_TABLE + url, cc.SpriteFrame, (spriteFrame) => {
    //             UILoader.replaceButtonTexture(spriteNode, spriteFrame, null, null, null);
    //         });
    //     }
    //     else if (tag == 'Match')
    //     {
    //         UILoader.loadRes(this.BTN_MATCH + url, cc.SpriteFrame, (spriteFrame) => {
    //             UILoader.replaceButtonTexture(spriteNode, spriteFrame, null, null, null);
    //         });
    //     }
    //     else 
    //     {
    //         cc.log('tag 参数错误');
    //         return;
    //     }
    // },

    // Button_Pressed(target, url, tag) {
    //     if (tag == null)
    //     {
    //         UILoader.loadRes(url, cc.SpriteFrame, (spriteFrame) => {
    //             UILoader.replaceButtonTexture(spriteNode, null, spriteFrame, null, null);
    //         });
    //     }
    //     else if (tag == 'Hall')
    //     {
    //         UILoader.loadRes(this.BTN_HALL + url, cc.SpriteFrame, (spriteFrame) => {
    //             UILoader.replaceButtonTexture(spriteNode, null, spriteFrame, null, null);
    //         });
    //     }
    //     else if (tag == 'Temp')
    //     {
    //         UILoader.loadRes(this.BTN_TEMPLATE + url, cc.SpriteFrame, (spriteFrame) => {
    //             UILoader.replaceButtonTexture(spriteNode, null, spriteFrame, null, null);
    //         });
    //     }
    //     else if (tag == 'Table')
    //     {
    //         UILoader.loadRes(this.BTN_TABLE + url, cc.SpriteFrame, (spriteFrame) => {
    //             UILoader.replaceButtonTexture(spriteNode, null, spriteFrame, null, null);
    //         });
    //     }
    //     else if (tag == 'Match')
    //     {
    //         UILoader.loadRes(this.BTN_MATCH + url, cc.SpriteFrame, (spriteFrame) => {
    //             UILoader.replaceButtonTexture(spriteNode, null, spriteFrame, null, null);
    //         });
    //     }
    //     else 
    //     {
    //         cc.log('tag 参数错误');
    //         return;
    //     }
    // },

    // Button_Hover(target, url, tag) {
    //     if (tag == null)
    //     {
    //         UILoader.loadRes(url, cc.SpriteFrame, (spriteFrame) => {
    //             UILoader.replaceButtonTexture(spriteNode, null, null, spriteFrame, null);
    //         });
    //     }
    //     else if (tag == 'Hall')
    //     {
    //         UILoader.loadRes(this.BTN_HALL + url, cc.SpriteFrame, (spriteFrame) => {
    //             UILoader.replaceButtonTexture(spriteNode, null, null, spriteFrame, null);
    //         });
    //     }
    //     else if (tag == 'Temp')
    //     {
    //         UILoader.loadRes(this.BTN_TEMPLATE + url, cc.SpriteFrame, (spriteFrame) => {
    //             UILoader.replaceButtonTexture(spriteNode, null, null, spriteFrame, null);
    //         });
    //     }
    //     else if (tag == 'Table')
    //     {
    //         UILoader.loadRes(this.BTN_TABLE + url, cc.SpriteFrame, (spriteFrame) => {
    //             UILoader.replaceButtonTexture(spriteNode, null, null, spriteFrame, null);
    //         });
    //     }
    //     else if (tag == 'Match')
    //     {
    //         UILoader.loadRes(this.BTN_MATCH + url, cc.SpriteFrame, (spriteFrame) => {
    //             UILoader.replaceButtonTexture(spriteNode, null, null, spriteFrame, null);
    //         });
    //     }
    //     else 
    //     {
    //         cc.log('tag 参数错误');
    //         return;
    //     }
    // },

    // Button_Disabled(target, url, tag) {
    //     if (tag == null)
    //     {
    //         UILoader.loadRes(url, cc.SpriteFrame, (spriteFrame) => {
    //             UILoader.replaceButtonTexture(spriteNode, null, null, null, spriteFrame);
    //         });
    //     }
    //     else if (tag == 'Hall')
    //     {
    //         UILoader.loadRes(this.BTN_HALL + url, cc.SpriteFrame, (spriteFrame) => {
    //             UILoader.replaceButtonTexture(spriteNode, null, null, null, spriteFrame);
    //         });
    //     }
    //     else if (tag == 'Temp')
    //     {
    //         UILoader.loadRes(this.BTN_TEMPLATE + url, cc.SpriteFrame, (spriteFrame) => {
    //             UILoader.replaceButtonTexture(spriteNode, null, null, null, spriteFrame);
    //         });
    //     }
    //     else if (tag == 'Table')
    //     {
    //         UILoader.loadRes(this.BTN_TABLE + url, cc.SpriteFrame, (spriteFrame) => {
    //             UILoader.replaceButtonTexture(spriteNode, null, null, null, spriteFrame);
    //         });
    //     }
    //     else if (tag == 'Match')
    //     {
    //         UILoader.loadRes(this.BTN_MATCH + url, cc.SpriteFrame, (spriteFrame) => {
    //             UILoader.replaceButtonTexture(spriteNode, null, null, null, spriteFrame);
    //         });
    //     }
    //     else 
    //     {
    //         cc.log('tag 参数错误');
    //         return;
    //     }
    // },

    // Get_Hall_Btn_Texture: function(fileName) {
    //     let tUrl = this.UI_BTN_HALL + fileName; 
    //     let texture = cc.textureCache.addImage(cc.url.raw(tUrl));
    //     return texture;
    // },

    // Get_Table_Btn_Texture: function(fileName) {
    //     let tUrl = this.UI_BTN_TABLE + fileName; 
    //     let texture = cc.textureCache.addImage(cc.url.raw(tUrl));
    //     return texture;
    // },

    // Get_Temp_Btn_Texture: function(fileName) {
    //     let tUrl = this.UI_BTN_TEMPLATE + fileName; 
    //     let texture = cc.textureCache.addImage(cc.url.raw(tUrl));
    //     return texture;
    // },

    // Get_Match_Btn_Texture: function(fileName) {
    //     let tUrl = this.UI_BTN_MATCH + fileName; 
    //     let texture = cc.textureCache.addImage(cc.url.raw(tUrl));
    //     return texture;
    // },

    // update (dt) {},
});
