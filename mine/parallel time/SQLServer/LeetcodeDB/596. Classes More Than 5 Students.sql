select a.class from courses a
group by a.class
having count(distinct a.student) >= 5 