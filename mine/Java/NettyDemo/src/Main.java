package top.suiwngs;

import top.suiwngs.controller.client.*;
import top.suiwngs.netio.MineClient;

import java.nio.charset.Charset;

public class Main {

    public static void main(String[] args) {
	// write your code here
        //获取系统默认编码
        System.out.println("系统默认编码：    "+System.getProperty("file.encoding"));//查询结果GBK
        //系统默认字符编码
        System.out.println("系统默认字符编码:"+Charset.defaultCharset()); //查询结果GBK
        //操作系统用户使用的语言
        System.out.println("系统默认语言:"+ System.getProperty("user.language")); //查询结果zh
        new top.suiwngs.controller.client.Hello();
        new top.suiwngs.controller.server.Hello();
        try {
            new top.suiwngs.MineServer(24444).run();
            new MineClient().run();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
