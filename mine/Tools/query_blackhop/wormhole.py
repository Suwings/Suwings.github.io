import requests
import json

baseUrl = 'http://2.venuswormhole.sinaapp.com/'


def request_wormhole_info(solarID):
    '''请求虫洞信息'''
    global baseUrl
    headers = {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
               'X-Requested-With': 'XMLHttpRequest',
               'Referer': baseUrl}
    r = requests.get(
        baseUrl+'PHP/Search.php?type=1&solar='+solarID,
        headers=headers)
    res = r.json()
    return wormhole_info_oper(res)


def wormhole_info_oper(wormhole_json):
    '''对 json 格式的虫洞信息进行处理 '''
    for (k, v) in wormhole_json.items():
        if k == 'holes':
            holes = wormhole_json['holes']
            for v in holes:
                dst_wormhole_number = v['dst']
                if dst_wormhole_number == '9':
                    v['dst'] = '零零地区'
                if dst_wormhole_number == '8':
                    v['dst'] = '低安地区'
                if dst_wormhole_number == '7':
                    v['dst'] = '高安地区'
                if dst_wormhole_number == '6':
                    v['dst'] = '六级空间'
                if dst_wormhole_number == '5':
                    v['dst'] = '五级空间'
                if dst_wormhole_number == '4':
                    v['dst'] = '四级空间'
                if dst_wormhole_number == '3':
                    v['dst'] = '三级空间'
                if dst_wormhole_number == '2':
                    v['dst'] = '二级空间'
                if dst_wormhole_number == '1':
                    v['dst'] = '一级空间'

        if k == 'level':
            level = wormhole_json['level']
            if level == '13':
                wormhole_json['level'] = "小型舰船"
            if level == '14':
                wormhole_json['level'] = "中型舰船"
            if level == '15':
                wormhole_json['level'] = "大型舰船"
    return wormhole_json


def wormhole_info_text(wormhole_json):
    '''
    对虫洞信息文本化
    需要列举模板：
    虫洞信息:
    编号 J00000 等级6
    天象 激变变星
    ----属性----
    甲自修量:-50% 护盾自修量:-50% 装甲遥修量:+100% 护盾遥修量:+100% 电容总量:+100% 回电时间:+50% 电容传输量:-50%
    ----链接----
    V911 漫游洞 零零地区
    V911 漫游洞 零零地区
    V911 漫游洞 零零地区
    -----资源---
    普通边域矿床
    --------
    '''
    template = '虫洞 ' + wormhole_json['name'] + ' | '
    template = template + ' ' + wormhole_json['level'] + '级虫洞\n'

    template += '天象: '+wormhole_json['anomaly']+'\n'

    template = template + '---影响---\n'
    for v in wormhole_json['bonus'].split(" ")[1:]:
        template += v+'\n'

    template = template + '---联路---\n'
    for wormhole in wormhole_json['holes']:
        template += wormhole['name']+' ' + \
            wormhole['type'] + '洞 ' + wormhole['dst'] + '\n'

    template = template + '\n详细信息:\n'+'http://2.venuswormhole.sinaapp.com/#panel-search/solar/' + \
        wormhole_json['name']

    #template = template + '-'*5
    return template


# QQ机器人
def onQQMessage(bot, contact, member, content):
    if content.startswith("j") or content.startswith("J"):
        wormhole_name = content
        res = wormhole.request_wormhole_info(wormhole_name)
        text = wormhole.wormhole_info_text(res)
        bot.SendTo(contact, text)
