use demo

if (exists (select * from sys.objects where name = 'searchStudent'))
    drop proc searchStudent
go
create proc searchStudent(
	@class varchar(5),
	@name varchar(4) output
)
as
    select @name=sname from dbo.students where students.class=@class;


--执行searchBooks
exec searchStudent 95033,@name;

-- select @name as Name

print @name