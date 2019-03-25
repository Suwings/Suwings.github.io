# -*- coding: utf-8 -*-


from sureplite.sufunc import get_context_website, init_reptile
from sureplite.objectdao import operate_replite_data
from database import replite_database
from sureplite.sutools import comp_today
from sureplite.repfromlist import reptile_resurgence_links, reptile_resurgence_list

FILTER_Before_today = False


def reptile_select_context(
        news_list_url, list_elem, list_a_elem, context_config, class_list=[], is_list=False):
    """通过新闻列表页面与选择新闻显示页面的元素，来自动化爬取第一页未分类的所有新闻"""
    print("开始收集新闻列表资料:"+news_list_url)
    global FILTER_Before_today
    # 两种抓取方式
    if is_list:
        result_links = reptile_resurgence_list(
            init_reptile(news_list_url),
            list_elem[0],
            list_elem[1],
            list_elem[2],
            list_elem[3],
        )
    else:
        result_links = reptile_resurgence_links(
            news_list_url,
            1,
            list_elem,
            list_a_elem,
            res_links=[]  # BUG Note: 请小心变量重用，必须要重新声明一个新的
        )
    context_config['ext|first_class'] = context_config['ext|second_class'] = context_config['ext|third_class'] = ""
    if len(class_list) >= 1:
        context_config['ext|first_class'] = class_list[0]
    if len(class_list) >= 2:
        context_config['ext|second_class'] = class_list[1]
    if len(class_list) >= 3:
        context_config['ext|third_class'] = class_list[2]
    # 将新闻列表的每一个 URL 全部爬取一次并且筛选出正确文章
    # replite_results = []
    print("开始爬取:"+news_list_url)
    for link_obj in result_links:
        try:
            link = link_obj['href']
            # 初始化爬虫
            reptile_ready = init_reptile(link)
            operate_replite_data(reptile_ready, context_config)
            print("[正在请求]:" + link)
            res = get_context_website(
                reptile_ready, context_config, other=link_obj)
            if res is None:
                continue
            # 将新闻的日期与今天比较，如果等于或大于今天，则无需判断新闻重复
            news_time = res['time']
            if FILTER_Before_today and not comp_today(news_time):
                # 忽略掉小于今天的新闻
                print('[过期]', res['time'] + " | 过期")
                continue
            # 如果是今天新闻，那么比较新闻标题来判断重复
            has_result = replite_database.replite_has_data(res)
            if has_result:
                print("[重复] 重复数据 | 跳过")
                continue
            # 传递到数据库层
            replite_database.replite_data_insert([res])
            # 将新闻加入结果集合
        except Exception as err:
            print("[错误]:", str(err))
            raise err
            continue
    print("网站:", news_list_url, "爬取完毕")


def reptile_select_list(news_list_url, mainElem, linkElem, TimeElem, titleElem, context_config, class_list=[]):
    """利用新闻列表来获取正文和标题"""
    args = []
    args.append(mainElem)
    args.append(linkElem)
    args.append(TimeElem)
    args.append(titleElem)
    reptile_select_context(news_list_url, args, None,
                           context_config, class_list, True)


# def replite_select_all(news_list_url, list_elem, list_a_elem, context_config, class_list=[]):
#     reptile_select_context(news_list_url, list_elem,list_a_elem)
