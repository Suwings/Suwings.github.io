# -*- coding: utf-8 -*-
import os


def onQQMessage(bot, contact, member, content):
    if content.startswith("j") or content.startswith("J"):
        wormhole_name = content
        output = os.popen('python3.4 ./worm.py '+content)
        res_text = output.read()
        bot.SendTo(contact, "测试:"+res_text)
