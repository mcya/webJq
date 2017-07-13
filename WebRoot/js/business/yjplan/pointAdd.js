var Point={};
Point.chkclick=function(){
	$(this).find("input").click();
	var names="";
	$(this).parents("ul:first").find("input").each(function(){
		if($(this).is(':checked')){
			names+=$(this).next().text()+",";
		}
	});
	$("[name=agentnames]").val(names);
	$("#agentnames").text((names && names!="")?names.substring(0, names.length-1):"请选择");
}

////自定义的冲突验证
//$.validator.methods.checkMaxAndMin=function(value, element){
//	var modles=$("[cdiv=1]");
//	alert("1111");
//}

$.validator.addMethod("checkMax", function(value, element, param) {
	var mydiv=$(element).parents("[cdiv=1]:first");
	var min=mydiv.find("[name=mins]").val();
	var max=mydiv.find("[name=maxs]").val();
	min=parseInt(min, 10);
	max=parseInt(max, 10);
	return max>=min;
},"最大金额不能小于起始金额");

$.validator.addMethod("checkMaxAndMin", function(value, element, param) {
	var mydiv=$(element).parents("[cdiv=1]:first");
	var divs=$("[cdiv=1]");
	for(var i=0;i<divs.length;i++){//删除校验元素
		if(divs[i]==mydiv[0] //元素相等
			|| $(divs[i]).find("[name=fcs]").val()=="" //分成对象为空
			|| $(divs[i]).find("[name=fcs]").val()!=mydiv.find("[name=fcs]").val()  //分成对象不相等
			|| $(divs[i]).find("[name=conditiontypes]").val()!=mydiv.find("[name=conditiontypes]").val()){ //计量方式不相等
			divs.splice(i--, 1);
		}
	}
	var min=mydiv.find("[name=mins]").val();
	var max=mydiv.find("[name=maxs]").val();
	var flag=true;
	for(var i=0;i<divs.length;i++){//比较
		var div=divs[i];
		var _min=$(div).find("[name=mins]").val();
		var _max=$(div).find("[name=maxs]").val();
		_max=parseInt(_max, 10);
		_min=parseInt(_min, 10);
		min=parseInt(min, 10);
		max=parseInt(max, 10);
		if(_max>min && max>_min || (_max==max && min==_min)){//冲突检测
//			alert("["+_max+">="+min+"],"+"["+max+">="+_min+"]");
			flag=false;
		}
	}
//	alert(divs.length);
//	alert(flag);
  return flag;   
}, "计量范围冲突.");

$.validator.addMethod("checkDate", function(value, element, param) {
	var startdate=$(param).val();
	 var date1 = new Date(Date.parse(startdate.replace("-", "/")));
     var date2 = new Date(Date.parse(value.replace("-", "/")));
     return date1 <= date2;
},"失效日期不能小于生效日期");

Point.addRule=function(){
	var row=$($("#modle")[0]).clone();
	row.attr("cdiv","1");
	row.insertBefore($(".add"));
	row.find("#gzsele").change();
}

Point.valid=function(){
	return $("form").valid() && Point.checkPointType();
};

Point.delRule=function(obj){
	if($("[cdiv=1]").length>1)
		$(obj).parents("[cdiv=1]:first").remove();
}
Point.showScopeSetting=function(){
	window.top.layer.open({
		type : 2,
		shade : false,
		title : '范围选择', 
		shadeClose : false,
		shade : 0.8,
		area : [ '940px', '456px' ],
		content : 'yjplanset/openScopeForm.do?level=3&planid='+$("#planid").val()+'&windowname='+window.name,
		success:function(layero,index){
			$(layero.find("iframe")[0].contentWindow.document).find("[name=scope]").val($("#scopeVal").val());
			$(layero.find("iframe")[0].contentWindow.document).find("#form").submit();
			//alert("1111");
		}
	});
}
function setScope(scopeValue, companyName, projName, bldName, roomName) {
	//$('#scope').val(scopeValue);
	var scopeNames = "";
	if (undefined != companyName && null != companyName
			&& companyName.length != 0) {
		scopeNames += companyName + ",";
	}
	if (undefined != projName && null != projName && projName.length != 0) {
		scopeNames += projName + ",";
	}
	if (undefined != bldName && null != bldName && bldName.length != 0) {
		scopeNames += bldName + ",";
	}
	if (undefined != roomName && null != roomName && roomName.length != 0) {
		scopeNames += roomName + ",";
	}
	
	$("#scopeVal").val(scopeValue);
	//alert($("#scopeVal").val());
	$("#scope").val(scopeNames);
	//alert(scopeNames);
	//$('#scopeidDiv').children("a").first().html(scopeNames);
	//$('#scopeidDiv').children("a").attr("title", scopeNames);
}

Point.checkPointType=function(){
	var flag=true;
	$("[name=commtype]").each(function(){
		var parent=$(this).parents("[cdiv=1]:eq(0)");
		var val=$(this).val();
		var cval=parent.find("[name=commPoints]").val();
		if("0"==val){//%
			if(cval>0 && cval<=100){
			}else{
				layer.tips("不能为空和0,且在1-100之间", parent.find("[name=commPoints]"), {
      			  tips: [1, '#FF0000'],
      			  time: 4000,
      			  tipsMore: true
      			});
				flag=false;
			}
		}else if("1"==val){//元
			var reg=/^\d+\.{0,1}\d*$/;
			if(reg.test(cval) && cval>0 && cval.replace(/\./,"").length<9){
			 }else{
				 layer.tips("必须为数字，不能为空、必须大于0,且小于8位.", parent.find("[name=commPoints]"), {
      			  tips: [1, '#FF0000'],
      			  time: 4000,
      			  tipsMore: true
      			});
				 flag=false;
			 }
		}
	});
	return flag;
}

function gzselect(str,str2){
	if(str==null){
		if(str2==0){
			$(str).parents("[cdiv=1]:eq(0)").find("#yjds").text("的佣金点数为");
			/*$.validator.addMethod("af",function(value,element,params){  
				if(value>0&&value<=100)
					return true;
				else
					return false;
			},"不能为空和0,且在1-100之间");*/
		}
		if(str2==1){
			$(str).parents("[cdiv=1]:eq(0)").find("#yjds").text("的佣金金额为");
			/*$.validator.addMethod("af",function(value,element,params){  
				 if(value>0.01&&value<=99999999.99){
					 return true; 
				 }else{
					 return false;
				 }
			},"不能为0,且不能输入超过8位整数");*/
		}

	}else{
		if(str.value==0){
			$(str).parents("[cdiv=1]:eq(0)").find("#yjds").text("的佣金点数为");
			/*$.validator.addMethod("af",function(value,element,params){  
				if(value>0&&value<=100)
					return true;
				else
					return false;
			},"不能为空和0,且在1-100之间");*/
		}
		if(str.value==1){
			$(str).parents("[cdiv=1]:eq(0)").find("#yjds").text("的佣金金额为");
			/*$.validator.addMethod("af",function(value,element,params){  
				 if(value>0.01&&value<=99999999.99){
					 return true; 
				 }else{
					 return false;
				 }
			},"不能为0,且不能输入超过8位整数");*/
		}
	}
}

$(function(){
	var gzsele=$("#gzsele").val();
	gzselect(null,gzsele);
    $.doselect("#tjDiv1", "#inputselect1");
	$.doselect("#agentselect", "#inputselect2");
	$.doselect("#tjDiv3", "#inputselect3");
	$.doselect("#tjDiv4", "#inputselect4");
	$.doselect("#tjDiv5", "#inputselect5");
	
	$("#agentselect li").unbind("click");
	$("#agentselect li").click(Point.chkclick);
	
	$("form").validate({
		ignore:'',
		rules:{
			mins:{
				number:true,
				checkMaxAndMin:"1111",
				maxlength:8
			},
			maxs:{
				number:true,
				checkMax:'',
				maxlength:8
			},
			endtime:{
				checkDate:"[name=starttime]"
			},
			rulelevel:{
				number:true
			},
			commPoints:{
				required:true
    		}
		},
    	messages: {
    		tdrulename:'请输入方案名称',
    		scope:'请选择规则适用范围',
    		rulelevel:{
    			required:'请输入规则优先级'
    		},
    		starttime:'请选择开始时间',
    		endtime:{
    			required:'请选择结束时间'
    		},
    		agents:'请选择代理商',
    		fcs:'请选择分成对象',
    		mins:{
    			required:'请输入最小值',
    			checkMaxAndMin:'数值范围冲突'
    		},
    		maxs:{
    			required:'请输入最大值'
    		},
    	},
    	errorPlacement:function(error, element){
    		var msg=$(error[0]).html();
    		//alert($(element).prop("name"));
    		
    		var showmsg=function(msg, element,type){
    			var t=type?type:4;
    			layer.tips(msg, element, {
      			  tips: [t, '#FF0000'],
      			  time: 4000,
      			  tipsMore: true
      			});
    		};
    		
    		if($(element).attr("name")=="agents"){
    			showmsg(msg,"#agentselect");
    		}else if($(element).parents(".setScope").length>0){
    			showmsg(msg,element,1);
    		}else{
    			showmsg(msg,element);
    		}
    	}
    });
	
	
	if($("#ids").length>0){
		var names="";
		$("#agentselect").find("input").each(function(){
			if($(this).is(':checked')){
				names+=$(this).next().text()+",";
			}
		});
		$("[name=agentnames]").val(names);
		$("#agentnames").text((names && names!="")?names.substring(0, names.length-1):"请选择");
	}
})
/*文本域自适应函数*/
function textarea(){
	 var W=parseInt($(".remark").css("width"));
	 W=W-88+"px";//88为文本域左边距body的宽度（包括label和body的padding值）
	 $(".remark>textarea").css("width",W);
}
textarea();
$(window).resize(function() {
textarea(); 
});