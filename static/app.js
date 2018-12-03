/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./css/main.css */ "./src/css/main.css");

__webpack_require__(/*! ./css/search.css */ "./src/css/search.css");

__webpack_require__(/*! ./common.js */ "./src/common.js");

__webpack_require__(/*! ./page_function */ "./src/page_function.js");

/***/ }),

/***/ "./src/common.js":
/*!***********************!*\
  !*** ./src/common.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//全局变量

window.PAGE = {};
window.print = function (tx) {
    console.log(tx);
};

/***/ }),

/***/ "./src/css/main.css":
/*!**************************!*\
  !*** ./src/css/main.css ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/css/search.css":
/*!****************************!*\
  !*** ./src/css/search.css ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/page_function.js":
/*!******************************!*\
  !*** ./src/page_function.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _tools = __webpack_require__(/*! ./tools */ "./src/tools.js");

var _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchInputEle = document.getElementById('search-context'); //PAGE 页面逻辑

PAGE.jsnopToBaidu = function (value) {
    if (value != '') {
        var oScript = document.createElement('script');
        oScript.src = 'https://www.baidu.com/su?wd=' + value + '&cb=PAGE.baiducb';
        document.body.appendChild(oScript);
    }
};

PAGE.gotoPage = function (url) {
    window.location.href = url;
};

PAGE.search = function (type) {
    var text = searchInputEle.value;
    text = encodeURIComponent(text);
    var url = null;
    if (type == 'baidu') {
        url = 'https://www.baidu.com/s?ie=UTF-8&wd=' + text;
        PAGE.gotoPage(url);
    }
    if (type == 'bing-a') {
        url = 'https://cn.bing.com/search?q=' + text + '&ensearch=0';
        PAGE.gotoPage(url);
    }
    if (type == 'bing-b') {
        url = 'https://cn.bing.com/search?q=' + text + '&ensearch=1';
        PAGE.gotoPage(url);
    }
    if (type == 'google') {
        url = 'https://www.google.com.hk/search?q=' + text;
        PAGE.gotoPage(url);
    }
    if (type == 'google-a') {
        url = 'https://suwings-link.glitch.me/search?q=' + text;
        PAGE.gotoPage(url);
    }
    if (type == 'github') {
        url = 'https://github.com/search?q=' + text;
        PAGE.gotoPage(url);
    }
};

// 搜索框内容输入
PAGE.input = function (type) {
    var text = searchInputEle.value;

    // 回车默认百度搜索
    if (type == -1 && (window.event.keyCode == 13 || window.event.keyCode == 10)) {
        PAGE.search('baidu');
        return;
    }

    //获取baidu提示
    if (type == 0) {
        text = encodeURIComponent(text);
        if (text.trim() == "\'") return;
        if (text.trim().length > 0) {
            //to jsnop
            PAGE.jsnopToBaidu(text);
        } else {
            document.getElementById('search-tip-block').innerHTML = "";
        }
    }
};

//反馈子功能函数
var searchTip = document.getElementById('search-tip-block');
//jsnop callback
PAGE.baiducb = function (objs) {
    searchTip.innerHTML = "";
    var templateTip = '<p id="$id">$text2</p>';
    if (objs && objs.hasOwnProperty('s') && objs['s'].length > 0) {
        var newt = null;
        var i = 0;
        for (var k in objs['s']) {
            i++;
            newt = templateTip.replace(/\$text2/igm, _tools2.default.encode(objs['s'][k].toString()));
            newt = newt.replace(/\$id/igm, "linke_tip_" + i);
            searchTip.innerHTML += newt;
        }
    }
};

//select tip
searchTip.onclick = function (e) {
    if (e) {
        var target = e.target;
        console.log(target);
        if (target != searchTip) {
            var textTip = target.innerHTML;
            document.getElementById('search-context').value = _tools2.default.decode(textTip);
        }
    }
};

/***/ }),

/***/ "./src/tools.js":
/*!**********************!*\
  !*** ./src/tools.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//Tools


module.exports = {
    // XSS 转义函数
    encode: function encode(html) {
        var rstr = html.replace(/&/gim, '&amp;').replace(/</gim, '&lt;').replace(/>/gim, '&gt;').replace(/\"/gim, '&quot;').replace(/\'/gim, '&apos;').replace(/ /gim, '&nbsp;');
        return rstr;
    },
    encodejs: function encodejs(text) {
        var rstr = text.replace(/\"/gim, '\\"').replace(/\'/gim, "\\'");
        return rstr;
    },
    decode: function decode(text) {
        var str = text.replace(/&lt;/gim, '<').replace(/&gt;/gim, '>').replace(/&quot;/gim, '"').replace(/&apos;/gim, "'").replace(/&nbsp;/gim, ' ').replace(/<script>/gim, "").replace(/&amp;/gim, '&');
        return str;
    }
};

/***/ })

/******/ });
//# sourceMappingURL=app.js.map