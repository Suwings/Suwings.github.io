package top.suiwngs.client.handler;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import top.suiwngs.entiy.MinePackage;


public class MineClientHandler extends ChannelInboundHandlerAdapter {

    @Override
    public void channelActive(ChannelHandlerContext ctx) {
        ctx.pipeline().write(new MinePackage("Client OK!\n"));
        ctx.pipeline().flush();
    }

    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) {
        MinePackage p = (MinePackage) msg;
        System.out.print(p.getMsg());

    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        System.out.println("ERROR:");
        cause.printStackTrace();
        ctx.close();
    }
}
