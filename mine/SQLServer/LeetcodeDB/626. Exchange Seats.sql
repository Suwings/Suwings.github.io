-- mineself
select if(a.id>(select count(*) from seat),a.id-1,a.id) as id,student from (
    select if(b.id%2=0,b.id-1,b.id+1) as id,student from seat b
) as a
order by a.id asc

-- fastst
SELECT (CASE WHEN id % 2 = 1 AND id = ct THEN id
             WHEN id % 2 = 1 THEN id + 1
             ELSE id - 1
        END) AS id, student
FROM seat, (select COUNT(*) AS ct
            FROM seat) AS table1
ORDER BY id