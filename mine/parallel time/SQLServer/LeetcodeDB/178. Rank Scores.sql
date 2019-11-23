select a.Score, DENSE_RANK() OVER(order by a.Score desc) as Rank from Scores a
order by a.Score desc

-- Not Best!