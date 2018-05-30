package top.suiwngs.entiy;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.ByteToMessageDecoder;

import java.util.List;

public class PackageDecoder extends ByteToMessageDecoder {
    @Override
    protected void decode(ChannelHandlerContext ctx, ByteBuf in, List<Object> out) throws Exception {
//      String msg = in.toString(CharsetUtil.US_ASCII);
        StringBuffer msg = new StringBuffer();
        while (in.isReadable()) { // (1)
            char ch = (char) in.readByte();
            msg.append(ch);
        }
        out.add(new MinePackage(msg.toString()));
    }
}
