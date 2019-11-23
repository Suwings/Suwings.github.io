# -*- coding:utf-8 -*-

import sys

def log(level=None,*args):
    text = ''     
    if level == -1:
        text = '[调试]'
    if level == 0:
        text = '[事件]'
    if level == 1:
        text = '[报告]'
    if level == 2:
        text = '[警告]'
    if level == 3:
        text = '[异常]'
    if level == 4:
        text = '[错误]'
    if level == 5:
        text = '[致命]'
    if level == None:
        text = '>>>'

    for msg in args[:]:
        text = text + ' ' + msg

    #控制台输出
    if level == None:
        sys.stdout.write(text)
        return 
    print(text)
