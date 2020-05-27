select b.Name as Department ,a.Name as Employee, a.Salary as Salary 
    from Employee a
    join Department b
    on a.DepartmentId = b.Id
    where (a.DepartmentId,a.Salary) in (
        select Employee.DepartmentId, max(Employee.Salary) from Employee
            group by Employee.DepartmentId
    )