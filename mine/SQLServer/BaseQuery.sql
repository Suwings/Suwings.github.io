
create database demomine

/*
use test
*/
if EXISTS(SELECT * FROM sys.databases WHERE name='demomine')  
	drop database demomine
/*  Start  */

if exists(select * from sysobjects where name = 'player_users')
	drop table player_users

create table player_users(
	id INT identity(1,1) not null,
	username VARCHAR(24) not null,
	password VARCHAR (24) not null,
	info TEXT ,

)

Alter table player_users add primary key(id)
Alter table player_users add permission int 


insert into player_users (username,password,info) values ('Wangkun','123456','InfoContext')
insert into player_users (username,password,info) values ('Wangkun3','12345689',null)
insert into player_users (username,password,info) values ('Wangkun4','1234568910','xcxxxxxxxxxxxx')
insert into player_users (username,password,info) values ('WangkunX','1234567','sdasdasdasdas')


select top 10 id,username as Name , password as Pw from player_users 
where username like 'Wangkun%'
order by username desc 


delete from player_users where username in ('Wangkun','Wangkun4')


update player_users set info = '__Update__' where info is null

select * from player_users where id between 1 and 99


	
drop table player_users
