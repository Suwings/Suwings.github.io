
declare @temp int = 0
declare @id int = 0
select top 1 @id=t.Id ,@temp=t.Temperature from (
            select top 2 * from Weather order by Id desc
        ) as t 
        order by Id
select a.Id from Weather a
    where a.Temperature >= @temp and a.Id != @id and a.Temperature != @temp