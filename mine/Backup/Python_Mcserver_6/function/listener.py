

class EventListener(object):
    """ 事件观察者基础模型 """
    def __init__(self):
        self._event_mask = {}


    def on_listener(self,event,callback):
        ''' 监听一个事件 '''
        if event in self._event_mask.keys():
            self._event_mask[event].append(callback)
        else:
            self._event_mask[event] = [callback]


    def fire_event(self,event,msg,is_list_par=True):
        ''' 发送一个事件 '''
        if event in self._event_mask.keys():
            for callback in self._event_mask[event]:
                if isinstance (msg,list) and is_list_par:
                    callback(*msg)
                else:
                    callback(msg)
            return True
        return False
        