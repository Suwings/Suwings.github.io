/*
Left 
Rigth 
Inner 
Full 

*/
IF EXISTS(SELECT * FROM sysobjects WHERE name='users')
	drop table users
IF EXISTS(SELECT * FROM sysobjects WHERE name='jobs')
	drop table jobs

create table users(
	id INT identity(1,1) primary key not null,
	username VARCHAR(24) not null
)

create table jobs(
	id INT identity(1,1)  not null,
	jobname VARCHAR(24) not NULL,
	user_id int not Null,
	primary key(id),
	foreign key(user_id) REFERENCES users(id)
)

insert into users (username) values ('Smra')
insert into users (username) values ('Humserts')
insert into users (username) values ('Suwings')
insert into users (username) values ('Boombomm')
insert into users (username) values ('Boombomm2')

insert into jobs (jobname,user_id) values ('Homework',1)
insert into jobs (jobname,user_id) values ('Network',3)
insert into jobs (jobname,user_id) values ('Cute',2)
insert into jobs (jobname,user_id) values ('Something',4)

/*Left join		users -> jobs */
select users.* , jobs.* from users left join jobs on users.id = jobs.user_id where users.id < 99 
/*Right join	users <- jobs */
select  jobs.*, users.*  from users right join jobs on users.id = jobs.user_id
/*Inner join  MIN */
select users.* , jobs.* from users inner join jobs on users.id = jobs.user_id
/*Full joion  MAX */
select users.* , jobs.* from users full join jobs on users.id = jobs.user_id


drop table jobs
drop table users
