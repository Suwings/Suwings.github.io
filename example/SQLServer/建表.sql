use su;
-- 学生表
CREATE TABLE Student(
	id int NOT NULL,
	name varchar(32) NOT NULL,
	password varchar(32),
	address varchar(256),
	primary key (id)
)
go
-- 课程表
create table Course(
	id int not null,
	category varchar(32) not null,
	tid int not null,
	primary key(id)
)
go
-- 选修关系表
create table Elective(
	sid int not null,
	cid int not null,
	mark int not null,	
	primary key(sid,cid),
	foreign key (sid) references Student(id),
	foreign key (cid) references Course(id),
)
go


