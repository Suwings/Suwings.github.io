# -*- coding: utf-8 -*-

from database import replite_database
from sureplite.sureq import reptile_select_context, reptile_select_list

replite_database.init_database()

# reptile_select_context(
#     'http://localhost/get.html',
#     ".list",
#     "ul>li>a",
#     {
#         "title": ".center>h4",
#         "time": ".time",
#         "context": ".context"
#     },
#     ["我自己的"]
# )

# reptile_select_context(
#     'http://www.miit.gov.cn/n1146295/n1652858/index.html',
#     ".clist_con",
#     "ul>li>a",
#     {
#         "title": ".ctitle>h1||#con_title",
#         "time": ".short_r||#con_time",
#         "context": ".ccontent"
#     },
#     ["工信部", "政策文件"]
# )


# reptile_select_context(
#     'http://www.gov.cn/zhengce/zuixin.htm',
#     ".news_box",
#     "div>ul>li>h4>a",
#     {
#         "title": "div.article>h1||table.bd1>tbody>tr:eq(2)>td:eq(1)",
#         "time": ".pages-date||table.bd1>tbody>tr:eq(3)>td:eq(3)",
#         "context": "#UCAP-CONTENT"
#     },
#     ["政府门户", "最新动态"]
# )

# reptile_select_context(
#     'http://www.mod.gov.cn/regulatory/node_47883.htm',
#     "#main-news-list",
#     "li>a",
#     {
#         "title": ".article-header>h1",
#         "time": ".info",
#         "context": "#article-content"
#     },
#     ["国防部", "文件"]
# )
# reptile_select_context(
#     'http://www.mod.gov.cn/regulatory/node_47882.htm',
#     "#main-news-list",
#     "li>a",
#     {
#         "title": ".article-header>h1",
#         "time": ".info",
#         "context": "#article-content"
#     },
#     ["国防部", "国际公约"]
# )

# reptile_select_context(
#     'http://www.mofcom.gov.cn/article/b/',
#     ".u-newsList01",
#     "li>a",
#     {
#         "title": "#artitle",
#         "time": "#arsource",
#         "context": "#zoom"
#     },
#     ["商务部", "政策|贸易"]
# )


reptile_select_list(
    'http://www.ndrc.gov.cn/zcfb/zcfbgg/',
    'li.li',
    'a',
    '.date',
    None,
    {
        "title": "p>strong>font",
        "time": "",
        "context": "#zoom"
    },
    ["发改委", "公告"]
)
