package top.suiwngs.controller.server;

import top.suiwngs.netio.entiy.ResponseContext;
import top.suiwngs.netio.entiy.RoutePackage;
import top.suiwngs.netio.handler.ReceiveEventInterface;
import top.suiwngs.netio.handler.ReceiveMediator;

public class Hello implements ReceiveEventInterface {

    public Hello(){
        ReceiveMediator.getInstance().onRouter("server/hello",this);
    }

    @Override
    public void exec(ResponseContext ctx) {
        System.out.println("服务器：触发: hello 路由:\n"+ctx.data()+"\n----------");
        ctx.write(new RoutePackage("测试2","你好"));
    }
}
