Action()
{

	//<!--验证码是 R4U9xo56a-->
	web_reg_save_param("name",
		"LB=<!--验证码是 ",
		"RB=-->",
		LAST);
	
	web_url("lei_post1.html", 
		"URL=http://192.168.1.251/lei_post1.html", 
		"Resource=0", 
		"RecContentType=text/html", 
		"Referer=", 
		"Snapshot=t1.inf", 
		"Mode=HTML", 
		LAST);
	

	lr_output_message(lr_eval_string("{name}"));


web_reg_save_param("web",
		"LB=",
		"RB=",
		LAST);
	
	
	web_custom_request("web_custom_request",
		"URL=http://192.168.1.127/postm_demo/post.php",
		"Method=POST",
		"TargetFrame=",
		"Resource=0",
		"Referer=",
		"Body=post={name},user=aaa",
		LAST);
	
	
	lr_output_message(lr_eval_string("{web}"));


	return 0;
}