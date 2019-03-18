# -*- coding: utf-8 -*-

import pymysql

global db_connect
global db_cursor


def init_database():
    try:
        db_connect = pymysql.connect(
            host='127.0.0.1', user='root', passwd='toortoor',
            port=3306, db='papapa', charset='utf8'
        )
    except:
        print("数据库连接失败.")
        exit(0)
    db_cursor = BD_coon.cursor()


def replite_data_insert(replite_results):
    print(replite_results)
