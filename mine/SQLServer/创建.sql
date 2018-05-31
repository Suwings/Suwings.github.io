
create table T_func_item (
	func_id char(3) not null,
	func_name varchar(32) not null,
	reserve varchar(64)
)
Alter table T_func_item add primary key(func_id)


create table T_func_role_def (
	func_role_id char(3) not null,
	func_role_name varchar(32) not null,
	reserve varchar(64)

)
Alter table T_func_role_def add primary key(func_role_id)


create table T_user (
	user_id char(4) not null,
	user_name char(16) not null,
	user_passwd char(16) not null,
	dept_id char(3),
	telephone varchar(16),
	address varchar(32),
	handphone varchar(16),
	usb_no varchar(64),
	reserve varchar(64)
)
Alter table T_user add primary key(user_id)



-- Relationship tables
create table Relationship_1 (
	func_id char(3) not null,
	func_role_id char(3) not null
)
Alter table Relationship_1 add primary key(func_id,func_role_id)
Alter table Relationship_1 
	add foreign key(func_id)
	REFERENCES T_func_item(func_id) 

-- Alter table Relationship_1 add primary key(func_role_id)
Alter table Relationship_1 
	add foreign key(func_role_id)
	REFERENCES T_func_role_def(func_role_id) 
	
-- Seconed
create table Relationship_2 (
	func_id char(3) not null,
	user_id char(4) not null
)

Alter table Relationship_2 add primary key(func_id,user_id)
Alter table Relationship_2 
	add foreign key(func_id)
	REFERENCES T_func_item(func_id) 

--Alter table Relationship_2 add primary key(user_id)
Alter table Relationship_2 
	add foreign key(user_id)
	REFERENCES T_user(user_id) 