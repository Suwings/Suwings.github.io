// Typescript 基本代码
// App 初始化
function App(appName, option) {
    console.log("\u6B63\u5728\u521D\u59CB\u5316 " + appName);
    console.log("App \u9009\u9879: " + option.host);
}
// 测试 App
App('Hello world', {
    port: 233,
    host: '127.0.0.1',
    args: ['aaa', 'bbb']
});
// AppService 泛型使用
var AppService = /** @class */ (function () {
    // 构造函数 Public 关键字则为公开属性
    function AppService(serviceName, serviceObject, mobject) {
        this.serviceName = serviceName;
        this.serviceObject = serviceObject;
        console.log("\u6267\u884C\u547D\u4EE4: " + this.serviceObject.cmd);
        // 这样就算传入的不一定是数组，也必须拥有 toString,兼容所有拥有 toSting 的对象
        console.log("Mobject: " + mobject.toObjectSting());
    }
    Object.defineProperty(AppService.prototype, "commande", {
        get: function () {
            return this.serviceObject.cmd + this.serviceObject.args.toString();
        },
        set: function (v) {
            this.serviceObject.cmd = v;
        },
        enumerable: true,
        configurable: true
    });
    return AppService;
}());
// 基于 mustHaveToString 兼容接口实现的对象
var mobj = {
    id: 666,
    toObjectSting: function () {
        return "{ id:" + mobj.id + " }";
    }
};
// Test ok
var myAppService = new AppService('0000A1', {
    id: 1, cmd: 'cmd.exe', args: []
}, mobj);
