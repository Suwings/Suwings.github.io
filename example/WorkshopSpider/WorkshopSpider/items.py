'''
Author: Copyright(c) 2020 Suwings
Date: 2020-12-01 21:10:02
LastEditTime: 2020-12-01 22:23:55
Description: 
'''
# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class WorkshopspiderItem(scrapy.Item):
    # 必须字段
    mod_id = scrapy.Field()
    title = scrapy.Field()
    author = scrapy.Field()
    link = scrapy.Field()
    # 图片下载字段
    files = scrapy.Field()
    file_urls = scrapy.Field()
