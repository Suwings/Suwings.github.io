import os
import time
from urllib.parse import urlparse

import pymysql
from pyquery import PyQuery as pquery
import requests
import re


def init_reptile(tar_url):
    """ 初始化爬虫 """
    web_res_context = requests.get(tar_url)
    web_res_context.encoding = 'utf-8'
    document = pquery(web_res_context.text)
    # 添加属性
    reptile = {}
    reptile['tar_url'] = tar_url
    reptile['document'] = document
    return reptile


def comp_http_url(base_url, tar_url):
    """ http url 整理与规范 """
    base_url_obj = urlparse(base_url)
    last_url = ""
    if tar_url[:4] in 'http':
        last_url = tar_url
    else:
        last_url = base_url_obj.scheme + "://" + base_url_obj.netloc + os.path.normpath(os.path.join(
            os.path.dirname(base_url_obj.path), tar_url)).replace("\\", "/")
    return last_url


def reptile_resurgence_links(tar_url, max_layer, max_container="", a_elem="a", res_links=[], next_url="", callback=None):
    """
    爬虫层次挖掘，对目标 URL 进行多层挖链接
    参数：目标 URL | 最大层数 | 爬取范围 | 爬取的a标签选择器 | 内部使用，返回列表 | 内部使用 下一个目标
    """
    if next_url != "" and next_url[:4] in 'http':
        res_links.append(next_url)
    if max_layer <= 0:
        return res_links
    rep = init_reptile(tar_url)
    document = rep['document']
    # 专注于某一区域对网页爬虫 推荐这种方法只爬一层
    container_tags = document.find(max_container).items()
    for tag1 in container_tags:
        children_tags = tag1.children(a_elem).items()
        for tag2 in children_tags:
            # 可以在这里增加 callback 有效减少请求次数
            if callback != None:
                callback(comp_http_url(tar_url, tag2.attr('href')))
            reptile_resurgence_links(
                tar_url, max_layer - 1,
                max_container=max_container,
                res_links=res_links,
                next_url=comp_http_url(tar_url, tag2.attr('href'))
            )
    # 爬取之后将会获得每一个链接
    return res_links


def get_context_website(reptile, configs):
    """
    只要页面匹配，即可抓取，用于文章匹配
    Use: get_context_website({
        "时间": "a>time",
    })
    """
    document = reptile['document']
    result = {}
    for k, v in configs.items():
        arr_v = v.split('||')
        for everyelem in arr_v:
            if everyelem == "":
                continue
            jq_elem = document.find(everyelem)
            if jq_elem.length <= 0:
                continue
            jq_elems = jq_elem.items()
            tmp_context = ""
            for je in jq_elems:
                tmp_context += je.text()
            if k == 'time':
                time_res = re.findall(
                    "\d{4}[-/年]{,1}\d{1,2}[-/月]{,1}\d{1,2}[日号]{,1}", tmp_context)
                if len(time_res) <= 0:
                    # 如果获取不到时间，则为爬取时间为准，误差不会超过一天
                    tmp_context = "2019-XX-XX"
                else:
                    tmp_context = time_res[0]
            result[k] = tmp_context
        result["url"] = reptile['tar_url']
        result["context"] = "DEBUG"

    return result


def reptile_select_news(news_list_url, list_elem, list_a_elem, context_config):
    """通过新闻列表页面与选择新闻显示页面的元素，来自动化爬取第一页未分类的所有新闻"""
    links = reptile_resurgence_links(
        news_list_url,
        1,
        list_elem,
        list_a_elem,
        res_links=[]  # BUG Note: 请小心变量重用，必须要重新声明一个新的
    )
    for link in links:
        res = get_context_website(init_reptile(link), context_config)
        print(res)


reptile_select_news(
    'http://localhost/get.html',
    ".list",
    "ul>li>a",
    {
        "title": ".center>h4",
        "time": ".time",
        "context": ".context"
    }
)


reptile_select_news(
    'http://www.miit.gov.cn/n1146295/n1652858/index.html',
    ".clist_con",
    "ul>li>a",
    {
        "title": ".ctitle>h1||#con_title",
        "time": ".short_r||#con_time",
        "context": ".ccontent"
    }
)


reptile_select_news(
    'http://www.gov.cn/zhengce/zuixin.htm',
    ".news_box",
    "div>ul>li>h4>a",
    {
        "title": "div.article>h1||table.bd1>tbody>tr:eq(2)>td:eq(1)",
        "time": ".pages-date||table.bd1>tbody>tr:eq(3)>td:eq(3)",
        "context": "#UCAP-CONTENT"
    }
)
