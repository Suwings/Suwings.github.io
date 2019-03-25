# -*- coding: utf-8 -*-

import re

import requests
from pyquery import PyQuery as pquery

from sureplite.sutools import get_today
from sureplite.pxfilter import XssHtml

html_allow_tags = ['a', 'img', 'br', 'strong', 'b', 'code', 'pre',
                   'p', 'em', 'h1', 'h2', 'h3', 'h4',
                   'h5', 'h6', 'ul', 'ol',
                   'li', 'u', 'embed', 's',
                   'caption', 'small', 'q', 'sup', 'sub']


def init_reptile(tar_url, encoding='utf-8'):
    """ 初始化爬虫 """
    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36'
    }
    web_res_context = requests.get(tar_url, headers=headers)
    web_res_context.encoding = encoding
    document = pquery(web_res_context.text)
    # 添加属性
    reptile = {}
    reptile['tar_url'] = tar_url
    reptile['document'] = document
    return reptile


def get_context_website(reptile, configs, other=None):
    """
    只要页面匹配，即可抓取，用于文章匹配，单篇
    Use: get_context_website({
        "时间": "a>time",
    })
    """
    document = reptile['document']
    result = {}
    # 默认值
    result['title'] = ''
    result['time'] = str(get_today())
    result['context'] = ''
    # tmp_context = ''
    # 删除掉不需要的元素
    document.find('script').remove()
    document.find('style').remove()
    # 寻找元素算法
    context_find(document, configs, result)
    # 对此单篇内容的全局属性
    result["url"] = reptile['tar_url']
    # 处理完所有数据之后，进行特殊值附加
    for other_k, other_v in other.items():
        result[other_k] = other_v
    # 不合格数据初步检查
    if not context_must_key(result, "title"):
        print("请求缺失 title 属性:\n" + str(result))
        return None
    if not context_must_key(result, "context"):
        print("请求缺失 context 属性:\n" + str(result))
        return None
    return result


def context_find(document, configs, result):
    """ 内容元素搜寻算法 """
    for k, v in configs.items():
        # 特殊标识
        if k[:4] == 'ext|':
            result[k[4:]] = v
            continue
        # 多重选择器 每个选择器均进行一次元素查找
        arr_v = v.split('||')
        tmp_context = ""
        for everyelem in arr_v:
            if everyelem == "":
                continue
            # 利用此选择器查找
            jq_elem = document.find(everyelem)
            if jq_elem.length <= 0:
                continue
            # 如有此元素，则累加其元素下所有纯文本
            # jq_elems = jq_elem.items()
            # for je in jq_elems:
            #     tmp_context += je.text()  # 这里如果能修改成获取html代码就很好，推荐写个函数封装
            tmp_context = context_html(k, jq_elem)
        # 特殊字段处理
        tmp_context = context_special_field(k, tmp_context)
        # 存入字段
        result[k] = tmp_context
    return result


def context_html(k, jq_elem):
    """ 获取特殊元素下所有子元素的 html 代码并且过滤 """
    global html_allow_tags
    tmp_context = ""
    if(k == 'context'):
        HTML_purifier = XssHtml(html_allow_tags)
        jq_elems = jq_elem.items()
        for je in jq_elems:
            tmp_context += je.html()
        HTML_purifier.feed(tmp_context)
        HTML_purifier.close()
        safe_html_context = HTML_purifier.getHtml()
        return safe_html_context
    jq_elems = jq_elem.items()
    for je in jq_elems:
        tmp_context += je.text()
    return tmp_context


def context_special_field(k, tmp_context):
    """用于处理爬虫中的特殊字段"""
    # 特殊字段：time
    if k == 'time':
        time_res = re.findall(
            r"\d{4}[-/年]{,1}\d{1,2}[-/月]{,1}\d{1,2}[日号]{,1}",
            tmp_context.replace("\n", ""))
        if len(time_res) <= 0:
                # 如果获取不到时间，则为爬取时间为准，误差不会超过一天
            print("[异常] 日期获取异常，将默认:", str(get_today()))
            tmp_context = str(get_today())
        else:
            std_time = time_res[0].replace(
                "年", "-").replace("月", "-").replace("日", "").replace("号", "").replace("/", "-")
            tmp_context = std_time
    # 特殊: title
    if k == 'title':
        tmp_context = tmp_context.strip()
        tmp_context = tmp_context.replace("\n", "")
    return str(tmp_context)


def context_must_key(result, k):
    if k in result.keys() and result[k] != "":
        return True
    return False
