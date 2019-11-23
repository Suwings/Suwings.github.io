#!/bin/bash
echo "Hello! This is mineself Linux Bash"

[ $(id -u) != "0" ] && { 
    echo "Error: You must be root to run this script"; 
    exit 1; 
}

frist_var="FRIST_VAR"
echo "Hello: ${frist_var}"

echo "Shell 传递参数实例--";
echo "执行的文件名：$0";
echo "第一个参数为：$1";
echo "第二个参数为：$2";
echo "第三个参数为：$3";


#数组
# COLOR=("red" "green" "yellow" "blue" [5]="orange")
# echo "ARR is : ${COLOR[0]} + ${COLOR[1]} + ${COLOR[2]}"

# 基础计算
var1=`expr 1 + 1`   #单引号
var2=`expr 1 + $var1`
echo "VAR2 is: $var2"

# 注意空格
if [ $var1 -lt 100 ]
then
    echo "$var2 Less than 100"
else
    echo "$var2 > 100"
fi


if test 1 -lt 2
then
    echo "test 1 -lt 2"
else
    echo "else !!"
fi

demoFun(){
    echo "这是我的第一个 shell 函数!"
    return 1
}
echo "-----函数开始执行-----"
demoFun
echo "-----函数执行完毕-----"


commandExists(){
    # echo "EEEEEEEEE"
    if command -v $1 >/dev/null 2>&1; then 
        echo 1
        return 1
    else 
        echo -1
        return -1 
    fi
}

res=`commandExists "apt"`
echo "结果: $res |"
