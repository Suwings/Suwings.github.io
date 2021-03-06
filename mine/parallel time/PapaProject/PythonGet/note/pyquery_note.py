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
    
def get_one_webstie(reptile, mainElem, linkElem, TimeElem, titleElem=None):
    """仅仅用于抓取新闻标题"""
    document = reptile['document']
    objs = document.find(mainElem).items()
    results = []
    for v in objs:
        tmps = {}
        # 解析 ParseResult(scheme='http', netloc='www.chenxm.cc', path='/post/719.html', params='', query='', fragment='')
        tar_url = reptile['tar_url']
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
    if max_container == "":
        # 无差别对网页爬取
        all_tag = document.find(a_elem).items()
        for tag in all_tag:
            if callback != None:
                callback(comp_http_url(tar_url, tag.attr('href')))
            reptile_resurgence_links(
                tar_url, max_layer - 1,
                max_container="",
                a_elem=a_elem,
                res_links=res_links,
                next_url=comp_http_url(tar_url, tag.attr('href'))
            )
    else:
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
    if max_container == "":
        # 无差别对网页爬取
        all_tag = document.find(a_elem).items()
        for tag in all_tag:
            if callback != None:
                callback(comp_http_url(tar_url, tag.attr('href')))
            reptile_resurgence_links(
                tar_url, max_layer - 1,
                max_container="",
                a_elem=a_elem,
                res_links=res_links,
                next_url=comp_http_url(tar_url, tag.attr('href'))
            )
    else:
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
    只要页面匹配，即可抓取，用于文章匹配  备份
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

# print(reptile_resurgence_links(
#     "http://www.miit.gov.cn/n1146290/n1146392/index.html", 1, ".clist_con", "ul>li>a"))

# def once_req(link):
#     rep = init_reptile(link)
#     a = get_context_website(rep, {
#         "title": "div.article>h1||table.bd1>tbody>tr:eq(2)>td:eq(1)",
#         "time": ".pages-date||table.bd1>tbody>tr:eq(3)>td:eq(3)",
#         "context": "#UCAP-CONTENT"
#     })
#     print(a)
#     print("--------------------------")


# reptile_resurgence_links(
#     "http://www.gov.cn/zhengce/zuixin.htm",
#     1,
#     ".news_box",
#     "div>ul>li>h4>a",
#     callback=once_req
# )


# def once_req_1(link):
#     res = get_context_website(init_reptile(link), {
#         "title": ".ctitle>h1||#con_title",
#         "time": ".short_r||#con_time",
#         "context": ".ccontent"
#     })
#     print(res)
#     print("--------------------------")


# reptile_resurgence_links(
#     "http://www.miit.gov.cn/n1146295/n1652858/index.html",
#     1,
#     ".clist_con",
#     "ul>li>a",
#     callback=once_req_1
# )
