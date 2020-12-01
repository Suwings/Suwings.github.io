'''
Author: Copyright(c) 2020 Suwings
Date: 2020-12-01 18:52:39
LastEditTime: 2020-12-01 20:35:45
Description: 用于爬取方舟创意工坊的爬虫脚本
'''
import scrapy


class CreativeWorkshopSpider(scrapy.Spider):
    name = 'workshop'
    start_urls = [
        'http://quotes.toscrape.com/tag/humor/',
    ]

    def parse(self, response):
        for quote in response.css('div.quote'):
            yield {
                'author': quote.xpath('span/small/text()').get(),
                'text': quote.css('span.text::text').get(),
            }

        next_page = response.css('li.next a::attr("href")').get()
        if next_page is not None:
            yield response.follow(next_page, self.parse)
