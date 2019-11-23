# -*- coding: utf-8 -*-

import requests
import os

IMG_DOWNLOAD_DIR = "D:\\MINE_Pro\\Suwings.github.io\\mine\\PapaProject\\PythonGet\\article_img\\%s"


def file_extension(path):
    return os.path.splitext(path)[1]


def download_img(url, netloc, filename):
    print("下载图片:" + url)
    ext_file_name = file_extension(url)
    response = requests.get(url)
    img = response.content
    real_file_path = os.path.normpath(
        IMG_DOWNLOAD_DIR % ("/" + netloc + "/" + filename + ext_file_name)
    )
    save_dir = IMG_DOWNLOAD_DIR % (netloc+"/")
    if not os.path.exists(save_dir):
        os.makedirs(save_dir)
    with open(real_file_path, 'wb') as f:
        f.write(img)
    return "./article_img/" + netloc + "/" + filename + ext_file_name
