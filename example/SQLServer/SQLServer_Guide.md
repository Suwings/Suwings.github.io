# 数据库须知概念

本文章所有代码与概念以 `SQLServer 2012` 为准。

本文章不适合无任何编程语言基础者阅读，不适合从未接触过数据库者阅读，但是你可以尝试阅读。

此篇旨在于帮助有基础者快速浏览数据库基本学习路线，或者有其他数据库基础的快速浏览。

<br />

SQLServer 基本数据类型
---------

**Character 字符串**

- char(n)         固定长度的字符串 | 最多 8,000 个字节。
- varchar(n)      可变长度的字符串 | 最多 8,000 个字节。 
- text            可变长度的字符串 | 最多 2GB 字节数据。

**Unicode 字符串**

- nchar(n)        固定长度的 Unicode 数据。最多 4,000 个字符。     
- nvarchar(n)    可变长度的 Unicode 数据。最多 4,000 个字符。
- ntext            可变长度的 Unicode 数据。最多 2GB 字符数据。

**Binary 类型**

- bit            允许 0、1 或 NULL     
- binary(n)        固定长度的二进制数据。最多 8,000 字节。     
- varbinary(n)    可变长度的二进制数据。最多 8,000 字节。     
- varbinary(max)可变长度的二进制数据。最多 2GB 字节。     
- image            可变长度的二进制数据。最多 2GB字节。

**Number 类型**

- tinyint        允许从 0 到 255 的所有数字。1 字节。
- smallint        允许从 -32,768 到 32,767 的所有数字。2 字节。
- int            允许从 -2,147,483,648 到 2,147,483,647 的所有数字。4 字节。
- bigint        允许 -9,223,372,036,854,775,808 ~ 9,223,372,036,854,775,807 之间的所有数字。8 字节。
- float            -1.79E+308 至 -2.23E - 308、0 以及 2.23E - 308 至 1.79E + 308。
- real            -3.40E+38 至 -1.18E - 38、0 以及 1.18E - 38 至 3.40E + 38。
- money            8 字节。可用货币符号。
- smallmoney    4 个字节。可用货币符号。

**Date 类型**

- datetime        从 1753 年 1 月 1 日 到 9999 年 12 月 31 日，精度为 3.33 毫秒。
- date            仅存储日期。从 0001 年 1 月 1 日 到 9999 年 12 月 31 日。    3 bytes
- time            仅存储时间。精度为 100 纳秒。

**其他数据类型**

- sql_variant    存储最多 8,000 字节不同数据类型的数据，除了 text、ntext 以及 timestamp。
- xml            存储 XML 格式化数据。最多 2GB。
- cursor        存储对用于数据库操作的指针的引用。
- table            存储结果集，供稍后处理。

> 更多类型请访问 [微软官方文档](https://docs.microsoft.com/zh-cn/sql/t-sql/data-types/data-types-transact-sql?view=sql-server-2017)
> 或者 [菜鸟教程 (适合初学者)](http://www.w3school.com.cn/sql/sql_datatypes.asp)



数据库，表，字段，记录
---------

数据存在于表中，表有各个字段，每一行数据称作为记录，这里不再详细介绍。

> 数据库常用创建代码: [代码链接](https://github.com/Suwings/Suwings.github.io/blob/master/mine/SQLServer/%E5%88%9B%E5%BB%BA.sql)

> 增删查减常用代码: [代码链接](https://github.com/Suwings/Suwings.github.io/blob/master/mine/SQLServer/%E5%9F%BA%E7%A1%80%E6%9F%A5%E8%AF%A2.sql)


单表，多表查询
---------

数据库最常用的就是查询，其中查询也有很多种。

最简单的查询莫过于:

```sql
select * from table_name
```

多表链接查询:
```sql
select users.* , jobs.* from users inner join jobs on users.id = jobs.user_id
```

子查询:
```sql
select * from T_func_item 
    where func_id in (
        select Relationship_1.func_id from Relationship_1
            where Relationship_1.func_role_id in (
                select func_role_id from T_func_role_def 
                    where T_func_role_def.func_role_name = '投标责任人'
            )
    )
```

> 这不是 T-SQL 教程，所以在这里不再更详细的介绍。

约束
---------

约束你对表中数据的更改，因为你无法保证你的每一项操作都是正确的，所以加入这些约束会有好处。

- 主键约束，可以拥有一个独立的 ID 作为主键。
- 外键约束，可以让另外表的键作为你的外键，那么你就与这个表进行关联，操作时会考虑是否合法。
- NOT NULL 约束，会禁止你输入空值。
- Unique 约束，会禁止你输入重复值。
- Default 约束，会自动设置默认值。
- Check 约束，检查值是否符合范围。

分组与排序
---------

主要利用 `group by` 或 `order by` 两种关键字来进行。

当数据分组完毕之后，会产生一个虚拟表格，多个值可能存在一个字段中，所以这个时候需要使用聚合函数来进行操作，否则会报错。

排序，可以使用 `desc` 或 `asc` 进行排序。

索引
---------

类似于在书中建立一个目录，我们只需要翻找目录，就可以找到你要数据的具体页码，从而实现快速查询。

> 使用索引能提高查询效率，但是索引也是占据空间的，而且添加、更新、删除数据的时候也需要同步更新索引，因此会降低 Insert、Update、Delete 的速度。

> 只在经常检索的字段上 Where 创建索引。

- 聚集索引      有序。查询有序排列数据。所以在根据主键进行查询时会效率很高。
- 非聚集索引    无序。在非聚集索引中，不重复的数据越多，那么索引的效率越高。


执行顺序
---------

**一条 SQL 语句执行是有顺序的！**

往往 `from` 关键字是最先执行，`select` 较后执行（思维需要反过来）。

请参考下图:

> 本图来源网络，在 order by 与 top 之间的顺序错误，敬请谅解。

![order](../common/db_order.jpg)


视图
--------

视图十分简单，你只需要知道它是相当于一个过滤器，让你看不见内部， 装饰一番的数据发送给你。

简单的视图创建:

```sql
create view v_demo
as
    select * from xxx where xx = xx -- 要执行的语句（可多连接，子查询等等）

-- 使用视图就当做是一张表一样的使用
select * from v_demo 
```


T-SQL 逻辑编程
--------

很简单，主要逻辑仅有 `if` `while` `case` 等等，逻辑语法并不是很多，无需担心。

```sql
-- 逻辑编程

-- 定义变量
declare @test1 int
set @test1 = 101

-- IF
if(@test1 > 100)
    begin
        print 'Test1 > 100'
    end
else
    begin
        print 'Test1 < 100'
    end

-- While 循环
-- break是表示结束循环，与c语言中的辅助控制语句break，continue类似
while(@test1 < 200)
    begin
        set @test1+=1
    end

-- 输出 200
print 'While:' + convert(nvarchar,@test1);

-- case 给不同分数分等级
use demo
select scores.cno,scores.sno, degree=case
    when scores.degree>=90 then 'A'
    when scores.degree>=80 then 'B'
    when scores.degree>=70 then 'C'
    else 'D'
    end
from scores
```

储存过程
---------

什么是储存过程？是在大型数据库系统中，一组为了完成特定功能的 SQL 语句集，存储在数据库中，经过第一次编译后再次调用不需要再次编译，用户通过指定存储过程的名字并给出参数（如果该存储过程带有参数）来执行它。存储过程是数据库中的一个重要对象。

如果不想看抽象的定义，可以认为以高级编程语言（Java，Python 等）函数，变量等等来理解；

储存过程可以定义函数，变量，返回值，甚至有点类似于小型的编程语言。

列如简单的:
```sql
-- 请单独执行
create proc search_student(
    @class varchar(5), -- 参数
    @name varchar(4) output -- 返回值
)
as
    select @name=sname from dbo.students where students.class=@class;


-- 值得注意的是,返回的结果是最后一个,而不是一个结果集
declare @recv varchar(4)
exec search_student '95031',@recv output    --接受返回值
select @recv

```

储存函数
----------
利用 `Create function` 创建函数。

你可以用编程语言的思想来思考，这类似于`C`语言中的函数。

类似于这样：
```sql
use demo
-- 创建一个名字叫做 fullname 的储存函数，请单独执行此语句
create function FUNC_DEMO(@firstname char(30),@lastname char(30))
returns char(61) -- 告知返回类型
begin
    -- 函数体
    declare @name char(61);
    set @name = @firstname + ' ' + @lastname;
    -- 返回一个 char(61)
    return (@name); 
    -- 甚至可以返回表对象，如下
    return (
        select XXXX from XXXXX where XX=XX
    )
end

-- 返回字符串使用方法:
select [dbo].[FUNC_DEMO]('AA','bbb') as x

-- 返回表对象使用方法： 将其当做一个虚拟表来看待。
-- 是不是又类似“视图”了？
select * from [dbo].[FUNC_DEMO]('XXXX','XXXX')
```

**更好的理解方法**

相信你应该知道 SQLServer 里面有如 `MAX()` `COUNT()` `MIN()` 这类函数，这类函数称之为系统函数。而我们现在就相当于写了一个类似于 `MINE_MAX()` 的用户自定义函数，方便你以后的 SQL 语句编写使用。当然，功能不止这一种。


储存过程与储存函数
----------
1. 一般来说，存储过程实现的功能要复杂一点，而函数的实现的功能针对性比较强。

2. 对于存储过程来说可以返回参数和多个返回值，而函数只能返回值或者表对象。

3. 存储过程一般是作为一个独立的部分来执行，而函数可以作为查询语句的一个部分来调用，由于函数可以返回一个表对象，因此它可以在查询语句中位于FROM关键字的后面。

4. 当存储过程和函数被执行的时候，SQL Manager 会到 procedure cache 中去取相应的查询语句，加快效率。


事务
---------

事务是一种机制、是一种操作序列，它包含了一组数据库操作命令，这组命令要么全部执行，要么全部不执行。

因此事务是一个不可分割的工作逻辑单元。在数据库系统上执行并发操作时事务是作为最小的控制单元来使用的。这特别适用于多用户同时操作的数据通信系统。

例如：订票、银行、保险公司以及证券交易系统等。

**事务 4 大属性：**

- 原子性(Atomicity):    事务是一个完整的操作，要么全部执行，要么全部不执行。
- 一致性(Consistency):  当事务完成时，数据必须处于一致状态。
- 隔离性(Isolation):    对数据进行修改的所有并发事务是彼此隔离的。
- 持久性(Durability):   事务完成后，它对于系统的影响是永久性的。

简单的事务代码:
```sql
-- 开始事务
begin tran 

declare @tran_error int;
set @tran_error=0;

begin try
    -- 其中,这里只要有一个语句发生异常,那么整个语句将都不会执行。
    -- 原先已做过的语句将会被撤销。
    insert into students(class,sname,sno,ssex,sbirthday) values('2312', '000','ssssssss', 'M', '1999-12-24');
    insert into students(class,sname,sno,ssex,sbirthday) values('000', '000','00', 'M', '1999-12-24');
    insert into students(class,sname,sno,ssex,sbirthday) values('111', '111','11', 'M', '1999-12-24');
end try
begin catch
    set @tran_error=@tran_error+1; --加分号或不加都能正常执行
end catch

-- 判断是否有错误
if(@tran_error>0)
begin
    --执行出错，回滚事务
    rollback tran ;
    print 'ERROR:' + convert(varchar,@tran_error)
end 
else
begin
    --没有异常，提交事务
    commit tran ; 
    print 'OK:' + convert(varchar,@tran_error)
end
```

> 通常我们建议，将储存过程与事务相结合使用。

**想知道如何与储存过程结合？** [单击这里](https://github.com/Suwings/Suwings.github.io/blob/master/mine/SQLServer/%E4%BA%8B%E5%8A%A12.sql)


触发器
---------

当对表进行操作的时候，某些特定事件可能会被触发，然后执行相应的 SQL 语句。

其中，触发器有两个特殊的虚拟表：
- 插入表（instered 表）    当发生插入操作时，会先临时加入到此表，等待你的调用。
- 删除表（deleted 表）     当发生删除操作时，会先临时加入到此表，等待你的调用。

![原理图片加载失败](../common/trigger.png)

```sql
CREATE TRIGGER trigger_name
    ON table_name
    [WITH ENCRYPTION]
    [FOR | AFTER | INSTEAD] OF [DELETE, INSERT, UPDATE]
AS
    begin
        [T-SQL] 语句
    end
GO
-- with encryption       表示加密触发器定义的sql文本
-- delete,insert,update  指定触发器的类型
```

简单代码应用是：
```sql
-- 插入数据时，不可插入除 95033 班级以外的
CREATE TRIGGER TRIGER_Students_Insert
ON students
FOR INSERT
AS
    begin
        declare @class varchar(6)
        SELECT @class=students.class from students 
            -- inserted 是虚拟表
            inner join inserted ON students.sno=students.sno
        if(@class != '95033')
        begin
            raiserror('不可操作 95033 以外的触发器',16,8)
            rollback tran
        end
    end

-- 列如这条语句将会执行被阻止
insert into students values('000','XXX','男','1999-12-31','95034')

-- 删除触发器
DROP TRIGGER TRIGER_Students_Insert;
```

数据库函数种类
---------

还记得前面写的“储存函数”吗，那是用户自定义函数？现在我们将大致过一下数据库系统函数。

- 聚合函数
聚合函数对一组值执行计算，并返回单个值。 在 select 列表或 SELECT 语句的 HAVING 子句中允许使用它们。 可以将聚合与 GROUP BY 子句结合使用，来计算行类别的聚合。

- 分析函数
解析函数基于一组行计算聚合值。 不过，与聚合函数不同，分析函数可能针对每个组返回多行。 可以使用分析函数来计算移动平均线、运行总计、百分比或一个组内的前 N 个结果。

- 排名函数
排名函数为分区中的每一行返回一个排名值。 根据所用函数的不同，某些行可能与其他行接收到相同的值。 排名函数具有不确定性。

- 行集函数
行集函数 返回可在 SQL 语句中像表引用一样使用的对象。

- 标量函数
对单一值进行运算，然后返回单一值。 只要表达式有效，即可使用标量函数。

**关于确定性与不确定性函数的解释**

只要使用特定的输入值集并且数据库具有相同的状态，那么不管何时调用，确定性函数始终都会返回相同的结果。 即使访问的数据库的状态不变，每次使用特定的输入值集调用非确定性函数都可能会返回不同的结果。 例如，函数 AVG 对上述给定的限定条件始终返回相同的值，但返回当前 datetime 值的 GETDATE 函数始终会返回不同的结果。

**关于函数**

关于数据库函数，那实在是太多了，推荐各位边学边用。


游标
---------
游标是对查询的结果集合进行一个自定义的选择，可以向上游动，向下游动，选取某一行的结果单独输出。

游标选择取决于是否需要更改或只需查看的数据：

- 如果你只需浏览的结果，而不是更改数据集，使用只进或静态光标。
- 如果你有大型结果集和需要选择只需几行，使用键集光标。
- 如果你想要同步的结果集与最近添加、 更改，并通过所有的并发用户中删除，请使用动态光标。

**游标的具体分类:**

[只进游标](https://docs.microsoft.com/zh-cn/sql/ado/guide/data/forward-only-cursors?view=sql-server-2017) 典型的默认游标类型，可以仅向前移动结果集。更改结果所有人可见。
[静态游标](https://docs.microsoft.com/zh-cn/sql/ado/guide/data/static-cursors?view=sql-server-2017) 支持滚动，静态游标总是显示结果集和第一次打开游标时。如果其他程序更改的表，其他已使用的游标值不会变化。如果你的应用程序并不需要检测数据改变，而且需要滚动，静态游标是最佳选择。
[键集游标](https://docs.microsoft.com/zh-cn/sql/ado/guide/data/keyset-cursors?view=sql-server-2017) 键集游标提供的功能，以检测更改的静态和动态游标之间的功能。 如静态游标，它不始终检测到的成员资格和顺序的结果集的更改。 动态游标，像它未在结果集中检测更改的行的值。
[动态游标](https://docs.microsoft.com/zh-cn/sql/ado/guide/data/dynamic-cursors?view=sql-server-2017)所有的 insert、 update 和 delete 语句所做的所有用户都通过游标可见。

一份简单的游标代码如下：
```sql
-- 最简单的游标
declare @no char(6)
declare @name nvarchar(20)
declare @sex nchar(1)
declare @dept nvarchar(20)
declare cur_student cursor for --申明游标
	select sno,sname,ssex from students

open cur_student

fetch next from cur_student into @no,@name,@sex

while @@FETCH_STATUS<>-1
begin
	print '----------'
	print '@no:'+@no
	print '@name:'+@name
	print '@sex:'+@sex
	print '----------'
	fetch next from cur_student into @no,@name,@sex
end

-- 释放游标
close cur_student
deallocate cur_student
```


数据库范式
---------

什么是数据库范式？这是一种数据库设计模式的模范，一般认为，数据库应该尽可能的接近第三范式。

当然，不用刻意的去遵循，根据现实需求设计。设计数据库者如果能做到更好的反范式，那么说明它的能力越强。

> 具体信息还请去自行搜索，没有例子的话会看得很抽象，篇幅有限，不举例子。

**第一范式（1NF）** 属性不可分。是指在关系模型中，对域添加的一个规范要求，所有的域都应该是原子性的，即数据库表的每一列都是不可分割的原子数据项。

**第二范式（2NF）** 在1NF的基础上，非码属性必须完全依赖于候选码（在1NF基础上消除非主属性对主码的部分函数依赖）

**第三范式（3NF）** 在1NF基础上，任何非主属性不依赖于其它非主属性（在2NF基础上消除传递依赖）

**巴斯-科德范式（BCNF）** Boyce-Codd Normal Form（巴斯-科德范式）在1NF基础上，任何非主属性不能对主键子集依赖（在3NF基础上消除对主码子集的依赖）

**第四范式（4NF）** 要求把同一表内的多对多关系删除。

**第五范式（5NF）** 又称完美范式，从最终结构重新建立原始结构。

<br />

参考文献
---------
> [https://docs.microsoft.com/zh-cn/sql/t-sql/](https://docs.microsoft.com/zh-cn/sql/t-sql/)

> [http://dcx.sap.com/1101/zh/dbreference_zh11/rf-part-using.html](http://dcx.sap.com/1101/zh/dbreference_zh11/rf-part-using.html)

> [https://www.cnblogs.com/rdst/p/4727063.html](https://www.cnblogs.com/rdst/p/4727063.html)

> [http://www.w3school.com.cn/sql/sql_datatypes.asp](http://www.w3school.com.cn/sql/sql_datatypes.asp)

> [https://www.cnblogs.com/fengxiaojiu/p/7994124.html](https://www.cnblogs.com/fengxiaojiu/p/7994124.html)



<br /><br />
**未完待续**
