import pymysql

coon = pymysql.connect(
    host='127.0.0.1', user='root', passwd='toortoor',
    port=3306, db='papapa', charset='utf8'
)

# 类似的数据库
# 标题 text
# 链接 text
# 时间 time
# 爬取时间 time
# 简介 text(24)
# 内容指针 int
