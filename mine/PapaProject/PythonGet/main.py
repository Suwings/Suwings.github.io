# -*- coding: utf-8 -*-

from sureplite.sureq import reptile_select_context
from database import replite_database

replite_database.init_database()

reptile_select_context(
    'http://localhost/get.html',
    ".list",
    "ul>li>a",
    {
        "title": ".center>h4",
        "time": ".time",
        "context": ".context"
    },
    ["我自己的"]
)

reptile_select_context(
    'http://www.miit.gov.cn/n1146295/n1652858/index.html',
    ".clist_con",
    "ul>li>a",
    {
        "title": ".ctitle>h1||#con_title",
        "time": ".short_r||#con_time",
        "context": ".ccontent"
    },
    ["工信部", "政策文件"]
)


reptile_select_context(
    'http://www.gov.cn/zhengce/zuixin.htm',
    ".news_box",
    "div>ul>li>h4>a",
    {
        "title": "div.article>h1||table.bd1>tbody>tr:eq(2)>td:eq(1)",
        "time": ".pages-date||table.bd1>tbody>tr:eq(3)>td:eq(3)",
        "context": "#UCAP-CONTENT"
    },
    ["中国政府", "最新动态"]
)
