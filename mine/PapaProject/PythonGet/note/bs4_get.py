import requests
from bs4 import BeautifulSoup
import os
import time
from urllib.parse import urlparse


def init_reptile(tar_url):
    res = requests.get(tar_url)
    soup = BeautifulSoup(res.text, 'html.parser', from_encoding='utf-8')
    return soup


def get_one_webstie(url, mainElem, linkElem, TimeElem, titleElem=None):
    """仅仅用于抓取新闻标题"""
    objs = rep.select(mainElem)
    results = []
    for v in objs:
        tmps = {}
        # 解析 ParseResult(scheme='http', netloc='www.chenxm.cc', path='/post/719.html', params='', query='', fragment='')
        url_obj = urlparse(url)
        # 标题
        if titleElem == None:
            # 寻找子元素还是有点问题
            tmps['title'] = v.select(linkElem).get_text()
        else:
            tmps['title'] = v.select(titleElem).get_text()
        # 链接
        href_url = v.select(linkElem).attr('href')
        if href_url[:4] in 'http':
            tmps['href'] = href_url
        else:
            tmps['href'] = url_obj.scheme + "://" + url_obj.netloc + os.path.normpath(os.path.join(
                os.path.dirname(url_obj.path), href_url)).replace("\\", "/")
        # 文本时间
        tmps['time'] = v.select(TimeElem).text()
        # 原始URL
        tmps['original_url'] = url
        # 数据库中的 URL 是解析完成的 URL
        tmps['url'] = os.path.normpath(url_obj.path)
        # 主机名
        tmps['netloc'] = url_obj.netloc
        results.append(tmps)
    return results


rep = init_reptile("http://www.miit.gov.cn/n1146290/n1146392/index.html")

get_one_webstie("http://www.miit.gov.cn/n1146295/n1652858/n1653018/index.html",
                ".clist_con li", 'a', 'span>a')
print("a")
