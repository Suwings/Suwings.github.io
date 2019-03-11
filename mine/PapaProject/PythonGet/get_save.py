import pymysql

# 类似的表
# 标题 text 不可空
# 链接 text 不可空
# 时间 time
# 爬取时间 time
# 简介 text(24)
# 内容指针 int

try:
    BD_coon = pymysql.connect(
        host='127.0.0.1', user='root', passwd='toortoor',
        port=3306, db='papapa', charset='utf8'
    )
except:
    print("数据库连接失败，程序停止.")
    exit(0)


cursor = BD_coon.cursor()
sql = "insert into news_a1 values(null,'%s','%s','%s',null,null,null);" % (
    "Test01", "http://www.baidu.com/", "2019-1-1 23:59:59")
try:
    cursor.execute(sql)
    # 提交到数据库执行
    BD_coon.commit()
except Exception as err:
    # 如果发生错误则回滚
    BD_coon.rollback()
    print(err)
