-- 开始事务
begin tran tran_AddUserInfo 

declare @tran_error int;
set @tran_error=0;

begin try
	insert into students(class,sname,sno,ssex,sbirthday) values('2312', '000','ssssssss', 'M', '1999-12-24');
	insert into students(class,sname,sno,ssex,sbirthday) values('000', '000','00', 'M', '1999-12-24');
	insert into students(class,sname,sno,ssex,sbirthday) values('111', '111','11', 'M', '1999-12-24');
end try
begin catch
	set @tran_error=@tran_error+1; --加分号或不加都能正常执行
end catch

-- 判断是否有错误
if(@tran_error>0)
begin
	--执行出错，回滚事务
	rollback tran tran_AddUserInfo;
	print 'ERROR:'+convert(varchar,@tran_error);
end 
else
begin
	--没有异常，提交事务
	commit tran tran_AddUserInfo; 
	print 'OK:'+convert(varchar,@tran_error);;
end