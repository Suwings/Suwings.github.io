import os
import time
from urllib.parse import urlparse

import pymysql
from pyquery import PyQuery as pquery
import requests


def init_reptile(tar_url):
    web_res_context = requests.get(tar_url)
    web_res_context.encoding = 'utf-8'
    document = pquery(web_res_context.text)
    # 添加属性
    reptile = {}
    reptile['ext_tar_url'] = tar_url
    reptile['document'] = document

    return reptile


def reptile_resurgence(tar_url, max_layer):
    """爬虫层次挖掘，对目标 URL 进行多层挖"""


def get_context_website(reptile, configs):
    """
    只要页面匹配，即可抓取，用于文章匹配
    Use: get_context_website({
        "时间": "a>time",
        "标题": "#titile"
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
        tar_url = reptile['ext_tar_url']
        tar_url_obj = urlparse(tar_url)
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
            tmps['href'] = tar_url_obj.scheme + "://" + tar_url_obj.netloc + os.path.normpath(os.path.join(
                os.path.dirname(tar_url_obj.path), href_url)).replace("\\", "/")
        # 文本时间
        tmps['time'] = v.children(TimeElem).text()
        # 原始URL
        tmps['original_url'] = tar_url
        # 数据库中的 URL 是解析完成的 URL
        tmps['url'] = os.path.normpath(tar_url_obj.path)
        # 主机名
        tmps['netloc'] = tar_url_obj.netloc
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
