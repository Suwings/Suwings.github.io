Docker 应用 (1)
---------

运行 Docker 容器
```bash
docker run -i -t -d -p 24444:24444 mcsm/m /bin/bash
docker exec -it containerID /bin/bash
```
> -d 守护状态   -i 即使没有附加也保持STDIN 打开   -t 分配一个伪终端

中文乱码问题
> ENV LANG C.UTF-8

简单的 Dockerfile
```bash
FROM node:latest
RUN echo "deb http://http.debian.net/debian jessie-backports main" > /etc/apt/sources.list.d/jessie-backports.list
RUN apt-get update && apt-get install -t jessie-backports openjdk-8-jdk -y
WORKDIR /opt
RUN git clone https://github.com/Suwings/MCSManager.git
WORKDIR /opt/MCSManager
RUN npm install --production
EXPOSE 23333
EXPOSE 10021
CMD npm start
```
> CMD 则只准有一个，默认启动执行。
> 但是可以 docker run xxx/xxx COMMAND 来执行其他


制作 Docker
> docker build -t mcsm/m

Pull
> docker pull xxx/xxx

Commit
> docker commit c3f279d17e0a  SvenDowideit/testimage:version3

See Images:
> docker images 




