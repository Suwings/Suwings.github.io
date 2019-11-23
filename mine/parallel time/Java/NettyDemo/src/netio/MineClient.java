package top.suiwngs.netio;

import io.netty.bootstrap.Bootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioSocketChannel;
import io.netty.handler.codec.LineBasedFrameDecoder;
import top.suiwngs.MineServer;
import top.suiwngs.controller.client.Hello;
import top.suiwngs.netio.handler.MineClientHandler;
import top.suiwngs.netio.entiy.PackageDecoder;
import top.suiwngs.netio.entiy.PackageEncoder;

import java.net.InetSocketAddress;


//Simple Client
public class MineClient {

    public static void main(String[] args) throws Exception {
        new Hello();
        new MineClient().run();
    }

    public MineClient() {

    }

    public void run() throws Exception {
        EventLoopGroup bossGroup = new NioEventLoopGroup();
        EventLoopGroup worker = new NioEventLoopGroup();
        try {
            Bootstrap b = new Bootstrap();
            b.group(worker);
            b.channel(NioSocketChannel.class);
            b.handler(new ChannelInitializer<SocketChannel>() {
                @Override
                public void initChannel(SocketChannel ch) {
                    ch.pipeline().addFirst(new LineBasedFrameDecoder(2048));
                    ch.pipeline().addFirst(new PackageEncoder());
                    ch.pipeline().addLast(new PackageDecoder(), new MineClientHandler());
                }

            });
            //发起异步连接操作
            ChannelFuture futrue = b.connect(new InetSocketAddress("127.0.0.1", 24444)).sync();

            //等待客户端链路关闭
            futrue.channel().closeFuture().sync();
        } finally {
            worker.shutdownGracefully();
            bossGroup.shutdownGracefully();
        }
    }
}