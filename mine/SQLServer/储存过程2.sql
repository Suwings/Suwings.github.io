-- 请注意储存过程只能单独执行
create procedure proc_emp_create (
	@classz varchar(5) ,@sno varchar(3),@sname varchar(6)
)
as
begin
  insert into students(class,sname,sno,ssex,sbirthday) values(@classz, @sname,@sno, 'M', '1999-12-24');
end


--请独立执行
exec proc_emp_create 'xxxxxx','0000','TEST'



drop proc proc_emp_create

