Linux 备忘录
---------

> 万物皆文件，文件生四象，四象生两仪(I/O)，两仪生八卦。

- 一般
    - /etc/rc.local 开机即可运行
    - /etc/profile 此文件为系统的每个用户设置环境信息,当用户第一次登录时,该文件被执行.并从/etc/profile.d目录的配置文件中搜集shell的设置.
    - /etc/bashrc 为每一个运行bash shell的用户执行此文件.当bash shell被打开时,该文件被读取.
    - ~/.bash_profile 每个用户都可使用该文件输入专用于自己使用的shell信息,当用户登录时,该文件仅仅执行一次!默认情况下,设置一些环境变量,执行用户的.bashrc文件
    - ~/.bashrc 该文件包含专用于你的bash shell的bash信息,当登录时以及每次打开新的shell时,该该文件被读取.
    - ~/.bash_logout 当每次退出系统(退出bash shell)时,行该文件.
    - /etc/profile 中设定的变量(全局)的可以作用于任何用户,而~/.bashrc等中设定的变量(局部)只能继承/etc/profile中的变量,他们是"父子"关系.
    - Linux设备文件 /dev目录里
    - 保存硬件和驱动程序数据的文件 /proc目录里

- 网络
    - 建立网络接口的脚本 /sbin/ifup
    - 保存网络配置数据文件的目录 /etc/network、/etc/sysconfig/network和/etc/sysconfig/network-scripts
    - 保存解析DNS服务的文件 /etc/resolv.conf
    - DHCP客户端的配置文件 /etc/dhclient.conf
    - DHCP 服务程序配置文件 /etc/dhcpd.conf
    - BIND 服务程序配置文件 /etc/named.conf 和/var/named/
    - NTP 服务程序配置文件 /etc/ntp.conf
    - Host 文件 /etc/host.conf
    

- 文件系统
    - 文件系统表 /etc/fstab
    - 软驱装配点 /floppy 、/mnt/floppy 或/media/floppy
    - 光驱装配点 /cdrom 、/mnt/cdrom 或/media/cdrom