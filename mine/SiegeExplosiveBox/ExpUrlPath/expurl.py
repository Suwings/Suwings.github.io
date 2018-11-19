#!/usr/bin/python
# -*- coding: utf-8 -*-
import requests
import sys

# python explore.py demo.com dict.txt

url = sys.argv[1]
dict_txt = sys.argv[2]
filter_pass_code = [302, 404]


def found_url(code, url):
    """ 过滤并且输出 """
    # Filter
    for v in filter_pass_code:
        if v == code:
            return
    # Out
    print("[", code, "]", url)


def get_req(path):
    path = path.replace("\n", "")
    site_url = url + path
    headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8'
    }
    headers = {}
    res = requests.get(site_url, headers=headers)
    code = res.status_code
    frist_code = code

    if len(res.history) > 0:
        for v in res.history:
            found_url(v.status_code, site_url)
    found_url(code, site_url)


# Read Dict
file = open(dict_txt)
while 1:
    lines = file.readlines(300000)
    if not lines:
        break
    for line in lines:
        try:
            get_req(line)
        except Exception as err:
            print("[ Error ]",  url + line)
file.close()
