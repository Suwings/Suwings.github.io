import wormhole
from sys import argv
script, first_arg = argv

print("查询虫洞：", first_arg)
res = wormhole.request_wormhole_info(first_arg)
print(wormhole.wormhole_info_text(res))
