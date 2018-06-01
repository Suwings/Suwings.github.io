package top.suiwngs.db.test;

import top.suiwngs.db.DatabaseModel;

import java.util.Date;

public class TestData extends DatabaseModel {
    public int x = 1111;
    public long zz = 222222222;
    public String string = "AAAAAAAA";
    public Date date = new Date( System.currentTimeMillis());
    public double zzx  = 1.22;
}
