use su;

-- 按顺序清空依赖关系的表中数据
delete Elective;
delete Student;
delete Course;

--alter table Elective add test_column varchar(32);
--alter table Elective alter column test_column int
--alter table Elective drop test_column;


-- 插入学生数据
insert into Student(id,name,password,address) values (1,'小王','123456','Chang Sha');
insert into Student(id,name,password,address) values (2,'小明','123456','Chang Sha');
insert into Student(id,name,password,address) values (3,'小雷','123456','Chang Sha');
insert into Student(id,name,password,address) values (4,'小张','123456','Chang Sha');
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
-- 会出错，外键限制
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

-- 查出所有学生所有科目的成绩并且按成绩排序
select Student.name,Course.category,Elective.mark from Student 
	left join Elective on Student.id = Elective.sid
	left join Course on Elective.cid = Course.id
	where Student.name like '小%'
	order by mark desc;

-- 查出每科选修人数
select Course.category,count(Elective.sid) from Course
left join Elective on Elective.cid  = Course.id 
group by Course.category



