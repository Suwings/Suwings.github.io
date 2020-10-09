#!/bin/bash

node_install_path="/opt/node-v12.16.1-linux-x64/"

echo "Start to install MCSManager...\n\n"
mkdir -p ${node_install_path}
cd ${node_install_path}
sleep 3

# node
wget https://npm.taobao.org/mirrors/node/v12.16.1/node-v12.16.1-linux-x64.tar.gz

# Unpack
echo "Unpacking..."
tar -zxf node-v12.16.1-linux-x64.tar.gz
rm -rf node-v12.16.1-linux-x64.tar.gz
echo "complete."

sleep 1

echo "Linking..."
rm -rf /usr/bin/node /usr/bin/npm
ln -s ${node_install_path}/node-v12.16.1-linux-x64/bin/node /usr/bin/node
ln -s ${node_install_path}/node-v12.16.1-linux-x64/bin/npm /usr/bin/npm
echo "complete."

sleep 1

echo "--------------- Version ---------------"
node_version=`node -v`
npm_version=`npm -v`
echo " node: ${node_version}"
echo " npm: ${npm_version}"
echo "--------------- Version---------------"

sleep 3

echo "Download MCSManager...";
# Use Gitee
git clone https://gitee.com/Suwingser/MCSManager.git
cd MCSManager

sleep 3

echo "Start to install dependent libraries..."
npm install

echo "--------------- complete ---------------"
echo " Successfully installed!"
echo "--------------- complete ---------------\n"

sleep 3
npm start
