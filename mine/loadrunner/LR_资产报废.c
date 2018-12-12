Action()
{

	web_url("user_info.do", 
		"URL=http://192.168.1.251/bsams/front/asset_user/user_info.do", 
		"Resource=0", 
		"RecContentType=text/html", 
		"Referer=", 
		"Snapshot=t20.inf", 
		"Mode=HTML", 
		LAST);
	
	web_link("资产报废", 
		"Text=资产报废", 
		"Snapshot=t48.inf", 
		LAST);

	web_url("asset_scrap_new.do", 
		"URL=http://192.168.1.251/bsams/front/asset_scrap/asset_scrap_new.do?pageNo=1", 
		"Resource=0", 
		"RecContentType=text/html", 
		"Referer=http://192.168.1.251/bsams/front/asset_scrap/asset_scrap_list.do", 
		"Snapshot=t50.inf", 
		"Mode=HTML", 
		LAST);


	lr_rendezvous("R_wx");

	lr_start_transaction("T_wx");

	web_submit_data("asset_scrap_save.do", 
		"Action=http://192.168.1.251/bsams/front/asset_scrap/asset_scrap_save.do", 
		"Method=POST", 
		"RecContentType=text/plain", 
		"Referer=http://192.168.1.251/bsams/front/asset_scrap/asset_scrap_new.do?pageNo=1", 
		"Snapshot=t57.inf", 
		"Mode=HTML", 
		ITEMDATA, 
		"Name=pageNo", "Value=1", ENDITEM, 
		"Name=assetId", "Value=145", ENDITEM, 
		"Name=dictScrapWay", "Value=75", ENDITEM, 
		"Name=scrapDate", "Value=2018-11-27", ENDITEM, 
		"Name=remark", "Value=测试原因01", ENDITEM, 
		"Name=total", "Value=400", ENDITEM, 
		LAST);
	
		
	web_reg_find("Text=Test_AAAA",
		LAST);


	web_url("asset_scrap_list.do", 
		"URL=http://192.168.1.251/bsams/front/asset_scrap/asset_scrap_list.do", 
		"Resource=0", 
		"RecContentType=text/html", 
		"Referer=http://192.168.1.251/bsams/front/asset_scrap/asset_scrap_new.do?pageNo=1", 
		"Snapshot=t58.inf", 
		"Mode=HTML", 
		LAST);
	

//	web_submit_data("asset_scrap_list.do_2", 
//		"Action=http://192.168.1.251/bsams/front/asset_scrap/asset_scrap_list.do", 
//		"Method=POST", 
//		"RecContentType=text/html", 
//		"Referer=http://192.168.1.251/bsams/front/asset_scrap/asset_scrap_list.do", 
//		"Snapshot=t60.inf", 
//		"Mode=HTML", 
//		ITEMDATA, 
//		"Name=discardMode", "Value=", ENDITEM, 
//		"Name=assetCategory", "Value=", ENDITEM, 
//		"Name=likeCondition", "Value=", ENDITEM, 
//		LAST);


	lr_end_transaction("T_wx",LR_AUTO);
	

	return 0;
}