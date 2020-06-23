这里是一段 SQL 的代码示例，包括了很多场景下常用的写法，有兴趣可以阅读。


```sql
-- 创建学生表，课程表，选修课程关系表，它们的关系模式如下：
-- Student(#id,name,password,address,age)
-- Course(#id,category,tid)
-- Elective(#sid,#cid,mark) //sid=学生id，cid=课程id

use test;

-- 学生表
create table Student(
	id int NOT NULL,
	name varchar(32) NOT NULL,
	password varchar(32),
	address varchar(256),
  age int,
	primary key (id)
);

-- 课程表
create table Course(
	id int not null,
	category varchar(32) not null,
	tid int not null,
	primary key(id)
);

-- 选修关系表
create table Elective(
	sid int not null,
	cid int not null,
	mark int not null,	
	primary key(sid,cid),
	foreign key (sid) references Student(id),
	foreign key (cid) references Course(id),
);

-- 清空表
delete Elective;
delete Student;
delete Course;

-- 基本表结构的增改删
alter table Elective add test_column varchar(32);
alter table Elective alter column test_column int
alter table Elective drop test_column;


-- 插入学生数据
insert into Student(id,name,password,address) values (1,'小王','123456','Chang Sha',18);
insert into Student(id,name,password,address) values (2,'小明','123456','Chang Sha',19);
insert into Student(id,name,password,address) values (3,'小雷','123456','Chang Sha',22);
insert into Student(id,name,password,address) values (4,'小张','123456','Chang Sha',24);
-- 插入课程数据
insert into Course(id,category,tid) values (1,'高等数学',1);
insert into Course(id,category,tid) values (2,'大学英语',1);
insert into Course(id,category,tid) values (3,'Java 语言',1);

-- N:N 关系，安排学生课程
-- 小王学三门，小明学高数和英语，小雷学Java
insert into Elective(sid,cid,mark) values (1,1,82);
insert into Elective(sid,cid,mark) values (1,2,72);
insert into Elective(sid,cid,mark) values (1,3,80);
insert into Elective(sid,cid,mark) values (2,1,99);
insert into Elective(sid,cid,mark) values (2,2,60);
insert into Elective(sid,cid,mark) values (3,3,72);
insert into Elective(sid,cid,mark) values (4,1,89);
insert into Elective(sid,cid,mark) values (4,2,61);
-- 会出错，外键限制，因为999的cid与sid并不存在
-- insert into Elective(sid,cid,mark) values (999,999,100);

-- 更新举例：将小王的高等数学成绩改为100分
update Elective set mark = 100 where sid = 1 and cid = 1;

-- 删除举例：将小王的 Java 课程删除掉
-- 表子查询，相似的还有 sid in(...)
delete from Elective where sid = (
	select Student.id from Student where name = '小王'
) and cid = (
	select Course.id from Course where category = 'Java 语言'
);

-- 多表联合查询
select * from Course,Elective,Student
	where Course.id = Elective.cid and Student.id = Elective.sid;

-- 查出所有姓小的学生所有科目的成绩并且按成绩排序
select distinct Student.name,Course.category,Elective.mark from Student 
	left join Elective on Student.id = Elective.sid
	left join Course on Elective.cid = Course.id
	where Student.name like '小%'
	order by mark desc;

-- 查出每科选修人数
select Course.category,count(Elective.sid) from Course
	left join Elective on Elective.cid  = Course.id 
	group by Course.category


-- 利用 all(最大值特点) 找出年龄最大的学生，any(最小值特点).
-- 其中 !=all 等价于 not in， =any 等价于 in
select * from Student where age >= all(
	select age from Student
);

-- 利用子查询寻找学高数的学生
select id,name from Student where id in (
	select sid from Elective where cid in (
		select cid from Course where category = '高等数学'
	)
);




```
