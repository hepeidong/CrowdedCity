/**
 * 全局字段，游戏数据的字段放在这里，包括网络消息号
 */

var Gl = {}

//砖块的缩放比例
Gl.Brick_ScaleX = 0.4;
Gl.Brick_ScaleY = 0.45;

Gl.OriginCoord = {x: -248, y: 175.6};//坐标原点（没用到）
Gl.OriginZIndexOfFloor = 100;//砖块的原始z轴深度，在这里是最右上角的砖块的z轴深度
Gl.OriginZIndexOfFurniture = 300;//家具在z轴上的初始深度

//坐标信息
Gl.Coords = [
    [{x: -18, y: 328},{x: -64, y: 298},{x: -109, y: 268},{x: -155, y: 238},{x: -201, y: 208},{x: -247, y: 178}],
    [{x: 28, y: 298},{x: -18, y: 268},{x: -64, y: 238},{x: -109, y: 208},{x: -155, y: 178},{x: -201, y: 148}],
    [{x: 74, y: 268},{x: 28, y: 238},{x: -18, y: 208},{x: -64, y: 178},{x: -109, y: 148},{x: -155, y: 118}],
    [{x: 120, y: 238},{x: 74, y: 208},{x: 28, y: 178},{x: -18, y: 148},{x: -64, y: 118},{x: -109, y: 88}],
    [{x: 166, y: 208},{x: 120, y: 178},{x: 74, y: 148},{x: 28, y: 118},{x: -18, y: 88},{x: -64, y: 58}],
    [{x: 212, y: 178},{x: 166, y: 148},{x: 120, y: 118},{x: 74, y: 88},{x: 28, y: 58},{x: -18, y: 28}]
]

//存储在缓存里面的数据
Gl.S_Key_Set = 's_key_set';//设置信息 {}
Gl.S_Key_Furnitures = 's_key_furnitures';//房间里已经存放的家具列表 []

//游戏运行过程中产生的数据，程序终止后，不存在
Gl.Key_FurNode = 'key_furnitureNode';//家具节点 []

Gl.Key_BrickId = 'key_brickId';//砖块id Number

Gl.Key_FWP = 'key_furnitureWorldPos';//家具的世界坐标
Gl.Key_SBId= 'key_SBId';//被手指点中的砖块的Id，必须是空闲状态的砖块

Gl.Key_fCollisionId = 'key_firstCollisionId';//第一个发生碰撞的砖块id
Gl.Key_nCollisionId = 'key_nextCollisionId';//下一个发生碰撞的砖块id

Gl.Key_ZIndex = 'key_zIndex';//家具z轴的渲染深度

Gl.Key_EditMode = 'key_editMode';//编辑模式

module.exports = Gl;