-- 触发器

CREATE TRIGGER TRIGER_Students_Insert
ON students
FOR INSERT
AS
	begin
		declare @class varchar(6)
		SELECT @class=students.class from students 
			inner join inserted ON students.sno=students.sno
		if(@class != '95033')
		begin
			raiserror('不可操作 95033 以外的触发器',16,8)
			rollback tran
		end
	end

DROP TRIGGER TRIGER_Students_Insert;