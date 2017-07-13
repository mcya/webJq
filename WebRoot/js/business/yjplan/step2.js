var Step2={};

//引用通用规则
Step2.jlruleImp=function(){
	var url='target/goImp.do?yjplanid='+$("#yjplanid").val();
	window.top.layer.open({
		type : 2,
		shade : false,
		title : '目标激励集团规则', 
		shadeClose : false,
		shade : 0.0,
		area : [ '940px', '500px' ],
		btn : [ '引用', '取消' ],
		content : url,
		btn1:function(index, layero){
			var str=layero.find("iframe")[0].contentWindow.$("form").serialize();
			//alert(str);
			if(str && str!=""){
				str+="&type=4&planid="+$("#yjplanid").val()
				$.ajaxjson("yjplanset/saveRela.do",str,false,function(respData){
					if(respData.success == 'true'){
				   		 window.top.layer.msg('引入成功');
				   		 window.top.layer.close(index);
				   	 }else{
				   		window.top.layer.msg(respData.error);
				   	 }
				});
			}
		},
		end:function(){
			Step2.flush();
		}
	});
}

Step2.jlruleAdd=function(upflag){
	
	var url='target/goAdd.do?yjplanid='+$("#yjplanid").val();
	if(upflag){
		//genxin
		
	}
	window.top.layer.open({
		type: 2,
		  shade: false,
		  title: '添加目标激励规则', 
		  shadeClose: false,
		  shade: 0.8,
		  fix: false, //不固定
	  	  maxmin: false,
		  area: ['900px', '500px'],
		  content: url, 
		  end:function(){
			  Step2.flush();
		  }
	})
}
Step2.jlruledel=function(){
	var sum = $('input[type="checkbox"]:checked');
	if(0==sum.length){
		layer.msg("请选择删除的记录");
		return;
	}
	var jsruleguid = "1=1";
	$(sum).each(function(){
		jsruleguid += "&ruleid="+$(this).val();
	});
	jsruleguid += "&yjplanid="+$("#yjplanid").val();
	var url="target/delete.do";
	layer.confirm('确认删除选中的'+sum.length+'条记录么?',{
		btn:['确认','取消']
	},function(){
		$.ajax({
			type:"POST",
			url:url,
			data:jsruleguid,
			dataType:'JSON',
			success:function(respData){
				if(respData.success == 'true'){
					layer.msg('成功删除'+sum.length+'条记录');
					sum.each(function(){
						$(this).parent().parent().remove();
					});
					return;
				}else{
					layer.msg(respData.error);
					return;
				}
			}
		})
		
	},function(){
		return;
	})
	
}
Step2.groupAdd=function(upflag){
	var url='rugroup/goAdd.do?planid='+$("#yjplanid").val();
	if(upflag){//是更新
		if(!Step2.gtrchoose){
			layer.msg('请选择一条要修改的记录.');
			return;
		}
		if($('[val='+Step2.gtrchoose+']').attr("guid")=="4C132326-7C83-431D-AB61-DB9561C319F3"){
			layer.msg('禁止修改集团规则.');
			return;
		}
		//alert($('[val='+Step2.gtrchoose+']').attr("guid"));
		
		url='rugroup/edit.do?planid='+$("#yjplanid").val()+"&xzruleid="+Step2.gtrchoose;
	}
	window.top.layer.open({
		type : 2,
		shade : false,
		title : '小组分成规则', 
		shadeClose : false,
		shade : 0.0,
		area : [ '940px', '82%' ],
		btn : [ '保存', '取消' ],
		content : url,
		btn1:function(index, layero){
			layero.find("iframe")[0].contentWindow.doSave();
		},
		end:function(){
			Step2.flush();
		}
	});
}


Step2.pointDel=function(){
	if(!Step2.trchoose){
		layer.msg('请选择一条要删除的记录.');
		return;
	}
	layer.confirm('确定删除这条佣金点数规则吗?', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajaxdata("point/del.do", {
			'ids' : Step2.trchoose
		}, false, function(text) {
			layer.msg(text);
			Step2.flush();
		});
	});
}

Step2.groupdel=function(){
	if(!Step2.gtrchoose){
		layer.msg('请选择一条要删除的记录.');
		return;
	}
	window.top.layer.confirm('确定删除这条小组分成规则吗?', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
		   type: "POST",
		   url: "rugroup/delete4plan.do",
		   data: {'jsruleguid':Step2.gtrchoose,'planid':$("#yjplanid").val()},
		   dataType: 'JSON',
		   success: function(respData){
		   	 if(respData.success == 'true'){
		   		 window.top.layer.msg('删除成功');
		   	 }else{
		   		window.top.layer.msg(respData.error);
		   	 }
		   	Step2.flush();
		   }
		});
	});
	
}

Step2.settledel=function(){
	if(!Step2.strchoose){
		layer.msg('请选择一条要删除的记录.');
		return;
	}
	window.top.layer.confirm('确定删除这条结算规则吗?', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
		   type: "POST",
		   url: "settlement/delete4plan.do",
		   data: {'jsruleguid':Step2.strchoose,'planid':$("#yjplanid").val()},
		   dataType: 'JSON',
		   success: function(respData){
		   	 if(respData.success == 'true'){
		   		 window.top.layer.msg('删除成功');
		   	 }else{
		   		window.top.layer.msg(respData.error);
		   	 }
		   	Step2.flush();
		   }
		});
	});
	
}

Step2.grouptrdbc=function(id){
	 var url='rugroup/edit.do?xzruleid='+id+'&view=1';
	 window.top.layer.open({
			type : 2,
			shade : false,
			title : '小组分成集团规则', 
			shadeClose : false,
			shade : 0.0,
			area : [ '1000px', '90%' ],
			btn : [ '关闭' ],
			content : url
		});
}

Step2.settletrdbc=function(id){
	 var url='settlement/planGet.do?jsruleguid='+id+'&view=1';
	 window.top.layer.open({
			type : 2,
			shade : false,
			title : '结佣条件集团规则', 
			shadeClose : false,
			shade : 0.0,
			area : [ '1000px', '90%' ],
			btn : [ '关闭' ],
			content : url
		});
}

Step2.groupimp=function(){
//	var url='yjplanset/saveRela.do';
	var url='rugroup/listgroup.do?planid='+$("#yjplanid").val();
	window.top.layer.open({
		type : 2,
		shade : false,
		title : '小组分成集团规则', 
		shadeClose : false,
		shade : 0.0,
		area : [ '940px', '500px' ],
		btn : [ '引用', '取消' ],
		content : url,
		btn1:function(index, layero){
			var str=layero.find("iframe")[0].contentWindow.$("form").serialize();
			//alert(str);
			if(str && str!=""){
				str+="&type=3&planid="+$("#yjplanid").val()
				$.ajaxjson("yjplanset/saveRela.do",str,false,function(respData){
					if(respData.success == 'true'){
				   		 window.top.layer.msg('引入成功');
				   		 window.top.layer.close(index);
				   	 }else{
				   		window.top.layer.msg(respData.error);
				   	 }
				});
			}
		},
		end:function(){
			Step2.flush();
		}
	});
}


Step2.settleimp=function(){
//	var url='yjplanset/saveRela.do';
	var url='settlement/listgroup.do?planid='+$("#yjplanid").val();
	window.top.layer.open({
		type : 2,
		shade : false,
		title : '结佣条件集团规则', 
		shadeClose : false,
		shade : 0.0,
		area : [ '940px', '82%' ],
		btn : [ '引用', '取消' ],
		content : url,
		btn1:function(index, layero){
			var str=layero.find("iframe")[0].contentWindow.$("form").serialize();
			//alert(str);
			if(str && str!=""){
				str+="&type=2&planid="+$("#yjplanid").val()
				$.ajaxjson("yjplanset/saveRela.do",str,false,function(respData){
					if(respData.success == 'true'){
				   		 window.top.layer.msg('引入成功');
				   		 window.top.layer.close(index);
				   	 }else{
				   		window.top.layer.msg(respData.error);
				   	 }
				});
			}
		},
		end:function(){
			Step2.flush();
		}
	});
}

Step2.settleAdd=function(upflag){
	var url='settlement/planGoAdd.do?planid='+$("#yjplanid").val();
	if(upflag){//是更新
		if(!Step2.strchoose){
			layer.msg('请选择一条要修改的记录.');
			return;
		}
		var gflag=false;
		var status="";
		$.ajaxdata("settlement/checkPlanType.do?jid="+Step2.strchoose,null,false,function(data){
			if(data=="true"){
				layer.msg('集团规则将只可查看。');
				//gflag=true;
				url='settlement/planGet.do?jsruleguid='+Step2.strchoose+'&view=1';
				status="0";
				window.top.layer.open({
					type : 2,
					shade : false,
					title : '结佣条件规则', 
					shadeClose : false,
					shade : 0.0,
					area : [ '940px', '82%' ],
					btn : ['取消'],
					content : url,
					end:function(){
						Step2.flush();
					}
				});
			}
		});
		if(gflag)return;
		if(status!="0"){
			url='settlement/planGet.do?planid='+$("#yjplanid").val()+"&jsruleguid="+Step2.strchoose;
			window.top.layer.open({
				type : 2,
				shade : false,
				title : '结佣条件规则', 
				shadeClose : false,
				shade : 0.0,
				area : [ '940px', '82%' ],
				btn : [ '保存', '取消' ],
				content : url,
				btn1:function(index, layero){
					layero.find("iframe")[0].contentWindow.doSave();
				},
				end:function(){
					Step2.flush();
				}
			});
		}
	}else{
		window.top.layer.open({
			type : 2,
			shade : false,
			title : '结佣条件规则', 
			shadeClose : false,
			shade : 0.0,
			area : [ '940px', '82%' ],
			btn : [ '保存', '取消' ],
			content : url,
			btn1:function(index, layero){
				layero.find("iframe")[0].contentWindow.doSave();
			},
			end:function(){
				Step2.flush();
			}
		});	
	}

}


Step2.pointAdd=function(upflag,isview){
	var btn=[ '保存', '取消' ];
	var btnfunc=function(index, layero){
		var data=$(layero.find("iframe")[0].contentWindow.document).find("form").serialize();
		var url=$(layero.find("iframe")[0].contentWindow.document).find("form").attr("action");
		var check=layero.find("iframe")[0].contentWindow.Point.valid();
		if(check)$.ajaxdata(url,data,false,function(text){
			if(text.indexOf("ok,")==0){
				var msg=text.substring(3);
				window.top.layer.msg(msg);
				Step2.flush();
				window.top.layer.close(window.top.layer.getFrameIndex(layero.find("iframe")[0].contentWindow.name));
			}else{//出错
				window.top.layer.msg(text);
			}
		});
	};
	var url='point/pointAdd.do?planid='+$("#yjplanid").val();
	if(upflag){//是更新
		if(!Step2.trchoose){
			layer.msg('请选择一条要修改的记录.');
			return;
		}
		url='point/initPointUpdate.do?planid='+$("#yjplanid").val()+"&ids="+Step2.trchoose;
		
		if(isview){
			btnfunc=null;
			url+="&view=1";
			btn=['关闭'];
		}
	}
	
	window.top.layer.open({
		type : 2,
		shade : false,
		title : '佣金点数规则', 
		shadeClose : false,
		shade : 0.0,
		area : [ '940px', '82%' ],
		btn : btn,
		content : url,
		btn1:btnfunc
	});
}
Step2.pointtrclick=function(obj){
	obj.parents("table").find("tr").css("background","");
	obj.css("background","#cbd7fd");
	var val=obj.attr("val");
	Step2.trchoose=val;
	//alert(Step2.trchoose);
};

Step2.settrclick=function(obj){
	obj.parents("table").find("tr").css("background","");
	obj.css("background","#cbd7fd");
	var val=obj.attr("val");
	Step2.strchoose=val;
	//alert(Step2.trchoose);
};

Step2.groupclick=function(obj){
	obj.parents("table").find("tr").css("background","");
	obj.css("background","#cbd7fd");
	var val=obj.attr("val");
	Step2.gtrchoose=val;
	//alert(Step2.trchoose);
};

Step2.flush =function(){
	Step2.trchoose={};
	//所要提交的表单 
    ajaxAnywhere.formName="pointform";  
    //所要刷新的区域	 
    ajaxAnywhere.getZonesToReload = function(){  
        return "p1,p2,p3,p4";
    }
    ajaxAnywhere.submitAJAX();
}
