/**************
 * created:		2018/8/31
 * author:      
 * purpose:		配置文件管理
 */

var Config = require('Config');
let GameData = require('GameData')
var GameFile = (function(){
    let _instance = null;
    function constructor() {
        return {
            // getLandServerIP: function() {
            //     let ip = GameConfig.GameServerInfo.LandServerIP;
            //     return ip;
            // },
            // getLandServerPort: function() {
            //     let port = GameConfig.GameServerInfo.LandServerPort;
            //     return port;
            // },
            // getGameServerIP: function() {
            //     let ip = GameConfig.GameServerInfo.GameServerIP;
            //     return ip;
            // },
            // getGameServerPort: function() {
            //     let port = GameConfig.GameServerInfo.GameServerPort;
            //     return port;
            // },
            // getVersionCode: function() {
            //     let vs = GameConfig.GameServerInfo.version;
            //     return vs;
            // },
            // paragraph: function(p, l) {
            //     return GameConfig.Paragraph[p][l];
            // },
            // shareTile: function() {
            //     return GameConfig.ShareTitle;
            // },
            readJS_GameSetMap: function() {
                let data = GameData.Instance.Get(cc.Gl.S_Key_Set);
                if (data)
                {
                    GameData.Instance.addDataToBaseGameSet(data);
                    return GameData.Instance.Get(cc.Gl.S_Key_Set);
                }
                data = {};
                let gameSetMap = Config.GameSetMap;
                for (let key in gameSetMap)
                {
                    data[key] = gameSetMap[key];
                }
                GameData.Instance.addDataToBaseGameSet(data);
                return GameData.Instance.Get(cc.Gl.S_Key_Set);
            },
            writeJS_GameSetMap: function(data) {
                GameData.Instance.addDataToBaseGameSet(data);
            },
            readJS_DecorateMap: function(key) {
                return Config.DecorateMap[key];
            }
        }
    }
    return {
        Instance: null,
        getInstance: function() {
            if (GameFile.Instance == null)
            {
                GameFile.Instance = constructor();
            }
            return GameFile.Instance;
        }
    }
})();
module.exports = GameFile;
