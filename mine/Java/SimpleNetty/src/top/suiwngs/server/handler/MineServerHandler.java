package top.suiwngs.server.handler;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import top.suiwngs.entiy.MinePackage;


public class MineServerHandler extends ChannelInboundHandlerAdapter {

    @Override
    public void channelActive(ChannelHandlerContext ctx) {
        ctx.pipeline().write(new MinePackage("HELLO Client!\n"));
        ctx.pipeline().flush();
    }

    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) {
        MinePackage p = (MinePackage) msg;
        System.out.print(p.getMsg());

    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        cause.printStackTrace();
        ctx.close();
    }
}
