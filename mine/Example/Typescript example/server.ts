// Server 模块演示代码
export class DemoServer {
    constructor(public serverName: string) {
        console.log(`演示服务器 ${serverName} 正在初始化...`)
    }
}

export function exit() {
    exit();
}