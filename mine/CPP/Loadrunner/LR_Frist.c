Action()
{

	web_url("login.do", 
		"URL=http://192.168.1.251/ceshi/admin/login.do", 
		"Resource=0", 
		"RecContentType=text/html", 
		"Referer=", 
		"Snapshot=t1.inf", 
		"Mode=HTML", 
		EXTRARES, 
		"Url=../style/metronic/theme/assets/global/plugins/excanvas.min.js", ENDITEM, 
		"Url=../style/metronic/theme/assets/global/plugins/respond.min.js", ENDITEM, 
		"Url=../style/metronic/theme/assets/global/plugins/simple-line-icons/fonts/Simple-Line-Icons.eot", ENDITEM, 
		"Url=../style/metronic/theme/assets/global/plugins/bootstrap/fonts/glyphicons-halflings-regular.eot", ENDITEM, 
		"Url=../style/metronic/theme/assets/global/plugins/font-awesome/fonts/fontawesome-webfont.eot", ENDITEM, 
		"Url=../style/metronic/theme/assets/global/img/remove-icon-small.png", ENDITEM, 
		"Url=../style/metronic/theme/assets/global/img/syncfusion-icons-white.png", ENDITEM, 
		"Url=../style/metronic/theme/assets/global/plugins/uniform/images/sprite.png", ENDITEM, 
		LAST);

	lr_think_time(3);

	lr_start_transaction("1_transaction");

	web_submit_form("login.do_2", 
		"Snapshot=t2.inf", 
		ITEMDATA, 
		"Name=username", "Value=admin", ENDITEM, 
		"Name=password", "Value=admin.syzg", ENDITEM, 
		"Name=remember", "Value=1", ENDITEM, 
		LAST);

	web_submit_form("login.do_3", 
		"Snapshot=t3.inf", 
		ITEMDATA, 
		"Name=username", "Value=admin", ENDITEM, 
		"Name=password", "Value=toortoor123", ENDITEM, 
		"Name=remember", "Value=1", ENDITEM, 
		EXTRARES, 
		"Url=../style/metronic/theme/assets/admin/layout2/img/sidebar-toggler-inverse.png", "Referer=http://192.168.1.251/ceshi/admin/index.do?context=%2Fceshi&isOpenValidateRegCode=true", ENDITEM, 
		"Url=../style/metronic/theme/assets/admin/layout2/img/sidebar-toggler.png", "Referer=http://192.168.1.251/ceshi/admin/index.do?context=%2Fceshi&isOpenValidateRegCode=true", ENDITEM, 
		LAST);

	lr_end_transaction("1_transaction",LR_AUTO);

	return 0;
}