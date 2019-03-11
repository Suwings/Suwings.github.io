import time

import pymysql
from pyquery import PyQuery as pquery
from urllib.parse import urlparse


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


def insert_pa_data(data):
    # INSERT INTO
    sql = "insert into `news_a1` (`title`, `domain`, `link`, `time`, `get_time`, `Introduction`, `context`) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '0');" % (
        data['title'],
        data['url'].netloc,
        data['href'],
        data['time'],
        time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(time.time())),
        ""
    )
    try:
        cursor.execute(sql)
        # 提交到数据库执行
        BD_coon.commit()
    except Exception as err:
        # 如果发生错误则回滚
        BD_coon.rollback()
        print(err)


def get_one_webstie(url, mainElem, linkElem, TimeElem):
    document = pquery(url, encoding='utf-8')
    objs = document.find(mainElem).items()
    results = []
    for v in objs:
        tmps = {}
        # 标题
        tmps['title'] = v.children(linkElem).text()
        # 链接
        tmps['href'] = v.children(linkElem).attr('href')
        # 文本时间
        tmps['time'] = v.children(TimeElem).text()
        # 原始URL
        tmps['original_url'] = url
        # 解析 ParseResult(scheme='http', netloc='www.chenxm.cc', path='/post/719.html', params='', query='', fragment='')
        tmps['url'] = urlparse(url)
        results.append(tmps)
    return results


news_center = get_one_webstie("http://www.gov.cn/zhengce/zuixin.htm",
                              ".news_box>.list h4", 'a', 'span.date')
news_center += get_one_webstie("http://www.miit.gov.cn/n1146295/n1652858/n1653018/index.html",
                               ".clist_con li", 'a', 'span>a')

news_count = 1
for news in news_center:
    print(str(news_count) + "." + news['title'] + " "+news['url'].netloc +
          "\n 时间 "+news['time']+" | 链接：" + news['href'])
    news_count += 1
    insert_pa_data(news)
    if news_count > 10:
        break


"""
可能的问题
URL 处理
../../../n1146295/n1652858/n1653018/c6635223/content.html
http://www.gov.cn/zhengce/content/2018-12/29/content.html
/zhengce/2019-01/25/content_5361054.htm
xxx/xxxx.html
"""