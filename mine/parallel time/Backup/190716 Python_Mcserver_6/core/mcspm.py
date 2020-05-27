# -*- coding:utf-8 -*-

from threading import Thread  
import multiprocessing
import time
import sys

from core.mcservercore import MinecraftServer
from function.listener import EventListener
from function import console

class MinecraftServerProcessManager(multiprocessing.Process):
    """docstring for MinecraftServerProcessManager"""
    def __init__(self):
        multiprocessing.Process.__init__(self)
        self.command_queue_center = {}
        self.server_procss_center = {}
        self.console_queue_mask = multiprocessing.Queue()
        self.console_listener = None
        self.event_listener = EventListener()
        self.event_listener.on_listener('close',self._event_del_server)


    def create_minecraft_server(self,servername,cwd,run_command):
        ''' 创建 Minecraft 服务器'''
        self.event_listener.fire_event('open',servername,False)
        mc_server = MinecraftServer(servername,cwd,run_command)
        command_queue = mc_server.command_queue()
        if servername in self.command_queue_center.keys():
            return False
        self.command_queue_center[servername] = command_queue
        self.server_procss_center[servername] = mc_server

        mc_server.set_cosole_queue(self.console_queue_mask)
        mc_server.start()


    def send_command(self,servername,command):
        ''' 发送命令到指定服务器 '''
        if servername in self.command_queue_center.keys():
            command_queue = self.command_queue_center[servername]
            command_queue.put({
                'command' : 'exec',
                'msg' : command
                })
            return True
        return False


    def close_minecraft_server(self,servername,close_command = 'exit'):
        ''' 关闭某个 MC 服务器 '''
        if servername in self.command_queue_center.keys():
            #命令python程序启动的子Java程序退出
            self.send_command(servername,close_command)
            #命令读取线程退出
            self.command_queue_center[servername].put({
                'command' : 'exit'
                });
            #命令退出事件
            #self.server_procss_center[servername].stop_process()
            return True
        return False

    def _console_thread_loop(self):
        ''' 此线程负责写入控制台到 管理中心 的队列 '''
        while True:
            console_data = self.console_queue_mask.get();
            command_msg = console_data['command']

            #服务器控制输出信号
            if command_msg == 'console':
                self.event_listener.fire_event('console',[console_data['servername'],console_data['msg']])

            #此服务器关闭发送的信号
            if command_msg == 'close':
                self.event_listener.fire_event('close',console_data['servername'],False)


    def run(self):
        console.log(0,'装载 MinecraftServerProcessManager 模块')
        self._console_thread_loop = Thread(target=self._console_thread_loop)
        self._console_thread_loop.start()
        self._console_thread_loop.join()


    def get_event_listener(self):
        return self.event_listener;


    def _event_del_server(self,servername):
        ''' 改变服务器在线状态 '''
        try:
            del self.server_procss_center[servername] 
            del self.command_queue_center[servername] 
        except KeyError:
            pass


    def get_online_server_info(self):
        ''' 获取所有在线服务器的信息 '''
        return_dict = {}
        for servername,mcserver in self.server_procss_center.items():
            return_dict[servername] = mcserver.get_info()
        return return_dict