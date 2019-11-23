   select distinct l.Num as ConsecutiveNums 
   from  Logs l 
   join  Logs r 
   on l.Num = r.Num and r.Id < l.Id and l.Id -r.Id <3 
   group by l.Num,l.Id having sum(l.Id-r.Id)=(0+1+2)