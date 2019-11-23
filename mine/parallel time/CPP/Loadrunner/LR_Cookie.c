Action()
{
	
	web_add_cookie("JSESSIONID=0EDD148E2369DF01E269FB45A8869817;domain=192.168.1.251");
	
	web_reg_find(
		"Text=updatePassword",
		LAST);
	
	web_url("login.do", 
		"URL=http://192.168.1.251/bsams/front/asset_user/user_info.do", 
		"Resource=0", 
		"RecContentType=text/html", 
		"Referer=", 
		"Snapshot=t20.inf", 
		"Mode=HTML", 
		LAST);

	
//	if(atoi(lr_eval_string("{fcount}")) > 0){
//		lr_output_message("存在 fcount ！！！！！！！！！！");
//	}else{
//		lr_output_message("不存在 Fcount");
//		
//	}
		

	web_concurrent_start(NULL);

	web_url("text_body_bg.jpg", 
		"URL=http://192.168.1.251/bsams/style/front/images/text_body_bg.jpg", 
		"Resource=1", 
		"RecContentType=image/jpeg", 
		"Referer=http://192.168.1.251/bsams/front/login.do", 
		"Snapshot=t21.inf", 
		LAST);

	web_url("Log_pc.png", 
		"URL=http://192.168.1.251/bsams/style/front/images/Log_pc.png", 
		"Resource=1", 
		"RecContentType=image/png", 
		"Referer=http://192.168.1.251/bsams/front/login.do", 
		"Snapshot=t22.inf", 
		LAST);

	web_url("loading.gif", 
		"URL=http://192.168.1.251/bsams/style/colorbox1.4.33/images/loading.gif", 
		"Resource=1", 
		"RecContentType=image/gif", 
		"Referer=http://192.168.1.251/bsams/front/login.do", 
		"Snapshot=t23.inf", 
		LAST);

	web_url("controls.png", 
		"URL=http://192.168.1.251/bsams/style/colorbox1.4.33/images/controls.png", 
		"Resource=1", 
		"RecContentType=image/png", 
		"Referer=http://192.168.1.251/bsams/front/login.do", 
		"Snapshot=t24.inf", 
		LAST);

	web_concurrent_end(NULL);

	lr_think_time(11);

	web_url("noinfo_bug.do", 
		"URL=http://192.168.1.251/bsams/front/noinfo_bug.do?_=1543298058033", 
		"Resource=0", 
		"RecContentType=text/html", 
		"Referer=http://192.168.1.251/bsams/front/login.do", 
		"Snapshot=t25.inf", 
		"Mode=HTML", 
		LAST);

	web_url("fontawesome-webfont.eot", 
		"URL=http://192.168.1.251/bsams/style/front/font-awesome-4.7.0/fonts/fontawesome-webfont.eot?", 
		"Resource=1", 
		"RecContentType=application/vnd.ms-fontobject", 
		"Referer=http://192.168.1.251/bsams/front/login.do", 
		"Snapshot=t26.inf", 
		LAST);

	lr_think_time(4);

	web_url("noinfo_bug.do_2", 
		"URL=http://192.168.1.251/bsams/front/noinfo_bug.do?_=1543298058034", 
		"Resource=0", 
		"RecContentType=text/html", 
		"Referer=http://192.168.1.251/bsams/front/login.do", 
		"Snapshot=t27.inf", 
		"Mode=HTML", 
		LAST);

	return 0;
}