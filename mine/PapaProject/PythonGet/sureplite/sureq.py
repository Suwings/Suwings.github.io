# -*- coding: utf-8 -*-


from sureplite.sufunc import reptile_resurgence_links, get_context_website, init_reptile
from sureplite.objectdao import operate_replite_data
from database import replite_database


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
        replite_results.append(res)
    # 传递到数据库层
    replite_database.replite_data_insert(replite_results)
