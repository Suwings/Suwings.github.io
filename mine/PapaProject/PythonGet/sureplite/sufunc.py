# -*- coding: utf-8 -*-

import os
import re
import time
from urllib.parse import urlparse

import requests
from pyquery import PyQuery as pquery

from sureplite.sutools import comp_http_url


def init_reptile(tar_url, encoding='utf-8'):
    """ 初始化爬虫 """
    web_res_context = requests.get(tar_url)
    web_res_context.encoding = encoding
    document = pquery(web_res_context.text)
    # 添加属性
    reptile = {}
    reptile['tar_url'] = tar_url
    reptile['document'] = document
    return reptile


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
    只要页面匹配，即可抓取，用于文章匹配，单篇
    Use: get_context_website({
        "时间": "a>time",
    })
    """
    document = reptile['document']
    result = {}
    for k, v in configs.items():
        # 特殊标识
        if k[:4] == 'ext|':
            result[k[4:]] = v
            continue
        # 多重选择器
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
            # 特殊字段：time
            if k == 'time':
                time_res = re.findall(
                    "\d{4}[-/年]{,1}\d{1,2}[-/月]{,1}\d{1,2}[日号]{,1}", tmp_context)
                if len(time_res) <= 0:
                    # 如果获取不到时间，则为爬取时间为准，误差不会超过一天
                    tmp_context = "时间未取到"
                else:
                    tmp_context = time_res[0]
            result[k] = tmp_context
        result["url"] = reptile['tar_url']
        result["context"] = "DEBUG"
    if not ('title' in result.keys()):
        raise AttributeError("爬虫的某个文章请求中，结果集中没有 title 元素，一般都是选择器设置错误。"
                             + "\nURL:" + result["url"]+"\nResult:"+str(result))
    return result
