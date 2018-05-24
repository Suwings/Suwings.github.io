# -*- coding:utf-8 -*-


from threading import Thread  
import multiprocessing
import time
import subprocess 
import sys

from function import console


class MinecraftServerProcess(multiprocessing.Process):
    ''' MinecraftServerProcess '''
    def __init__(self,servername,cwd,run_command):
        multiprocessing.Process.__init__(self)
        self.servername = servername
        self.console_queue = None
        self.subproc = None
        self.run_command = run_command
        self.console_code = 'gbk'
        self.subexit = False
        self.cwd = cwd


    def command_queue(self):
        ''' 
        服务器进程 通信获取 
        通过这个来管理中心可以自由的压入任务到队列，其中的一个线程会进行处理
        '''
        self.command_queue = multiprocessing.Queue()
        return self.command_queue


    def set_cosole_queue(self,queue):
        self.console_queue = queue


    def _command_thread_loop(self):
        ''' 此线程负责读入命令 管理中心 发来的命令 '''
        while self.subexit == False:
            command = self.command_queue.get()
            if command['command'] == 'exec':
                subproc_command = command['msg'] + '\r\n'
                self.subproc.stdin.write(subproc_command.encode(self.console_code))  
                self.subproc.stdin.flush()

            if command['command'] == 'exit':
                self.subexit = True
                break
        console.log(-1,'[',self.servername,'] 服务器 command_thread_loop 线程回收')


    def _console_thread_loop(self):
        ''' 此线程负责写入控制台到 管理中心 的队列 '''
        while self.subexit == False:
            #读取 Minecraft 子进程 stdout
            output = self.subproc.stdout.readline()
            output = output.decode(self.console_code) 
            #output = output.strip('\n').strip('\r\n')
            if not output:  
                self.subexit = True
                self.command_queue.put({'command':'exit'})
                break
            if output != '' or len(output) > 1:
                self.console_queue.put({
                    'servername' : self.servername,
                    'command'    : 'console',
                    'msg'        : output
                })

        console.log(-1,'[',self.servername,'] 服务器 console_thread_loop 线程回收')


    def run(self):
        console.log(-1,'[',self.servername,'] 服务器 MinecraftServerProcess 进程开启')
        #创建命令读取线程
        self.subproc = subprocess.Popen(
            self.run_command,
            cwd = self.cwd,
            stdin=subprocess.PIPE,stdout=subprocess.PIPE,stderr = subprocess.PIPE,
            shell=True
            )
        self._command_thread_loop = Thread(target=self._command_thread_loop)
        self._console_thread_loop = Thread(target=self._console_thread_loop)
        self._command_thread_loop.start()
        self._console_thread_loop.start()
        self._console_thread_loop.join()
        self._command_thread_loop.join()
        self._server_exit_event() 
        console.log(-1,'[',self.servername,'] 服务器 MinecraftServerProcess 进程回收')
        # exit(0)


    def _server_exit_event(self):
        self.console_queue.put({
                    'servername' : self.servername,
                    'command'    : 'close',
                })




class MinecraftServer(MinecraftServerProcess):
    ''' MinecraftServerProcess '''
    def __init__(self,servername,cwd,run_command,premssion_dict={}):
        super().__init__(servername,cwd,run_command)
        self.start_time = time.time()
        self.start_time_str = time.strftime('%Y-%m-%d %H:%M:%I',time.localtime(self.start_time))
        self._permission = premssion_dict


    def get_run_time(self):
        now = time.time()
        all_time = now - self.start_time
        return round(all_time)
        #return time.strftime('%Y-%m-%d %H:%M:%I',time.localtime(all_time))


    def get_start_time_str(self):
        return self.start_time_str


    def edit_user_premssion(self,username,premssion_dict):
        '''
        premssion_dict
        {'PlayerName':{
            'view' : True ,     #查看服务器界面权限
            'command' : True,   #向服务器发送命令权限
            'button' : True,      #控制服务器开关 开启 关闭 重启 强制 权限
        }}
        '''
        self._permission[username] = premssion_dict


    def get_info(self):
        ''' 获取这个 Minecraft 服务器的所有显示信息 '''
        return {
            'servername' : self.servername,
            'start_time' : self.start_time_str,
            'run_time'   : self.get_run_time(),
            'cwd'        : self.cwd,
            'subexit'    : self.subexit,
            'run_command': self.run_command,
            'permission' : self._permission
        }
        
        



        