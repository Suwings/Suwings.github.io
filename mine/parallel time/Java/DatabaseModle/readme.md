**这是一份未完成的代码**

本来是打算实现类某框架的数据库模型操作。

类似于这样:
```java
public class TestData extends DatabaseModel {
    public String name  = "小明";
    public long card = 000000;
    public int age = 22;
    public Date date = new Date( System.currentTimeMillis());
    public double zzx  = 1.22;
}
```

制作出这样的一个数据模型。

然后调用
```java
 testData.executeInsert();
```
即可插入数据到 SQL 数据库中，后来发现代码量有点小多，尤其还是要针对不同类型。

果断还是放弃造轮子了。

**不过这种思想倒是很不错。**


