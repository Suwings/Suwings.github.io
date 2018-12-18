echo "正在设置 以太网 与 WLAN 网卡的 DNS 基本."

netsh interface ipv4 set dns name="WLAN" source=static addr=223.5.5.5 register=PRIMARY
netsh interface ipv4 add dns name="WLAN" addr=223.6.6.6

netsh interface ipv4 set dns name="以太网" source=static addr=223.5.5.5 register=PRIMARY
netsh interface ipv4 add dns name="以太网" addr=223.6.6.6

echo "执行完毕，刷新DNS缓存."

ipconfig /flushdns

pause