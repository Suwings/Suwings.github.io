# -*- coding: utf-8 -*-


from sureplite.sufunc import reptile_resurgence_links, get_context_website, init_reptile
from sureplite.objectdao import operate_replite_data
from database import replite_database
from sureplite.sutools import comp_today


def reptile_select_context(news_list_url, list_elem, list_a_elem, context_config, class_list=[]):
    """通过新闻列表页面与选择新闻显示页面的元素，来自动化爬取第一页未分类的所有新闻"""
    links = reptile_resurgence_links(
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
    replite_results = []
    for link in links:
        reptile_ready = init_reptile(link)
        operate_replite_data(reptile_ready, context_config)
        print("正在请求:" + link)
        res = get_context_website(reptile_ready, context_config)
        if res is None:
            continue
        # 将新闻的日期与今天比较，如果等于或大于今天，则无需判断新闻重复
        news_time = res['time']
        if not comp_today(news_time):
            # 忽略掉小于今天的新闻
            print(res['time'] + " | 过期")
            continue
        # 如果是今天新闻，那么比较新闻标题来判断重复
        has_result = replite_database.replite_has_data(res)
        if has_result:
            print("新闻重复 | 跳过")
            continue
        # 将新闻加入结果集合
        replite_results.append(res)
    # 传递到数据库层
    replite_database.replite_data_insert(replite_results)
