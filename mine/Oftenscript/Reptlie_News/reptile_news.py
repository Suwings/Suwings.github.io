# -*- coding:utf-8 -*-
from pyquery import PyQuery as pquery
import time

news_center = []


def get_one_webstie(url, elem):
    '''普通类型网站通用方法'''
    print("爬取:"+url+" | 元素:"+elem)
    document = pquery(url)
    objs = document.find(elem).items()
    tmps = []
    for v in objs:
        tmps.append(v.text())
    return tmps


news_center += get_one_webstie("https://news.qq.com/", "div#subHot>h2>a")
news_center += get_one_webstie("https://news.baidu.com/",
                               "li.bold-item>a")
news_center += get_one_webstie("https://news.baidu.com/widget?id=AllOtherData&channel=internet",
                               "div.has-picture>h3.title>a")
news_center += get_one_webstie("https://news.baidu.com/widget?id=Industry&channel=tech",
                               "ol.olist>li>a")
news_center += get_one_webstie("https://news.baidu.com/widget?id=Industry&channel=tech",
                               "ul.ulist>li>a")

#
# debug all news
news_count = 1
for news in news_center:
    print(str(news_count) + "." + news)
    news_count += 1
