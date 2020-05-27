package top.suiwngs.netio.entiy;

import io.netty.channel.ChannelHandlerContext;

public class ResponseContext {

    private ChannelHandlerContext ctx;
    private MinePackage mp;

    public ResponseContext(ChannelHandlerContext ctx,MinePackage mp){
        this.ctx = ctx;
        this.mp = mp;
    }

    public ChannelHandlerContext getCtx() {
        return ctx;
    }

    public MinePackage getMp() {
        return mp;
    }

    public String data(){
        return this.mp.getMsg();
    }

    public void write(Object obj){
        this.ctx.pipeline().write(obj);
        this.ctx.pipeline().flush();
    }


}
