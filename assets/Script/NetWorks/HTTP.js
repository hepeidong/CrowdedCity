
//http://test.api.haoyunlaiyule1.com/client/logon?type=h5
var URL = "https://test.api.haoyunlaiyule1.com";
// var URL = "https://wfy.xyxapi.zhangliediaozhatian.com";

exports.master_url = null;
exports.url = null;
exports.token = null;

init();

function init() {
    exports.master_url = URL;
    exports.url = URL;
}

function setURL(url) {
    URL = url;
    init();
};

function sendRequest(path, data, handler, extraUrl) {
    var xhr = cc.loader.getXMLHttpRequest();
    xhr.timeout = 100000;

    if (data == null) {
        data = {};
    }
    if (exports.token) {
        data.token = exports.token;
    }

    if (extraUrl == null) {
        extraUrl = exports.url;
    }

    //解析请求路由以及格式化请求参数
    var sendpath = path;
    var sendtext = '?';
    for (var k in data) {
        if (sendtext != "?") {
            sendtext += "&";
        }
        sendtext += (k + "=" + data[k]);
    }

    //组装完整的URL
    var requestURL = extraUrl + sendpath + encodeURI(sendtext);

    //发送请求
    ////console.log("RequestURL:" + requestURL);
    xhr.open("GET", requestURL, true);

    if (cc.sys.isNative) {
        xhr.setRequestHeader("Accept-Encoding", "gzip,deflate", "text/html;charset=UTF-8");
    }

    // var timer = setTimeout(function() {
    //     xhr.hasRetried = true;
    //     xhr.abort();
    //     ////console.log('http timeout');
    //     retryFunc();
    // }, 5000);

    var retryFunc = function() {
        sendRequest(path, data, handler, extraUrl);
    };

    xhr.onreadystatechange = function () {
        ////console.log("onreadystatechange");
        // clearTimeout(timer);
        if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
            // ////console.log("http res(" + xhr.responseText.length + "):" + xhr.responseText);
            cc.log("request from [" + xhr.responseURL + "] data [", ret, "]");
            var respText = xhr.responseText;

            // //(respText);
            var ret = null;
            try { 
                // ////(respText);
                ret = JSON.parse(respText);
                // ret = respText;
            } catch (e) {
                ////console.log("err:" + e);
                ////('解析错误: ==> ');
                ////(respText);
                ret = {
                    errcode: -10001,
                    errmsg: e
                };
            }

            if (handler) {
                handler(ret);
            }

            handler = null;
        }
        // else if (xhr.readyState === 4) {
        //     if(xhr.hasRetried){
        //         return;
        //     }

        //     ////console.log('other readystate == 4' + ', status:' + xhr.status);
        //     setTimeout(function() {
        //         retryFunc();
        //     }, 5000);
        // }
        else {
            ////console.log('other readystate:' + xhr.readyState + ', status:' + xhr.status);
        }
    };

    try {
        xhr.send();
    }
    catch (e) {
        //setTimeout(retryFunc, 200);
        // retryFunc();
        ////console.warn('send exec');
    }

    return xhr;
}

exports.sendRequest = sendRequest;
exports.setURL = setURL;
