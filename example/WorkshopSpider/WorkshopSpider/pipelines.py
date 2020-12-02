'''
Author: Copyright(c) 2020 Suwings
Date: 2020-12-01 21:10:02
LastEditTime: 2020-12-02 14:02:08
Description: 
'''
# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter


class WorkshopspiderPipeline:
    def process_item(self, item, spider):
        # print("[命中]", item)
        return item
