/* Write your T-SQL query statement below */
select (select distinct Salary from Employee 
        order by Salary desc 
        OFFSET 1 ROWS 
        FETCH NEXT 1 ROWS ONLY)  as SecondHighestSalary 