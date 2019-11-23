-- 请独立执行
create proc search_student(
    @class varchar(5),
    @name varchar(4) output
)
as
    select @name=sname from dbo.students where students.class=@class;


-- 值得注意的是,返回的结果是最后一个,而不是一个结果集
declare @recv varchar(4)
exec search_student '95031',@recv output
select @recv


drop proc search_student