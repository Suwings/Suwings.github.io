Action()
{

	web_reg_save_param("leon","LB=javascript:popAlert('请您联系平台管理人员或相关负责老师更新密码。');\">","RB=</a>",LAST); 	
//	web_reg_save_param("参数名”,"LB=左边界”,"RB=右边界","Ord=All",LAST);
//	当参数有多个值时，加上"Ord=All”后可获取所有的数值。注册成功后，{参数名_count}表示取得的数值个数，{参数名_1}为第一个数值，{参数名_2}为第二个数值。
	
	web_url("login.do", 
		"URL=http://192.168.1.251/ceshi/front/login.do", 
		"Resource=0", 
		"RecContentType=text/html", 
		"Referer=", 
		"Snapshot=t1.inf", 
		"Mode=HTML", 
		LAST);
	                   

	lr_message("Value is %s",lr_eval_string("{leon}"));

	return 0;
}