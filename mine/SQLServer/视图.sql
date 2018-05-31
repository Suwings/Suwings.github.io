--    创建视图查询操作员的姓名，密码和所属部门；

create view view_query as
    select T_user.user_name,T_user.user_passwd,T_user.dept_id
        from T_user
    

--select * from view_query