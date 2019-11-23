// 测试 Npm 模块
const npmmm = require('npmmm');
// new
let a = new npmmm();
a.data['v'] = "ABC"
// [日志] ABC404
// 实例对象拥有这些属性
a.debug(a.data['v'] + a.ERROR_404)
// npmmm 类定义（函数对象）拥有此属性
npmmm.appError;

// 额外补充代码
// 1.创建一个空对象
// 2.链接到原型
// 3.绑定this值并调用构造函数
// 4.如果构造函数返回对象则返回对象，否则默认返回
function fakeNew(Fn) {
    // 创建一个空对象
    let obj = new Object()
    // 将新对象的原型指针指向构造函数的原型
    obj.__proto__ = Fn.prototype
    // 处理除了 Fn 以外的剩余参数
    let result = Fn.apply(obj, [].slice.call(arguments, 1))
    return typeof result === "object" ? result || obj : obj
}