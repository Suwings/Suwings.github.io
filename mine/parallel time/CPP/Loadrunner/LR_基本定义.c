Action()
{
		
	int ids =1;
	int i = 0;
	char* chs = "951092158@qq.com:000";
	char buffer[1024];
	char intstr[200];
	
//	sprintf(intstr,"%d",ids);
//	i = atoi("1"); ascii to int 是有返回值的
// 	int to ascii 一般是用第二个参数作为指针传入字符串的
	itoa(ids,intstr,10);
	
	strcat(buffer,chs);
	strcat(buffer,intstr);
	lr_output_message(buffer);
	lr_output_message();
	
	//定义参数
	lr_save_string(buffer,"email");
	
	memset(buffer,0,sizeof(buffer));
	
	lr_output_message(lr_eval_string("邮箱是:{email}"));
	

	//i 变量必须定义在最前面
	for(i=0;i<10;i++){
		itoa(ids,intstr,10);
		lr_output_message(intstr);
	}
	
	return 0;
	
}