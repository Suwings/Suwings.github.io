/*
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2019-11-21 13:32:18
 * @LastEditTime: 2021-04-20 22:25:21
 * @Description: 
 */
// Server 模块演示代码
export class DemoServer {
    constructor(public serverName: string) {
        console.log(`演示服务器 ${serverName} 正在初始化...`)
    }
}

export function exit() {
    exit();
}