-- 事务与储存过程结合使用

create proc tran_and_proc(
	@name varchar(5),
	@sex varchar(4)
)
as
begin

	-- 开始事务 匿名事务
	begin tran 

		declare @tran_error int;
		set @tran_error=0;

	begin try
		-- 其中，当@sex 变量长度过长时出错，事务整体回滚
		insert into students(class,sname,sno,ssex,sbirthday) values('222', '000','00', 'M', '1999-12-24');
		insert into students(class,sname,sno,ssex,sbirthday) values('222', '111','11', 'M', '1999-12-24');
		insert into students(class,sname,sno,ssex,sbirthday) values('000', @name,'00', @sex, '1999-12-24');
	
	end try
	begin catch
		--	set @tran_error=@tran_error+1; --加分号或不加都能正常执行
		rollback tran
		print 'ERROR'
		return
	end catch
	-- 提交
	commit tran; 
	print 'OK:';

end

exec tran_and_proc '232','M'

drop proc tran_and_proc