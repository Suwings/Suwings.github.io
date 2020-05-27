package top.suiwngs.controller.client;

import top.suiwngs.netio.entiy.MinePackage;
import top.suiwngs.netio.entiy.ResponseContext;
import top.suiwngs.netio.entiy.RoutePackage;
import top.suiwngs.netio.handler.ReceiveEventInterface;
import top.suiwngs.netio.handler.ReceiveMediator;

public class Hello implements ReceiveEventInterface {

    public Hello(){
        ReceiveMediator.getInstance().onRouter("client/hello",this);
    }

    @Override
    public void exec(ResponseContext ctx) {
        System.out.println("客户：触发: hello 路由：\n"+ctx.data());
        for (int i = 0; i < 100; i++) {

            ctx.write(new RoutePackage("server/hello","数据"));
        }
    }
}
