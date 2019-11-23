select a.Name as Employee  from Employee a
    where a.ManagerId is not null and a.Salary > (
        select b.Salary from Employee b
            where b.Id = a.ManagerId  
    )