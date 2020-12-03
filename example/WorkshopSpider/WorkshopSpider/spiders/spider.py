'''
Author: Copyright(c) 2020 Suwings
Date: 2020-12-01 18:52:39
LastEditTime: 2020-12-03 15:59:03
Description: 用于爬取方舟创意工坊的爬虫脚本
'''
import scrapy
from WorkshopSpider.items import WorkshopspiderItem


class CreativeWorkshopSpider(scrapy.Spider):

    name = 'CreativeWorkshopSpider'
    start_urls = [
        'https://steamcommunity.com/workshop/browse/?appid=346110&p=1&actualsort=totaluniquesubscribers&browsesort=totaluniquesubscribers',
    ]

    def parse(self, response):
        # 循环所有创意工坊 MOD 项目
        for workshop_item in response.css('div.workshopItem'):
            # 对应的网页元素
            mod_id = workshop_item.css(
                '.ugc::attr(data-publishedfileid)').get()
            title = workshop_item.css('.workshopItemTitle::text').get()
            author = workshop_item.css('.workshopItemAuthorName>a::text').get()
            link = workshop_item.css('.ugc::attr(href)').get()
            image = workshop_item.css(
                '.workshopItemPreviewImage::attr(src)').get()
            # 图片自动加入后缀
            image = image+".png"

            # 数据序列化后传给管道
            result_data = WorkshopspiderItem(
                mod_id=int(mod_id),
                title=str(title),
                author=str(author),
                link=str(link),
                file_urls=[image],
                files=[]
            )

            yield result_data

        # 下一页
        page_btn = response.css('.pagebtn::attr(href)').getall()
        next_link = page_btn[len(page_btn)-1]

        print("下一页:"+str(next_link))
        if next_link is not None:
            self.log("下一页:"+next_link)
            yield response.follow(next_link, self.parse)
