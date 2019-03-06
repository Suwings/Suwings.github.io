# -*- coding:utf-8 -*-
from pyquery import PyQuery as pquery
import time

news_center = []


def get_one_webstie(url, mainElem, linkElem, TimeElem):
    document = pquery(url, encoding='utf-8')
    objs = document.find(mainElem).items()
    results = []
    for v in objs:
        tmps = {}
        tmps['text'] = v.children(linkElem).text()
        tmps['href'] = v.children(linkElem).attr('href')
        tmps['time'] = v.children(TimeElem).text()
        results.append(tmps)
    return results


# news_center += get_one_webstie("http://www.gov.cn/zhengce/zuixin.htm",
#                                ".news_box>.list h4", 'a', 'span.date')
# news_center += get_one_webstie("http://www.miit.gov.cn/n1146295/n1652858/n1653018/index.html",
#                                ".clist_con li", 'a', 'span>a')
news_center += get_one_webstie("http://www.miit.gov.cn/gdnps/wjfbindex.jsp",
                               "tbody#contentBody tr", 'td>a', 'td')


# debug all news
news_count = 1
for news in news_center:
    print(str(news_count) + "." + news['text'] +
          "\n 时间 "+news['time']+" | 链接：" + news['href'])
    news_count += 1
