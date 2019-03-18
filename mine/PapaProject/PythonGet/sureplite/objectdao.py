# -*- coding: utf-8 -*-

from urllib.parse import urlparse
import time

# def add_replite_data_key2value(context)


def operate_replite_data(reptile, context_config):
    """ 对爬虫的Dict格式数据进行值的附加与操作 """
    url_obj = urlparse(reptile['tar_url'])
    # 对每一个数据进行附加值
    context_config['ext|replite_time'] = time.strftime(
        "%Y-%m-%d", time.localtime(time.time()))
    context_config['ext|url'] = reptile['tar_url']
    context_config['ext|domain'] = url_obj.netloc
