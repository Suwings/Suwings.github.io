#!/usr/bin/python
# -*- coding: UTF-8 -*-

import pymysql

global DB
try:
    DB = pymysql.connect("localhost", "root", "toortoor", "EVE_coll")
except:
    print("数据库连接失败，程序停止.")
    exit(0)


def insert_now_data(id, now_time, players, typeof):
    """ 插入数据 1 代表国服 """
    cursor = DB.cursor()

    # SQL 插入语句
    if typeof == 1:
        sql = "insert into eve_players_sr values(%d,'%s',%d);" % (
            id, now_time, players)
    else:
        sql = "insert into eve_players_tq values(%d,'%s',%d);" % (
            id, now_time, players)

    try:
        cursor.execute(sql)
        # 提交到数据库执行
        DB.commit()
    except Exception as err:
        # 如果发生错误则回滚
        DB.rollback()
        print(err)

# 逻辑开始


import requests
import time
import json

callback_f = 'jQuery112305552559905082075_1539584725440'

while True:
    try:
        res = requests.get(
            "https://www.ceve-market.org/serverStatus?callback="+callback_f)
        res_data = res.text
        res_data = res_data.replace(callback_f, '')
        res_data = res_data.replace('(', '')
        res_data = res_data.replace(')', '')
        res_data = res_data.replace(';', '')

        res_obj = json.loads(res_data)

        sr_player_count = res_obj['sr']
        tq_player_count = res_obj['tq']

        now_time = time.strftime("%Y/%m/%d %H:%M:00")
        id_time = int(time.time())

        print("["+str(now_time)+"] 欧服:" + str(tq_player_count) + " | 国服:" + str(sr_player_count) +
              "\n")

        insert_now_data(id_time, now_time, sr_player_count, 1)
        insert_now_data(id_time, now_time, tq_player_count, 2)

        time.sleep(60)
    except Exception as err:
        print("错误:")
        print(err)
