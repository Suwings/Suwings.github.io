// const fsExtra = require('fs-extra');


// setTimeout(async () => {
//     try {

//         await fsExtra.copy('D:/Game/FZ_2/', 'D:/Game/copt/')
//     } catch (er) {
//         console.log(er);
//     }
// })


// let a = '(ItemClassString="制作覆盖2",BaseCraftingResourceRequirements=((ResourceItemTypeString="PrimalItem_WeaponLongBow_C",BaseResourceRequirement=1.000000,bCraftingRequireExactResourceType=False)))'

// let q = 'ConfigOverrideItemMaxQuantity=(ItemClassString="",Quantity=(MaxItemQuantity=1,bIgnoreMultiplier=True))'
let t = '(Name="xxxx",Items=((Item="A",Stack=10),(Item="B",Stack=8),(Item="C",Stack=12)),Other=(Name="www",Age=12))'


// let a = '(Test="Test",MultTest=(Item=(Name=XXXX,Age=100,Other=(Myself=suwings,Age=(SUB=AAA,KK=sss)))),BaseResourceRequirement=(Name2=ZZZ,Age2=22),bCraftingRequireExactResourceType=(Name=1,Item=2,Other=(Bane=1,I=2)))';
let a = '(TestName=((Wer=zzz,Zas=xxx),(ui=ooo,wapper=(Name=A,BB=C),x=A)),Items=((Name=A,Age=10),(Name=B,Age=11),(Name=C,Age=12)),Other=(Qwe=A,III=xxx))';

function Node(l, r) {
    this._left = l;
    this._right = r;
}
Node.prototype = Object.prototype;

function NodeList(l, r) {
    this._left = l;
    this._right = r;
}
NodeList.prototype = Array.prototype;

function startBulid(text = "", start = 0) {
    var boundaryAdd = 0;
    var node = new Node(-1, -1);
    for (var i = start; i < text.length; i++) {
        var ch = text[i];
        // 一般 Node
        if (ch === '(' && node instanceof Node) {
            if (node._left == -1) {
                node._left = i;
            } else {
                boundaryAdd++;
            }
        }
        if (ch === ')' && node instanceof Node) {
            if (node._right == -1 && boundaryAdd == 0) {
                node._right = i;
                console.log("类文本:", text.slice(node._left, node._right + 1));
                var res = attributeAnalysis(text.slice(node._left, node._right + 1), node);
                return res;
            } else {
                boundaryAdd--;
            }
        }

    }
}

function buildList(nodeList, listText) {
    console.log(nodeList, listText);
    var arr = listText.slice(2, listText.length - 2).split('),(');
    // [ 'Name=A,Age=10', 'Name=B,Age=11' ]
    for (let k in arr) {
        var subNode = startBulid('(' + arr[k] + ')', 0);
        nodeList.push(subNode);
    }
}

function attributeAnalysis(text = "", node = {}) {
    // 循环去掉第一项和最后一项
    //ResourceItemTypeString=(xxxxxx=aaaaaaa,A2=(B1=C1,C=Z)),z=1.000000,x=True
    var basePoint = -1;
    for (var i = 0; i < text.length; i++) {
        var ch = text[i];
        // 等于号键值对
        if (ch == '=') {
            basePoint = i;
            var key = findLeftKey(text, basePoint);
            // 判断Value值是否是数组形式
            if (text[basePoint + 1] == '(' && text[basePoint + 2] == '(') {
                var nodelist = new NodeList(-1, -1);
                nodelist._left = i + 1; // +1过滤空格 找到头
                for (var z = i + 2; z < text.length; z++) {
                    if (text[z] === ')' && text[z + 1] === ')') {
                        nodelist._right = z + 1;  // 找到数组尾
                        // 数组((Name = A, Age = 10), (Name = B, Age = 11))
                        buildList(nodelist, text.slice(nodelist._left, nodelist._right + 1));
                        i = nodelist._right;
                        node[key] = nodelist;
                        break;
                    }
                }
            } else {
                //非数组形式则普通键值对
                var value = findRightValue(text, basePoint);
                if (value instanceof Node) {
                    i = value._right;
                    console.log('指针重置到:', i, '=>', text[i])
                }
                console.log('匹配键值对:', key, '=>', value);
                node[key] = value;
            }
        }

    }
    return node;
}


function findLeftKey(text, basePoint) {
    var lp1 = text.lastIndexOf('(', basePoint);
    var lp2 = text.lastIndexOf(',', basePoint);
    // var lpList = text.lastIndexOf('((', basePoint);
    var lp = Math.max(lp1, lp2);
    return text.slice(lp + 1, basePoint);
}

function findRightValue(text, basePoint) {
    var rp1 = text.indexOf(',', basePoint);
    var rp2 = text.indexOf(')', basePoint);
    if (rp1 == -1) rp1 = 9999999;
    if (rp2 == -1) rp2 = 9999999;
    var rp = Math.min(rp1, rp2);
    var newLeft = text.indexOf('(', basePoint);
    if (newLeft < rp && newLeft != -1) {
        // Value=(xxxxxx=aaaaaaa,A2=(B1=C1,C=Z)),z=1.000000,x=True
        // 新的子类
        return startBulid(text, newLeft);
    }
    return text.slice(basePoint + 1, rp);
}

// {   _left: 0,
//     _right: 133,
//     TestName:
//      Array {
//        '0': { _left: 0, _right: 16, Wer: 'zzz', Zas: 'xxx' },
//        '1': { _left: 0, _right: 24, ui: 'ooo', wapper: 'apple', x: 'A' },
//        _left: 10,
//        _right: 54,
//        length: 2 },
//     Items:
//      Array {
//        '0': { _left: 0, _right: 14, Name: 'A', Age: '10' },
//        '1': { _left: 0, _right: 14, Name: 'B', Age: '11' },
//        '2': { _left: 0, _right: 14, Name: 'C', Age: '12' },
//        _left: 62,
//        _right: 110,
//        length: 3 },
//     Other: { _left: 118, _right: 132, Qwe: 'A', III: 'xxx' } }
// }

//(TestName=((Wer=zzz,Zas=xxx),(ui=ooo,wapper=apple,x=A)),Items=((Name=A,Age=10),(Name=B,Age=11),(Name=C,Age=12)),Other=(Qwe=A,III=xxx))';
//(TestName=((Wer=zzz,Zas=xxx),(ui=ooo,wapper=apple,x=A)),Items=((Name=A,Age=10),(Name=B,Age=11),(Name=C,Age=12)),Other=(Qwe=A,III=xxx))

//解析
function nodeTreeStringify(nodeTree) {
    // 数组处理函数
    function nodeTreeArrayStringify(nodeArray) {
        var tmp = '';
        for (var z in nodeArray) {
            if (z == '_left' || z == '_right' || z == 'length') continue;
            tmp += nodeTreeStringify(nodeArray[z]) + ',';
        }
        return '(' + tmp.slice(0, tmp.length - 1) + ')';
    }
    // 普通对象处理开始
    var stringify = '';
    for (var k in nodeTree) {
        if (k == '_left' || k == '_right') continue;
        var key = k;
        var value = nodeTree[k];
        if (value instanceof Array) {
            stringify += key + '=' + nodeTreeArrayStringify(nodeTree[k]) + ',';
            continue;
        }
        if (value instanceof Object) {
            stringify += key + '=' + nodeTreeStringify(nodeTree[k]) + ',';
            continue;
        }
        if (typeof (value) == 'string') {
            stringify += key + '=' + value + ',';
            continue;
        }
    }
    var classString = '(' + stringify.slice(0, stringify.length - 1) + ')';
    return classString;
}


var res = startBulid(a)
strz = nodeTreeStringify(res);
console.log('-----------Result 1-----------')
console.log(res);
console.log('-----------Result 2-----------')
console.log(strz);




