package top.suiwngs.entiy;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.MessageToByteEncoder;

public final class PackageEncoder extends MessageToByteEncoder<MinePackage> {

    @Override
    protected void encode(ChannelHandlerContext ctx, MinePackage msg, ByteBuf out) throws Exception {
        out.writeBytes(msg.getMsg().getBytes());
    }
}