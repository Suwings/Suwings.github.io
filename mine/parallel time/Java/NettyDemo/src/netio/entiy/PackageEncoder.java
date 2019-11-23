package top.suiwngs.netio.entiy;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.MessageToByteEncoder;
import sun.misc.BASE64Encoder;

public final class PackageEncoder extends MessageToByteEncoder<RoutePackage> {

    @Override
    protected void encode(ChannelHandlerContext ctx, RoutePackage routePackage, ByteBuf out) throws Exception {
        final BASE64Encoder encoder = new BASE64Encoder();
        final String text = routePackage.data;
        final String rname = routePackage.name;
        final String allStr = rname + "\n\n" + text;
        final byte[] textByte = allStr.getBytes("UTF-8");
         String encodedText = encoder.encode(textByte);
        encodedText += "\r\n";
        out.writeBytes(encodedText.getBytes("utf-8"));
    }
}