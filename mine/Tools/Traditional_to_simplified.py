# -*- coding:utf-8 -*-
import requests
import json
import os


DO_PATH = "D:\\MINE_Pro\\MCSM繁体"
DO_EXT = ["html", "js"]
DO_CODEING = "utf8"


def req_simplified_to_traditional(text):
    payload = {'operate': 'zh-tw',
               'code': text}
    r = requests.post("https://tool.lu/zhconvert/ajax.html", data=payload)

    objs = json.loads(r.text, encoding=DO_CODEING)
    return objs['text']


def write_all_to_file(path, text):
    with open(path, 'w', encoding=DO_CODEING) as f:
        f.write(text)
        print("WRITE FILE:", path, "OK.")


def dirTree(path, funback):
    # 将os.walk在元素中提取的值，分别放到 root（根目录），dirs（目录名），files（文件名）中。
    for root, dirs, files in os.walk(path):
        for file in files:
            funback(os.path.join(root, file))  # 根目录与文件名组合，形成绝对路径。


def callback(real_path):
    if os.path.isfile(real_path):
        try:
            extend_name = real_path.split('.')[1]
        except Exception:
            extend_name = ""
            pass
        if not extend_name in DO_EXT:
            # print("DO_PATH:", real_path, "is Not allow extend name.")
            return
        with open(real_path, 'r', encoding=DO_CODEING) as f:
            text = f.read()
            res_str = req_simplified_to_traditional(text)
            write_all_to_file(real_path, res_str)
            # print(res_str)
    else:
        print("DO_PATH:", real_path, "is Not File.")


if __name__ == '__main__':
    dirTree(DO_PATH, callback)
