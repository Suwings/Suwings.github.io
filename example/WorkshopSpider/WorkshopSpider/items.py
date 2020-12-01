'''
Author: Copyright(c) 2020 Suwings
Date: 2020-12-01 21:10:02
LastEditTime: 2020-12-01 21:40:24
Description: 
'''
# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class WorkshopspiderItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    mod_id = scrapy.Field()
    title = scrapy.Field()
    author = scrapy.Field()

    files = scrapy.Field()
    file_urls = scrapy.Field()
