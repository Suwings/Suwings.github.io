use su;
-- ѧ����
CREATE TABLE Student(
	id int NOT NULL,
	name varchar(32) NOT NULL,
	password varchar(32),
	address varchar(256),
	primary key (id)
)
go
-- �γ̱�
create table Course(
	id int not null,
	category varchar(32) not null,
	tid int not null,
	primary key(id)
)
go
-- ѡ�޹�ϵ��
create table Elective(
	sid int not null,
	cid int not null,
	mark int not null,	
	primary key(sid,cid),
	foreign key (sid) references Student(id),
	foreign key (cid) references Course(id),
)
go


