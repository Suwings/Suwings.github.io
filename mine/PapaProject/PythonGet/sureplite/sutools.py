# -*- coding: utf-8 -*-

import os
from urllib.parse import urlparse


def comp_http_url(base_url, tar_url):
    """ http url 整理与规范 """
    base_url_obj = urlparse(base_url)
    last_url = ""
    if tar_url[:4] in 'http':
        last_url = tar_url
    else:
        last_url = base_url_obj.scheme + "://" + base_url_obj.netloc + os.path.normpath(os.path.join(
            os.path.dirname(base_url_obj.path), tar_url)).replace("\\", "/")
    return last_url
