// Npm 模块编写实例

// 让暴露接口指向 Application 类
module.exports = class Application {
    constructor() {
        this._data = {};
    }

    get data() {
        return this._data
    }

    debug(v) {
        console.log(`[日志] ${v}`)
    }
}

// 此举会寄生在 Application 函数对象的原型上
// new 出来的对象实例会拥有此属性
// prototype 对象是函数特有的属性
module.exports.prototype.ERROR_404 = '404';

// Application { ERROR_404: '404' }
// console.log(module.exports.prototype)

// 此举会寄生在 Application 函数对象上
module.exports.appError = new Error('x');

// [Function: Application]
// console.log(module.exports)