import wormhole


res = wormhole.request_wormhole_info('J000102')
print(wormhole.wormhole_info_text(res))
