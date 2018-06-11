Java 调用储存过程片段
---------

一个 SQLServer 的储存过程是这样的:
```sql
create proc search_student(
    @class varchar(5),
    @name varchar(4) output
)
as
    select @name=sname from dbo.students where students.class=@class;
```

现在可以用这样的 Java 代码调用它:

```java
//获取数据库对象，这里我已封装
CallableStatement proc = DatabaseManager.getDatabaseManager().getConnect().prepareCall("{call search_student(?,?)}");
//设置参数
proc.setString(1, "95031");
//设置返回值接受
proc.registerOutParameter(2, Types.VARCHAR);
proc.execute();

//获取结果
String res = proc.getString(2);
System.out.println("Res: "+res);
```

> 成功