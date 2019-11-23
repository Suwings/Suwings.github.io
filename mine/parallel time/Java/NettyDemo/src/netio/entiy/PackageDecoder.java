package top.suiwngs.netio.entiy;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.ByteToMessageDecoder;
import io.netty.util.CharsetUtil;
import sun.misc.BASE64Decoder;

import java.util.List;

public class PackageDecoder extends ByteToMessageDecoder {

    private final static BASE64Decoder decoder = new BASE64Decoder();
    private final static int START = 0x75;
    private final static int END = 0x76;

    @Override
    protected void decode(ChannelHandlerContext ctx, ByteBuf in, List<Object> out) throws Exception {
        String text = in.toString(CharsetUtil.UTF_8);
        in.skipBytes(in.readableBytes());


        final String realData = new String(decoder.decodeBuffer(text), "UTF-8");
        int loc = realData.indexOf("\n\n");

        String functionName = realData.substring(0,loc);
        String data = realData.substring(loc+2);
        RoutePackage routePackage = new RoutePackage();
        routePackage.data = data;
        routePackage.name = functionName;

        out.add(routePackage);
    }
}
