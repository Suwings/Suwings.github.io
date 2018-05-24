--	在T_user表插入数据：“id01，刘德华，123，KBB，5678900，湖南长沙，13899005678，ldh123，admin”；
use ConstructionDB

go

delete T_user where T_user.user_name = '刘德华'
insert into 
	T_user(user_id,user_name,user_passwd,dept_id,telephone,address,handphone,usb_no,reserve)
	values ('id01','刘德华','123','KBB','5678900','湖南长沙','13899005678','ldh123','admin')


--	查询出所属部门为“KBB”的操作员的基本信息；

select * from T_user
	where T_user.dept_id = 'KBB'

--  查询出姓名为“刘德华”的操作员具有哪些功能权限；
/*
select * from T_func_item 
	where func_id in (
		select func_id from Relationship_1
			where Relationship_1.func_role_id in (
				select func_role_id from Relationship_2
					where Relationship_2.user_id in (
						select user_id from T_user
							where T_user.user_name = '刘德华'
					)
			)
	)
*/

select * from T_func_item 
	right join Relationship_1 on Relationship_1.func_id = T_func_item.func_id
	right join Relationship_2 on Relationship_2.func_id = Relationship_1.func_role_id
	right join T_user on T_user.user_id = Relationship_2.user_id
	where 
		T_user.user_name = '刘德华'


--	查询出“投标责任人”角色所拥有的功能；
select * from T_func_item 
	where func_id = (
		select Relationship_1.func_id from Relationship_1
			where Relationship_1.func_role_id = (
				select func_role_id from T_func_role_def 
					where T_func_role_def.func_role_name = '投标责任人'
			)
	)