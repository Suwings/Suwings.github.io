import os
import time
from urllib.parse import urlparse

import pymysql
from pyquery import PyQuery as pquery
import requests

# 类似的表
# 标题 text 不可空
# 链接 text 不可空
# 时间 time
# 爬取时间 time
# 网站标题
# 网站编码
# 简介 text(24)
# 内容指针 int

# try:
#     BD_coon = pymysql.connect(
#         host='127.0.0.1', user='root', passwd='toortoor',
#         port=3306, db='papapa', charset='utf8'
#     )
# except:
#     print("数据库连接失败，程序停止.")
#     exit(0)


# cursor = BD_coon.cursor()


def insert_pa_data(data):
    # INSERT INTO
    sql = "insert into `news_a1` (`title`, `domain`, `link`, `time`, `get_time`, `Introduction`, `context`) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '0');" % (
        data['title'],
        data['netloc'],
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


def init_reptile(tar_url):
    web_res_context = requests.get(tar_url)
    web_res_context.encoding = 'utf-8'
    document = pquery(web_res_context.text)
    # 添加属性
    reptile = {}
    reptile['ext_tar_url'] = tar_url
    reptile['document'] = document

    return reptile


def get_context_website(reptile, configs):
    """
    只要页面匹配，即可抓取，用于文章匹配
    Use: get_context_website({
        "时间":"a>time",
        "标题":"#titile"
    })
    """
    document = reptile['document']
    result = {}
    for k, v in configs.items():
        jq_elems = document.find(v).items()
        tmp_context = ""
        for je in jq_elems:
            tmp_context += je.text()
        result[k] = tmp_context
    print(result)
    return result


def get_one_webstie(reptile, mainElem, linkElem, TimeElem, titleElem=None):
    """仅仅用于抓取新闻标题"""
    document = reptile['document']
    objs = document.find(mainElem).items()
    results = []
    for v in objs:
        tmps = {}
        # 解析 ParseResult(scheme='http', netloc='www.chenxm.cc', path='/post/719.html', params='', query='', fragment='')
        url = reptile['ext_tar_url']
        url_obj = urlparse(url)
        # 标题
        if titleElem == None:
            tmps['title'] = v.children(linkElem).text()
        else:
            tmps['title'] = v.children(titleElem).text()
        # 链接
        href_url = v.children(linkElem).attr('href')
        if href_url[:4] in 'http':
            tmps['href'] = href_url
        else:
            tmps['href'] = url_obj.scheme + "://" + url_obj.netloc + os.path.normpath(os.path.join(
                os.path.dirname(url_obj.path), href_url)).replace("\\", "/")
        # 文本时间
        tmps['time'] = v.children(TimeElem).text()
        # 原始URL
        tmps['original_url'] = url
        # 数据库中的 URL 是解析完成的 URL
        tmps['url'] = os.path.normpath(url_obj.path)
        # 主机名
        tmps['netloc'] = url_obj.netloc
        results.append(tmps)
    return results


# get_context_website('http://www.moj.gov.cn/news/content/2019-03/15/zfyw_230595.html', {
#     "title": ".con_bt",
#     "context": "#content"
# })

# get_context_website(init_reptile('http://www.miit.gov.cn/n1146290/n1146392/c6669125/content.html'), {
#     "title": "#con_title",
#     "context": "div#con_con"
# })


news_center = []

news_center += get_one_webstie(init_reptile("http://www.gov.cn/zhengce/zuixin.htm"),
                               ".news_box>.list h4", 'a', 'span.date')

news_center += get_one_webstie(init_reptile("http://www.miit.gov.cn/n1146295/n1652858/n1653018/index.html"),
                               ".clist_con li", 'a', 'span>a')
# news_center += get_one_webstie("http://www.mohrss.gov.cn/gkml/zcjd/index.html",
#                                "#documentContainer>.row", '.mc a', '.fbrq>font',
#                                )
# news_center += get_one_webstie("http://www.moj.gov.cn/news/node_zfyw.html",
#                                "ul.font_black_16>li", 'dt>a', 'dd',)


news_count = 1
for news in news_center:
    print(str(news_count) + "." + news['title'] +
          "\n 时间 "+news['time']+" | 链接：" + news['href'])
    news_count += 1
    # insert_pa_data(news)
    # if news_count > 10:
    #     break


"""

可能的问题
URL 处理1x
../../../n1146295/n1652858/n1653018/c6635223/content.html
http://www.gov.cn/zhengce/content/2018-12/29/content.html
/zhengce/2019-01/25/content_5361054.htm
xxx/xxxx.html

"""
