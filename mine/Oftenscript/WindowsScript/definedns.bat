echo "�������� ��̫�� �� WLAN ������ DNS ����."

netsh interface ipv4 set dns name="WLAN" source=static addr=223.5.5.5 register=PRIMARY
netsh interface ipv4 add dns name="WLAN" addr=223.6.6.6

netsh interface ipv4 set dns name="��̫��" source=static addr=223.5.5.5 register=PRIMARY
netsh interface ipv4 add dns name="��̫��" addr=223.6.6.6

echo "ִ����ϣ�ˢ��DNS����."

ipconfig /flushdns

pause