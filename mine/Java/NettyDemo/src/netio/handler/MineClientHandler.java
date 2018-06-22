package top.suiwngs.netio.handler;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import top.suiwngs.netio.entiy.MinePackage;
import top.suiwngs.netio.entiy.ResponseContext;
import top.suiwngs.netio.entiy.RoutePackage;


public class MineClientHandler extends ChannelInboundHandlerAdapter {

    @Override
    public void channelActive(ChannelHandlerContext ctx) {
        System.out.println("客户端: 已连接上");
        ctx.pipeline().write(new RoutePackage("server/hello","please."));
        ctx.pipeline().flush();
    }

    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) {
        RoutePackage p = (RoutePackage) msg;
        MinePackage minePackage = new MinePackage(p.data);
        // send event
        ResponseContext responseContext = new ResponseContext(ctx,minePackage);
        ReceiveMediator.getInstance().fireRouter(p.name,responseContext);
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        System.out.println("ERROR:");
        cause.printStackTrace();
        ctx.close();
    }
}
