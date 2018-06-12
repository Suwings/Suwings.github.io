# -*- coding:utf-8 -*-
import requests
import json
import os


# 进行的目录
DO_PATH = "D:\\MINE_Pro\\MCSM_TR"
# 转换的后缀文件
DO_EXT = ["html", "js", "css", "json"]
# 文件编码
DO_CODEING = "utf8"
# 过滤的目录
FIL_DIRNAME = ["public\\"]


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


def is_allowd_dirname(real_path):
    for v in FIL_DIRNAME:
        if v == "":
            continue
        if v in real_path:
            return False
    return True


def callback(real_path):
    if os.path.isfile(real_path):
        if not is_allowd_dirname(real_path):
            print("PASS_PARH:", real_path)
            return
        try:
            extend_name = real_path.split('.')[1]
        except Exception:
            extend_name = "__None__"
            pass
        if not extend_name in DO_EXT:
            # is Not allow extend name.
            return
        with open(real_path, 'r', encoding=DO_CODEING) as f:
            text = f.read()
            res_str = req_simplified_to_traditional(text)
        write_all_to_file(real_path, res_str)
    else:
        print("DO_PATH:", real_path, "is Not File.")


if __name__ == '__main__':
    dirTree(DO_PATH, callback)
