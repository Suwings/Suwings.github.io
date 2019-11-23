# -*- coding:utf-8 -*-

import time
import sys

from core.mcspm import MinecraftServerProcessManager
from function import console


def main_console_event(servername, data):
    console.log(None, servername+' >>> '+data)


def main_server_close_event(servername):
    console.log(0, '[', servername, '] ----- 服务器关闭指令完毕 -----')


def main_server_open_event(servername):
    console.log(0, '[', servername, '] ----- 服务器执行开启指令 -----')


if __name__ == '__main__':
    MSPM = MinecraftServerProcessManager()
    # MSPM.set_console_listener(main_console_event)
    # MSPM.set_server_close_listener(main_server_close_event)
    MSPM.get_event_listener().on_listener('console', main_console_event)
    MSPM.get_event_listener().on_listener('close', main_server_close_event)
    MSPM.get_event_listener().on_listener('open', main_server_open_event)

    MSPM.start()
    MSPM.create_minecraft_server(
        '测试服务器一', './jar/', ' java -Djline.terminal=jline.UnsupportedTerminal -jar A.jar')
    # MSPM.create_minecraft_server('测试服务器二','./','cmd.exe')
    # MSPM.create_minecraft_server('测试服务器三','./','cmd.exe')
    # MSPM.create_minecraft_server('测试服务器四','./','cmd.exe')
    # time.sleep(3)
    # print(MSPM.get_online_server_info())
    time.sleep(10)

    MSPM.send_command('测试服务器一', 'list')
    time.sleep(3)
    MSPM.send_command('测试服务器一', 'stop')
    # MSPM.send_command('测试服务器二','ping www.baidu.com')
    # MSPM.send_command('测试服务器二','exit')

    # time.sleep(3)
    # #MSPM.close_minecraft_server('测试服务器一','exit')
    # time.sleep(3)
    # MSPM.close_minecraft_server('测试服务器三','exit')
    '''
    for i in range(0,1000):
        MSPM.send_command('11111','echo 你好时间')
        MSPM.send_command('22222','ping www.baidu.com')
        MSPM.send_command('33333','ping qq.com')
        #MSPM.send_command('77777777777777','send_command' + str(i))
        #MSPM.send_command('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD','send_command' + str(i-1))
        time.sleep(0.2)
    '''
