!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n(1),n(2),n(3),n(4)},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";window.PAGE={},window.print=function(e){console.log(e)},window.onload=function(){document.getElementById("search-context").focus()}},function(e,t,n){"use strict";var o=function(e){return e&&e.__esModule?e:{default:e}}(n(5));var i=document.getElementById("search-context");PAGE.jsnopToBaidu=function(e){if(""!=e){var t=document.createElement("script");t.src="https://www.baidu.com/su?wd="+e+"&cb=PAGE.baiducb",document.body.appendChild(t)}},PAGE.gotoPage=function(e){window.location.href=e},PAGE.search=function(e,t){var n=i.value,o=n,r=null;(n=encodeURIComponent(n),"baidu"==e&&(r="https://www.baidu.com/s?ie=UTF-8&wd="+n),"bing-a"==e&&(r="https://cn.bing.com/search?q="+n+"&ensearch=0"),"bing-b"==e&&(r="https://cn.bing.com/search?q="+n+"&ensearch=1"),"google"==e&&(r="https://www.google.com.hk/search?q="+n),"google-a"==e&&(r="https://suwings-link.glitch.me/search?q="+n),"github"==e&&(r="https://github.com/search?q="+n),"tieba"==e&&(r=["https://www.baidu.com/s?ie=UTF-8&wd=",n," inurl:",t].join("")),"translate"==e)&&(r=new RegExp("^[0-9a-zA-Z _]+$","igm").test(o)?["https://translate.google.cn/#view=home&op=translate&sl=auto&tl=zh-CN&text=",n].join(""):["https://translate.google.cn/#view=home&op=translate&sl=auto&tl=en&text=",n].join(""));"zhihu"==e&&(r=["https://www.zhihu.com/search?type=content&q=",n].join("")),PAGE.gotoPage(r)},PAGE.input=function(e){var t=i.value;if(-1!=e||13!=window.event.keyCode&&10!=window.event.keyCode){if(0==e){if("'"==(t=encodeURIComponent(t)).trim())return;t.trim().length>0?PAGE.jsnopToBaidu(t):document.getElementById("search-tip-block").innerHTML=""}}else PAGE.search("baidu")};var r=document.getElementById("search-tip-block");PAGE.baiducb=function(e){r.innerHTML="";if(e&&e.hasOwnProperty("s")&&e.s.length>0){var t=null,n=0;for(var i in e.s)n++,t=(t='<p id="$id">$text2</p>'.replace(/\$text2/gim,o.default.encode(e.s[i].toString()))).replace(/\$id/gim,"linke_tip_"+n),r.innerHTML+=t}},r.onclick=function(e){if(e){var t=e.target;if(console.log(t),t!=r){var n=t.innerHTML;document.getElementById("search-context").value=o.default.decode(n)}}}},function(e,t,n){"use strict";e.exports={encode:function(e){return e.replace(/&/gim,"&amp;").replace(/</gim,"&lt;").replace(/>/gim,"&gt;").replace(/\"/gim,"&quot;").replace(/\'/gim,"&apos;").replace(/ /gim,"&nbsp;")},encodejs:function(e){return e.replace(/\"/gim,'\\"').replace(/\'/gim,"\\'")},decode:function(e){return e.replace(/&lt;/gim,"<").replace(/&gt;/gim,">").replace(/&quot;/gim,'"').replace(/&apos;/gim,"'").replace(/&nbsp;/gim," ").replace(/<script>/gim,"").replace(/&amp;/gim,"&")}}}]);