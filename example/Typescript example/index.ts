/*
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2019-11-21 09:33:00
 * @LastEditTime: 2021-04-20 22:40:35
 * @Description: 
 */
// Typescript 基本代码

// App 初始化接口
interface AppOption {
    port: number,
    host: string,
    args: any[]
}

// App 初始化
function App(appName: string, option: AppOption) {
    console.log(`正在初始化 ${appName}`);
    console.log(`App 选项: ${option.host}`);
}

// 测试 App
App('Hello world', {
    port: 233,
    host: '127.0.0.1',
    args: ['aaa', 'bbb']
})

// App 服务选项
interface AppServiceOption {
    id: number,
    cmd: string,
    args: string[]
}

// 利用 ts 的接口兼容性不管是什么类型，必须拥有 toString 方法
interface mustHaveToString {
    toObjectSting: Function
}

// AppService 泛型使用
class AppService<T extends AppServiceOption> {
    // 构造函数 Public 关键字则为公开属性
    constructor(public serviceName: string, public serviceObject: T, mobject: mustHaveToString) {
        console.log(`执行命令: ${this.serviceObject.cmd}`);
        // 这样就算传入的不一定是数组，也必须拥有 toString,兼容所有拥有 toSting 的对象
        console.log(`Mobject: ${mobject.toObjectSting()}`);
    }

    get commande() {
        return this.serviceObject.cmd + this.serviceObject.args.toString();
    }

    set commande(v) {
        this.serviceObject.cmd = v;
    }
}

// 基于 mustHaveToString 兼容接口实现的对象
const mobj = {
    id: 666,
    toObjectSting(): string {
        return `{ id:${mobj.id} }`
    }
}

// Test ok
const myAppService = new AppService('0000A1', {
    id: 1, cmd: 'cmd.exe', args: []
}, mobj);


// 命名空间演示
namespace MyServiceNameSpace {
    const name = 'name';
    export interface ServiceMinx {
        a: string,
        b: string
    }
    export function doing() {
        console.log('doing ' + name)
    }
}
// 合法的 MyServiceNameSpace 命名空间使用
MyServiceNameSpace.doing();
const a1: MyServiceNameSpace.ServiceMinx = {
    a: 'a', b: 'b'
};

// 导入模块 并且使用内部暴露的接口
import * as server from './server';
const a2 = new server.DemoServer('demo_app');
a2.serverName; // demo_app

import Koa from "koa";
import koaRouter from "koa-router";

const app = new Koa();
const router = new koaRouter();
const a = { x: 2 }
a.x = 3;
router.all("/", (ctx) => {

});