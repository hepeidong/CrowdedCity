/**************
 * created:		2018/8/31
 * author:      
 * purpose:		游戏主数据，有关游戏数据的管理和操作写在这里
 */

//链表节点
function Linked_Node(n, d) {
  this.next = n || null;
  this.data = d || null;
}
//链表
function LinkedList() {
  this.root = null;
  this.p = null;
}

LinkedList.prototype = {
  //创建链表
  Create: function () {
    this.root = new Linked_Node(null, null);
    this.p = this.root;
    if (this.root == null) {
      return false;
    }
    return true;
  },
  //插入节点
  Insert: function (d) {
    var n = new Linked_Node(null, d);
    if (this.p.next == null) {
      this.p.next = n;
      this.p = this.p.next;
    }
  },
  //根据位置index搜索节点
  GetNodeAtIndex: function (index) {
    var i = 0;
    var p = this.root;
    while (1) {
      if (i == index) return p;
      if (p.next == null) {
        break;
      }
      p = p.next;
      ++i;
    }
    if (i == index) return p;
    else return null;
  },
  //根据数据值key搜索节点
  GetNodeByKey: function (key) {
    var p = this.root;
    while (1) {
      if (p.data == key) return p;
      if (p.next == null) {
        break;
      }
      p = p.next;
    }
    if (p.data == key) return p;
    else return null;
  },
  //返回数据值key所在的位置
  LocalteNode: function (key) {
    var p = this.root;
    var index = 0;
    while (1) {
      ++index;
      if (p.data == key) return index;
      if (p.next == null) {
        break;
      }
      p = p.next;
    }
    if (p.data == key) return index;
    else return null;
  },
  //根据数据值key删除节点
  DeleteNodeByKey: function (key) {
    var p = this.root;
    var n = this.root.next;
    while (1) {
      if (n.data == key) {
        p.next = n.next;
        for (let key in n)
        {
          delete n[key];
        }
        return true;
      }
      if (n == null) {
        break;
      }
      else {
        p = n;
        n = n.next;
      }
    }
    if (n.data == key) return true;
    else return false;
  },
  //根据节点node修改节点的值
  TranformNode: function (node, key) {
    var p = this.root;
    while (1) {
      if (p == node) {
        p.data = key;
        return true;
      }
      if (p.next == null) {
        break;
      }
      p = p.next;
    }
    if (node == p) {
      p.data = key;
      return true;
    }
    else return false;
  },
  //根据位置index修改节点的值
  TranformNodeByIndex: function (index, key) {
    var i = 0;
    var p = this.root;
    while (1) {
      if (i == index) {
        p.data = key;
        return true;
      }
      if (p.next == null) {
        break;
      }
      p = p.next;
      ++i;
    }
    if (i == index) {
      p.data = key;
      return true;
    }
    else return false;
  },
  //遍历链表
  TraveralLink: function (L, arr) {
    if (L != null) {
      if (L.data != null) arr.push(L.data);
      this.TraveralLink(L.next, arr);
    }
  }
}

var GameData = (function () {
  let _storageKey = null;//缓存数据（这里只存储缓存数据的键，并不存储值）
  let _gameData = null;//游戏牌局数据
  let _userInfo = null;//用户数据(只存储玩家自身的信息，别的玩家不在这存储)
  let _globalData = null;//全局数据（牌局结束之后不会被清除）
  let _linkedList = null;//链表存储
  function constructor() {
    return {
      //设置的基础数据
      addDataToBaseGameSet: function (value) {
        this.Set(cc.Gl.S_Key_Set, value, true);
      },
      //返回key在global链表中的位置
      Index: function (key) {
        return _linkedList.LocalteNode(key);
      },
      //返回global链表中在index位置的值
      GetGlobalAtIndex: function (index) {
        return _linkedList.GetNodeAtIndex(index) ? _linkedList.GetNodeAtIndex(index).data : null;
      },
      //获取游戏数据
      Get: function (key) {
        if (_storageKey[key] == true) {
          let value = cc.sys.localStorage.getItem(key);
          if (typeof value == 'string') {
            if (value[0] == "{" && value[value.length - 1] == "}") {
              return JSON.parse(value);
            }
            else if (value[0] == "[" && value[value.length - 1] == "]") {
              return JSON.parse(value);
            }
          }
          return value;
        }
        else if (_gameData[key] != null || _gameData[key] != undefined) {
          return _gameData[key];
        }
        return null;
      },
      SetUserInfo: function (value) {
        for (let key in value) {
          _userInfo[key] = value[key];
        }
      },
      GetUserInfo: function () {
        return _userInfo;
      },
      isExist: function (key) {
        if (this.Get(key)) {
          return true;
        }
        else if (this.GetGlobal(key)) {
          return true;
        }
        return false;
      },
      //遍历所有游戏数据
      Update: function () {
        let value = {};
        value['storage'] = {};
        for (let key in _storageKey) {
          value['storage'][key] = this.Get(key);
        }
        value['global'] = _globalData;
        var arr = [];
        _linkedList.TraveralLink(_linkedList.root, arr);
        value['global']['array'] = arr;
        value['game'] = _gameData;
        value['userInfo'] = _userInfo;
        return value;
      },
      ClearObj: function (obj) {
        for (let key in obj)
        {
          delete obj[key];
        }
      },
      //清除缓存数据
      ClearStorage: function () {
        for (let key in _storageKey) {
          cc.sys.localStorage.removeItem(key);
        }
      },
      //删除所有除了缓存在内的数据
      Remove: function () {
        this.ClearObj(_gameData);
        this.ClearObj(_userInfo);
        this.ClearObj(_globalData);
        var arr = [];
        _linkedList.TraveralLink(_linkedList.root, arr);
        for (let i = 0; i < arr.length; ++i) {
          _linkedList.DeleteNodeByKey(arr[i]);
        }
        return true;
      },
      //删除游戏牌局产生的数据
      RemoveGame: function () {
        this.ClearObj(_gameData);
        return true;
      },
      //删除具体数据
      RemoveItem: function (key) {
        if (_storageKey[key] == true) {
          cc.sys.localStorage.removeItem(key);
        }
        else if (_gameData[key]) {
          delete _gameData[key];
        }
        else if (_globalData[key]) {
          delete _globalData[key];
        }
        else {
          let linkNode = _linkedList.GetNodeByKey(key);
          if (linkNode) {
            _linkedList.DeleteNodeByKey(key);
          }
        }
      }
    }
  }
  function _init() {
    //游戏数据初始化
    let value = cc.sys.localStorage.getItem('_storageKey');
    if (value) _storageKey = JSON.parse(value);
    else _storageKey = {};
    _gameData = {};
    _userInfo = {};
    _globalData = {};
    _linkedList = new LinkedList();
    _linkedList.Create();
    //重载函数
    overloadFunc();
    return true;
  }
  //增加重载函数
  function addMethod(object, name, func) {
    let old = object[name];
    object[name] = function () {
      if (func.length == arguments.length) {
        return func.apply(this, arguments);
      }
      else if (typeof old == 'function') {
        return old.apply(this, arguments);
      }
    }
  }
  //重载函数实现
  function overloadFunc() {
    //SetGlobal为设置全局变量，在牌局结束时，数据不会被清除，与SetUserInfo相比，SetUserInfo只负责设置与用户信息相关的数据
    /**
     * 此方法会直接把数据存放在链表中
     * @param {any} value 存放的数据值
     */
    addMethod(GameData.Instance, 'SetGlobal', function (value) {
      let linkNode = _linkedList.GetNodeByKey(value);
      if (!linkNode) {
        _linkedList.Insert(value);
      }
    });

    /**
     * 此方法会根据键值对存放数据，如果key的类型为Number，会修改链表中位于key位置的数据
     * @param {String} key 键
     * @param {any} value 值
     */
    addMethod(GameData.Instance, 'SetGlobal', function (key, value) {
      if (value instanceof Array) {
        _globalData[key] = value;
        return;
      }
      else if (value instanceof Object) {
        if (!_globalData[key]) {
          _globalData[key] = {};
        }
        for (let _k in value) {
          _globalData[key][_k] = value[_k];
        }
        return;
      }
      else if (typeof key == 'number') {
        _linkedList.TranformNodeByIndex(key, value);
      }
      else {
        _globalData[key] = value;
      }
    });

    addMethod(GameData.Instance, 'GetGlobal', function () {
      return _globalData;
    });

    /**
     * 根据key值返回全局数据,如果是存储在链表中的，就返回节点
     * 如果key传入的是数字(输入的数字从0开始，跟数组下标类似，比如获取第一个元素，就传入0)，则返回在链表中相应位置的元素
     */
    addMethod(GameData.Instance, 'GetGlobal', function (key) {
      if (_globalData[key]) {
        return _globalData[key];
      }
      else {
        return GameData.Instance.GetGlobalAtIndex(key);
      }
    });

    /**
     * 仅限于存储牌局内数据，数据存储在一个表中，调用RemoveGame时被清除
     * 调用Remove清除除了缓存在内的所有数据
     * @param {String} key 键
     * @param {any} value 值   
     */
    addMethod(GameData.Instance, 'Set', function (key, value) {
      if (value instanceof Array) {
        _gameData[key] = value;
        return;
      }
      else if (value instanceof Object) {
        if (!_gameData[key]) _gameData[key] = {};
        for (let _k in value) {
          _gameData[key][_k] = value[_k];
        }
        return;
      }
      _gameData[key] = value;
    });
    /**
     * 把数据在存储在缓存中
     * 存储游戏数据 check: 为true时，数据存储在本地缓存，调用RemoveGame时不被清除
     * 缓存数据通过RemoveItem方法或者ClearStorage方法来清除
     * @param {String} key 键
     * @param {any} value 值
     * @param {Boolean} check 是否存储在缓存中，true时存储，否则不执行此方法
     */
    addMethod(GameData.Instance, 'Set', function (key, value, check) {
      if (check != true) return;
      if (!_storageKey[key]) {
        _storageKey[key] = true;
        cc.sys.localStorage.setItem('_storageKey', JSON.stringify(_storageKey));
      }
      if (value instanceof Array) {
        cc.sys.localStorage.setItem(key, JSON.stringify(value));
        return;
      }
      else if (value instanceof Object) {
        let _v = GameData.Instance.Get(key);
        if (!_v) _v = {};
        for (let _k in value) {
          _v[_k] = value[_k];
        }
        cc.sys.localStorage.setItem(key, JSON.stringify(_v));
        return;
      }
      cc.sys.localStorage.setItem(key, value);
    });
  }
  return {
    Instance: null,
    getInstance: function () {
      if (GameData.Instance == null) {
        GameData.Instance = constructor();
        if (!_init()) {
          GameData.Instance = null;
        }
      }
      return GameData.Instance;
    }
  }
})();

module.exports = GameData;