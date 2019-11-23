#!/bin/bash

# ${1-"12.0.0"} 如果 $1 不存在则为 "12.0.0"
# local 内置变量
get_start_version() {
    local start_version=${1-"12.0.0"}
    command_echo $start_version
}

# 2>/dev/null 指将异常输出(2)重定向到/dev/null
# $* 猜测可能是解析所有参数
command_echo() {
    command printf %s\\n "$*" 2>/dev/null
}

# 2>&1 指将异常输出(2)重定向到标准输出
command_has() {
    type "${1-}" >/dev/null 2>&1
}

# 使用$()来执行一个命令与参数组合或函数与参数组合
# 这里演示传参
command_echo "Start version is $(get_start_version "12.0.0")."


# 如果分支
# 字符串比较  尽可能用中括号表达式
if [ "$(get_start_version)" =  "12.0.0" ]; then
    echo "Verison matched!"
else
    echo "Version Not Equels"
fi

n=0

# 循环 数值比较可能需要使用 -eq -lt
while [ $n -lt 10 ]; do
    # 两种数值操作方式
    n=$(expr $n + 1)
    # let "n+=1"
    command_echo "[$(get_start_version)] Count: ${n};"
    
done

# 循环
for loop in 1 2 3 4 5
do
    echo "The value is: $loop"
done

# 分支选择
mode="D"
case $mode in
    "A")
        echo 'A mode!'
    ;;
    "B")
        echo 'B mode!'
    ;;
    "C")
        echo 'C mode!'
    ;;
    "D")
        echo 'D mode!'
    ;;
    *)
        # 通配符
        echo 'Def mode!'
    ;;
esac