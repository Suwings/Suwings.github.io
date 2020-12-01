'''
Author: Copyright(c) 2020 Suwings
Date: 2020-12-01 18:52:39
LastEditTime: 2020-12-01 20:56:12
Description: 用于爬取方舟创意工坊的爬虫脚本
'''
import scrapy


class CreativeWorkshopSpider(scrapy.Spider):

    name = 'CreativeWorkshopSpider'
    start_urls = [
        'https://steamcommunity.com/workshop/browse/?appid=346110&p=5',
    ]

    def parse(self, response):
        for workshop_item in response.css('div.workshopItem'):
            mod_id = workshop_item.css(
                '.ugc::attr(data-publishedfileid)').get()
            title = workshop_item.css('.workshopItemTitle::text').get()
            author = workshop_item.css('.workshopItemAuthorName>a::text').get()
            image = workshop_item.css(
                '.workshopItemPreviewImage::attr(src)').get()

            # print('[命中]', "名字:", title, " 作者:", author)

            yield {
                'mod_id': mod_id,
                'title': title,
                'author': author,
                'image': image
            }

        # next_page = response.css('li.next a::attr("href")').get()
        # if next_page is not None:
        #     yield response.follow(next_page, self.parse)
