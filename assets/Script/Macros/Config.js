/**
 * 游戏配置文件
 */

var Config = {}
Config.GameSetMap = {
    musicVolume: 0.5, soundVolume: 1, musicOpen: true, soundOpen: true
  }

  //装饰物的配置表
  Config.DecorateMap = {
    //
    Furniture: [
      {name: '冰箱', FurnitureType: 0, fileName: 'Refrigerator'},
      {name: '灶台', FurnitureType: 0, fileName: 'Hearth'},
      {name: '桌子', FurnitureType: 0, fileName: 'Table'},
      {name: '刀架', FurnitureType: 2, fileName: 'ToolCarrier'}
    ]
  }

  module.exports = Config;
