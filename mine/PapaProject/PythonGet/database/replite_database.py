# -*- coding: utf-8 -*-

import pymysql

global db_connect
global db_cursor


def init_database():
    global db_connect
    global db_cursor
    try:
        db_connect = pymysql.connect(
            host='127.0.0.1', user='root', passwd='toortoor',
            port=3306, db='papapa', charset='utf8'
        )
    except:
        print("数据库连接失败.")
        exit(0)
    db_cursor = db_connect.cursor()


def replite_data_insert(replite_results):
    #[{'title': '测试标题', 'url': 'http://localhost/list/1.html', 'context': 'DEBUG', 'time': '1999-1-1',
    #  'first_class': '我自己的', 'replite_time': '2019-03-18', 'domain': 'localhost'},
    # {'title': '测试标题', 'url': 'http://localhost/list/2.html', 'context': 'DEBUG', 'time': '1999-1-1',
    #  'first_class': '我自己的', 'replite_time': '2019-03-18', 'domain': 'localhost'}]
    global db_connect
    global db_cursor
    for rep_v in replite_results:
        print("数据库存储:" + rep_v['title'])
        sql = "INSERT INTO `news_a1` (`id`, `title`, `domain`, `url`, `time`, `replite_time`, `first_class`, `second_class`, `third_class`, `context`) VALUES (NULL, '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s');" % (
            rep_v['title'],
            rep_v['domain'],
            rep_v['url'],
            rep_v['time'],
            rep_v['replite_time'],
            rep_v['first_class'],
            rep_v['second_class'],
            rep_v['third_class'],
            rep_v['context']
        )
        try:
            db_cursor.execute(sql)
            # 提交到数据库执行
            db_connect.commit()
        except Exception as err:
            # 如果发生错误则回滚
            db_connect.rollback()
            print(err)
