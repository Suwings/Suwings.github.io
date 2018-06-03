select a.Email as Email from Person a
group by a.Email
having count(*) > 1