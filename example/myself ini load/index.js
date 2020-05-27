"use strict";

var fs = require('fs')

// ARK 配置专属解析器
class ARKInitializationConfig {

    // 解析INI配置
    static parse(text = "") {
        text = text.replace(/\r\n/igm, '\n');
        const lines = text.split('\n');
        const sectionRegx = /\[(.+?)\]/igm;
        const iniConfig = {};
        let nowSection = 'NULL';
        for (let v of lines) {
            // 区域配置
            if (v.search(sectionRegx) === 0) {
                nowSection = v;
                iniConfig[v] = {};
                continue;
            }
            // 普通选项
            if (v.length > 0) {
                let subSection = v.split('=');
                if (subSection.length < 2) {
                    continue;
                }
                let key = subSection[0];
                let value = subSection.slice(1, subSection.length).join('=');
                // 重复元素归纳成数组
                if (iniConfig[nowSection][key]) {
                    if (!(iniConfig[nowSection][key] instanceof Array)) {
                        iniConfig[nowSection][key] = [iniConfig[nowSection][key]];
                    }
                    iniConfig[nowSection][key].push(value);
                } else {
                    iniConfig[nowSection][key] = value;
                }
            }
        }
        return iniConfig;
    }


    static stringify(config) {
        let resultString = '';
        for (let k in config) {
            // 除第一行其他首标题全部前面加空格
            if (resultString === '') {
                resultString += k + '\n';
            } else {
                resultString += '\n' + k + '\n';
            }
            // 子选项遍历
            let subLines = config[k];
            for (let lineKey in subLines) {
                // 子选项数组遍历
                if (subLines[lineKey] instanceof Array) {
                    for (let v3 of subLines[lineKey]) {
                        resultString += lineKey + '=' + v3 + '\n';
                    }
                } else {
                    resultString += lineKey + '=' + subLines[lineKey] + '\n';
                }
            }
        }
        return resultString;
    }

}

let data = fs.readFileSync('./Game.ini', 'utf-8');

let a1 = ARKInitializationConfig.parse(data);
// console.log(a1)
console.log(ARKInitializationConfig.stringify(a1));