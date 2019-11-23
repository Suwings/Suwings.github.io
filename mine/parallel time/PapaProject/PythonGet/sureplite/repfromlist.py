# -*- coding: utf-8 -*-
from urllib.parse import urlparse
import os
from sureplite.sutools import comp_http_url
from sureplite.sureq import init_reptile


def reptile_resurgence_list(reptile, mainElem, linkElem, TimeElem, titleElem=None):
    """仅仅用于抓取新闻标题 |  从新闻标题来获取时间和标题，然后返回链接从而得到正文"""
    document = reptile['document']
    objs = document.find(mainElem).items()
    results = []
    for v in objs:
        tmps = {}
        # 解析 ParseResult(scheme='http', netloc='www.chenxm.cc', path='/post/719.html', params='', query='', fragment='')
        tar_url = reptile['tar_url']
        tar_url_obj = urlparse(tar_url)
        # 标题
        if titleElem is None:
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
        # tmps['time'] = v.children(TimeElem).text()
        # 原始URL
        # tmps['original_url'] = tar_url
        # 数据库中的 URL 是解析完成的 URL
        # tmps['url'] = os.path.normpath(tar_url_obj.path)
        # 主机名
        # tmps['netloc'] = tar_url_obj.netloc
        results.append(tmps)
    return results


def reptile_resurgence_links(
        tar_url, max_layer, max_container="", a_elem="a", res_links=[],
        next_url="", callback=None):
    """
    爬虫层次挖掘，对目标 URL 进行多层挖链接
    参数：目标 URL | 最大层数 | 爬取范围 | 爬取的a标签选择器 | 内部使用，返回列表 | 内部使用 下一个目标
    """
    if next_url != "" and next_url[:4] in 'http':
        result = {}
        result['href'] = next_url
        res_links.append(result)
    if max_layer <= 0:
        return res_links
    rep = init_reptile(tar_url)
    document = rep['document']
    if max_container != '':
        # 专注于某一区域对网页爬虫 推荐这种方法只爬一层
        container_tags = document.find(max_container).items()
        for tag1 in container_tags:
            children_tags = tag1.children(a_elem).items()
            for tag2 in children_tags:
                # 可以在这里增加 callback 有效减少请求次数
                if callback is not None:
                    callback(comp_http_url(tar_url, tag2.attr('href')))
                reptile_resurgence_links(
                    tar_url, max_layer - 1,
                    max_container=max_container,
                    res_links=res_links,
                    next_url=comp_http_url(tar_url, tag2.attr('href'))
                )
    else:
        # 针对全部 a 标题
        a_tags = document.find(a_elem).items()
        for tag1 in a_tags:
            if callback is not None:
                callback(comp_http_url(tar_url, tag1.attr('href')))
            reptile_resurgence_links(
                tar_url, max_layer - 1,
                max_container="",
                res_links=res_links,
                next_url=comp_http_url(tar_url, tag1.attr('href'))
            )
    # 爬取之后将会获得每一个链接
    return res_links
