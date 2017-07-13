var PLAN={};
PLAN.getProjectPdType =function(){
	$("#pudtypeform").attr("action","yjplanset/step1.do");//不设这个AA会自动置空！？！？
	//所要提交的表单 
    ajaxAnywhere.formName="pudtypeform";  
    //所要刷新的区域	 
    ajaxAnywhere.getZonesToReload = function(){  
        return "pddiv";
    }
    ajaxAnywhere.submitAJAX();
    ajaxAnywhere.onAfterResponseProcessing=function(){
    	$.doselect("#tjDiv2", "#inputselect2");
    	$("#productType li").unbind("click");
    };
}
PLAN.chkclick=function(obj){
	$("#tjDiv2 ul li [type=checkbox]").each(function(){
		if($(this).is(':checked')){
			$(this).attr("checked", !$(this).attr("checked"));//选择则反选
		}
	});
	$(obj).find('[type=checkbox]').click();
	var names="";
	$("#tjDiv2 ul li [type=checkbox]").each(function(){
		if($(this).is(':checked')){
			names+=$(this).next().text();
		}
	});
	$("[name=pdtypename]").val(names);
	$("#pdnames").text(names);
}

PLAN.submitForm=function(){
	$("#pudtypeform").attr("action","yjplanset/savePlan.do");//不设这个AA会自动置空！？！？
	//所要提交的表单 
    ajaxAnywhere.formName="mainform";  
    //所要刷新的区域	 
    ajaxAnywhere.getZonesToReload = function(){  
        return "mainform";
    }
    ajaxAnywhere.submitAJAX();
    ajaxAnywhere.onAfterResponseProcessing = function() {
		var msg = $("#msg").val();
		if (msg.indexOf("ok,")==0) {
			window.top.layer.open({
				type : 2,
				shade : false,
				title : '新增佣金方案:第二步', 
				shadeClose : false,
				shade : 0.0,
				area : [ '940px', '82%' ],
				btn : [ '提交方案', '取消' ],
				content : 'yjplanset/step2.do?planid='+$("#planid").val(),
				btn1:function(index,layero){
					$.ajaxdata("yjplanset/chagePlanStatus.do", {'planid' : $("#planid").val()}, false, function(text) {
						window.top.layer.msg(text.split(",")[1]);
						if (text.indexOf("ok,")==0){
							window.top.layer.close(index);
						}
					});
				},
				end :function(){//销毁才关闭。。要不会释放父页面后这里所有函数都用不了了。
					window.top.layer.close(window.top.layer.getFrameIndex(window.name));
				}
			});
		}else if (msg.indexOf("stop,")==0){
			window.top.layer.open({
				type : 2,
				shade : false,
				title : '新增佣金方案:第二步', 
				shadeClose : false,
				shade : 0.0,
				area : [ '1000px', '87%' ],
				btn : ['关闭'],
				content : 'yjplanset/step2.do?planid='+$("#planid").val()+"&view=1"
			});
			parent.layer.close(parent.layer.getFrameIndex(window.name));
		}else{
			layer.msg(msg);
		}
    };
}

$.validator.addMethod("checkDate", function(value, element, param) {
	var startdate=$(param).val();
	 var date1 = new Date(Date.parse(startdate.replace("-", "/")));
     var date2 = new Date(Date.parse(value.replace("-", "/")));
     return date1 <= date2;
},"失效日期不能小于生效日期");

PLAN.checkForm=function(){
		return $("[name=mainform]").valid();
};


$(function(){
    $.doselect("#tjDiv1", "#inputselect1");
	$.doselect("#tjDiv2", "#inputselect2");
	$.doselect("#tjDiv3", "#yxway");
	var tree=new ProjectTree();
	  tree.callbackfunc.onClick=function(e, treeId, treeNode){
		if(treeNode.level>=1){
			$("#projselect").val(treeNode.name);
			$("#projguidHidden").val(treeNode.value);
			$("#pudtypeform [name=projGUID]").val(treeNode.value);
			PLAN.getProjectPdType();
			tree.hideMenu();
		}
	  };
	  tree.init(null,null,"imf/gettreeJson.do");
	  tree.bind($("#projselect")/*,210*/);
	  
	  
	$("#productType li").unbind("click");
	
	var yxvall=$("#yxway").val();
	if(yxvall)$("#yxway").parents("div:first").find("a:first").text($("#yxway").parents("div:first").find("[selvalue="+yxvall+"]").text());
	
	
	var commoditype=$("#productType").attr("val");
	if(commoditype){
		$("[type=checkbox]").each(function(){
			if($(this).val()==commoditype)$(this).click();
		});
	}
	
	$("[name=mainform]").validate({
		ignore:'',
		rules:{
			endtime:{
				checkDate:"[name=starttime]"
			}
		},
    	messages: {
    		projname:'请选择项目',
    		yjplanname:'请输入方案名称',
    		pdtypename:'请选择商品类型',
    		starttime:'请选择开始时间',
    		endtime:{
    			required:'请选择结束时间'
    		},
    		yxway:'请选择销售途径'
    	},
    	errorPlacement:function(error, element){
    		var msg=$(error[0]).html();
    		//alert($(element).prop("name"));
    		
    		var showmsg=function(msg, element,type){
    			var t=type?type:3;
    			layer.tips(msg, element, {
      			  tips: [t, '#FF0000'],
      			  time: 4000,
      			  tipsMore: true
      			});
    		};
    		
    		if($(element).attr("name")=="pdtypename"){
    			showmsg(msg,"#productType");
    		}else if($(element).attr("name")=="yxway"){
    			showmsg(msg,"#yx");
    		}else{
    			showmsg(msg,element);
    		}
    	}
    });
	
	
});
/*文本域自适应函数*/
function textarea(){
	 var W=parseInt($(".remark").css("width"));
	 W=W-88+"px";//88为文本域左边距body的宽度（包括label和body的padding值）
	 $(".remark>textarea").css("width",W);
}
textarea();
$(window).resize(function() {
textarea(); 
})