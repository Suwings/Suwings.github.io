 
if exists(select * from sysobjects where name = 'm_jobs')
	drop table m_jobs
if exists(select * from sysobjects where name = 'm_users')
	drop table m_users




create table m_users(
	id int identity(1,1) not null,
	name varchar(32) not null,
	class int not null ,
	age int not null default 0,
	primary key(id),

)

create table m_jobs(
	id int identity(1,1) not null,
	jobname varchar(32) not null,
	user_id int not null,
	primary key(id),
	foreign key(user_id) references m_users(id)
)


insert into m_users(name,class,age) values ('xxxx',3175 ,21);
insert into m_users(name,class,age) values ('AAAAAA',3175,21);
insert into m_users(name,class,age) values ('UUU',3175,14);
insert into m_users(name,class,age) values ('BB',3179,14);
insert into m_users(name,class,age) values ('CCCC',3179,11);
insert into m_users(name,class,age) values ('DDDDDDD',3179,11);
insert into m_users(name,class,age) values ('EEEEEEEEEEE',3170,14);

insert into m_jobs(jobname,user_id) values ('AAA',1);
insert into m_jobs(jobname,user_id) values ('BBBB',3);
insert into m_jobs(jobname,user_id) values ('GGGG',2);

select  m_users.class, AVG(m_users.age) as avgv from m_users 

where m_users.name != '' and m_users.name is not null

group by class having class >= 3175

order by avgv desc


select m_users.class as classz,

	case
		when m_users.class = 3175 then 'A Class'
		when m_users.class = 3179 then 'B Class'

	end as 'Class Classzz'

from m_users where m_users.age > 20