Action()
{
    //保存字符串 企图搜索的产品id
    lr_save_string("12_S03_0009290", "mid");

    //格式化字符串，并且存储参数
    lr_param_sprintf("mine_ok_r",
                     "RegExp=showAssetBorrow\\('(.*)'\\)\">[\\s\\S]{0,17}</a></td>[\\s\\S]{0,14}<td>%s</td>",
                     lr_eval_string("{mid}"));

    //输出
    lr_output_message(lr_eval_string("正则表达式是：{mine_ok_r}"));

    //正则匹配
    web_reg_save_param_regexp(
        "ParamName=test1",
        lr_eval_string("{mine_ok_r}"), //正则表达式
        "Ordinal=1",
        SEARCH_FILTERS,
        LAST);

    //请求并且匹配
    web_url("lr_reg_test.html",
            "URL=http://127.0.0.1/lr_reg_test.html",
            "Resource=0",
            "RecContentType=text/html",
            "Referer=",
            "Snapshot=t1.inf",
            "Mode=HTML",
            LAST);

    lr_output_message(lr_eval_string("我们知道ID {mid} 他对应的id是: {test1}"));

    return 0;
}

//预期输入
//<td><a href="javascript:;" onclick="javascript:showAssetBorrow('104')">JY20181207150112</a></td>
//<td>12_S03_0009289</td>
//其中 	JY20181207150112 我们不知道，只知道 12_S03_0009289 值，我们需要这个列表的 104 序号代码.

//实际输出
//Action.c(18): 正则表达式是：RegExp=showAssetBorrow\('(.*)'\)">[\s\S]{0,17}</a></td>[\s\S]{0,14}<td>12_S03_0009289</td>
//Action.c(21): web_reg_save_param_regexp started  	[MsgId: MMSG-26355]
//Action.c(21): Registering web_reg_save_param_regexp was successful  	[MsgId: MMSG-26390]
//Action.c(29): web_url("lr_reg_test.html") started  	[MsgId: MMSG-26355]
//Action.c(29): web_url("lr_reg_test.html") was successful, 701 body bytes, 350 header bytes  	[MsgId: MMSG-26386]
//Action.c(38): 我们知道ID 12_S03_0009289 他对应的id是: 104