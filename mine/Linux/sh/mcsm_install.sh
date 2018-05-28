#!/bin/bash
echo "Installing ...."

INSTALL_APT=""

[ $(id -u) != "0" ] && { 
    echo "[ Root ]Error: You must be root to run this script"; 
    exit 1; 
}

install_soft(){
    if [ ${INSTALL_APT} = "apt" ]; then
        sudo apt-get $2 $1 -y
    fi
    if [ ${INSTALL_APT} = "yum" ]; then
        sudo yum $2 $1 -y
    fi
}

commandExists() {
    if command -v $1 >/dev/null 2>&1; then 
        echo 1
    else 
        echo -1
    fi
    return 0
}

# Is yum or apt
if [ `commandExists "apt"` -eq 1 ] ; then
    INSTALL_APT="apt"
fi
if [ `commandExists "yum"` -eq 1 ] ; then
    INSTALL_APT="yum"
fi

echo "Package manager commande is ${INSTALL_APT}"


# Clone
res=`commandExists "git"`
if [ $res -eq 1 ] ; then
    echo "Run git clone https://github.com/Suwings/MCSManager.git"
    git clone https://github.com/Suwings/MCSManager.git 
else
    echo "Git not found"
    install_soft "git" "install"
fi

# install nodejs
echo "\nInstall Nodejs"
curl -sL https://deb.nodesource.com/setup_9.x -o nodesource_setup.sh
bash nodesource_setup.sh

echo "Running ${INSTALL_APT} install nodejs -y.....\n"
install_soft "nodejs" "install"

# Show Nodejs Version
sudo node -v

# npm install
cd MCSManager/
sudo npm install
echo "MCSM Installed!"