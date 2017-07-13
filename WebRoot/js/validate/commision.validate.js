$().ready(function(){ 
//屏蔽JQUERY的默认HIDDEN不校验
$.extend($.validator.defaults,{ignore:""});
//重载必填消息提示
$.extend($.validator.messages, {  
    required: '必填'
}); 
//新加整数据规则
 $.validator.addMethod("integer", function(value, element) {       
         return this.optional(element) || (/^\d+$/.test(value) && parseInt(value)>=0);       
    }, "要求为整数"); 
//设置整数规则可用于CLASS
$.extend($.validator.classRuleSettings, {
	integer:{integer:true}
});

 
 
 
 $("form").validate({
  	errorPlacement: function(error, element) { 
  	var msg=$(error[0]).html();
  	if(element.is(':hidden')){
       	$.tips(element.next(),element.prev().html()+msg);
     }else{
     	var textField = element.prev().html();
     	if(undefined == textField){
     		textField = "";
     	}
       	$.tips(element,textField+msg);
     }
	} 
  }
 )
 });