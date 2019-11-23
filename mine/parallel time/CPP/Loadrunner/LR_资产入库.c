Action()
{
		
	int ids = 9999;
	
	web_url("user_info.do", 
		"URL=http://192.168.1.251/bsams/front/asset_user/user_info.do", 
		"Resource=0", 
		"RecContentType=text/html", 
		"Referer=", 
		"Snapshot=t20.inf", 
		"Mode=HTML", 
		LAST);

	web_link("资产入库", 
		"Text=资产入库", 
		"Snapshot=t64.inf", 
		LAST);

	web_url("asset_new.do", 
		"URL=http://192.168.1.251/bsams/front/asset/asset_new.do?pageNo=1", 
		"Resource=0", 
		"RecContentType=text/html", 
		"Referer=http://192.168.1.251/bsams/front/asset/asset_list.do", 
		"Snapshot=t65.inf", 
		"Mode=HTML", 
		LAST);
	
	lr_think_time(5);

	lr_rendezvous("R_wx");

	lr_start_transaction("T_wx");


	web_submit_form("asset_new_save.do",
		"Snapshot=t66.inf",
		ITEMDATA,
		"Name=tilte", "Value={NewParam_3}", ENDITEM,
		"Name=assetCategoryId", "Value=资产类别01", ENDITEM,
		"Name=assetProviderId", "Value=维信科技发展有限公司", ENDITEM,
		"Name=assetBrandId", "Value=测试品牌01", ENDITEM,
		"Name=assetStorageId", "Value=电脑耗材库", ENDITEM,
		LAST);

	
	web_reg_find("Text={NewParam_3}",
		LAST);
	
	web_url("asset_list.do", 
		"URL=http://192.168.1.251/bsams/front/asset/asset_list.do", 
		"Resource=0", 
		"RecContentType=text/html", 
		"Referer=http://192.168.1.251/bsams/front/asset/asset_new.do?pageNo=1", 
		"Snapshot=t67.inf", 
		"Mode=HTML", 
		LAST);

	lr_end_transaction("T_wx",LR_AUTO);

	

	return 0;
}