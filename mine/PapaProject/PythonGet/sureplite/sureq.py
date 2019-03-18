# -*- coding: utf-8 -*-

import os
import re
import time

import requests
from pyquery import PyQuery as pquery

from sureplite.sufunc import reptile_resurgence_links, get_context_website, init_reptile


def reptile_select_context(news_list_url, list_elem, list_a_elem, context_config, class_list=[]):
    """通过新闻列表页面与选择新闻显示页面的元素，来自动化爬取第一页未分类的所有新闻"""
    links = reptile_resurgence_links(
        news_list_url,
        1,
        list_elem,
        list_a_elem,
        res_links=[]  # BUG Note: 请小心变量重用，必须要重新声明一个新的
    )
    if len(class_list) >= 1:
        context_config['ext|first_class'] = class_list[0]
    if len(class_list) >= 2:
        context_config['ext|second_class'] = class_list[1]
    if len(class_list) >= 3:
        context_config['ext|third_class'] = class_list[2]
    for link in links:
        res = get_context_website(init_reptile(link), context_config)
        print(res)
