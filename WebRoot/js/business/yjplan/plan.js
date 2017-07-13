$(function() {
		window.base=$("base").attr("href");
        initfunc();
		$("form").submit(function(e){
			doQuery();
		});
    });

var initfunc=function(){
	//点击行勾选
        $("#Qub_tb_List").on("click", "tr", function () {
        	$("[name=yjplanid]").attr("checked", false);
            $(this).find("[name=yjplanid]").click();
        });
        //多选框 防止事件冒泡
        $("[name=yjplanid]").click(function(event){
        	event.stopImmediatePropagation();
    	});
        
};

	function doQuery(changepage){
		if(!changepage)$('#form1').doPage('init');
		$('#form1').attr('action','yjplanset/queryPlan.do');
    	ajaxAnywhere.formName = "form1";
        ajaxAnywhere.getZonesToReload = function(url,submitButton) {
			return "msgZone,listZone";
		}
        ajaxAnywhere.submitAJAX();
        ajaxAnywhere.onAfterResponseProcessing=function(){
        	initfunc();
        }
   }
   
   function diyZtreeClick(e, treeId, treeNode){
		doQuery();
  }
  
   function showAdd(){
		  var step1=$("#step1");
		  window.top.layer.open({
			  type: 2,
			  shade: false,
			  title: '新增佣金方案:第一步', //不显示标题
			  shadeClose: false,
			  shade: 0.8,
			  area: ['850px', '73%'],
			  btn: ['下一步', '取消'],
			  content: 'yjplanset/step1.do', //捕获的元素
			  btn1:function(index, layero){
				  var flag=layero.find("iframe")[0].contentWindow.PLAN.checkForm();
				  if(flag){
					  layero.find("iframe")[0].contentWindow.PLAN.submitForm();
				  }
			  },
			  end:function(){
				  doQuery();
			  }
			});
	   }
   
   //佣金方案修改
   function showBusiwin(){
	   
	   var $temp=$("table input[type=checkbox]:checked");
	   if($temp.length>0){
		   var processId=$temp[0].value;
		   window.top.layer.open({
				  type: 2,
				  shade: false,
				  title: '修改佣金方案:第一步', //不显示标题
				  shadeClose: false,
				  shade: 0.8,
				  area: ['850px', '73%'],
				  btn: ['下一步', '取消'],
				  content: 'yjplanset/step1.do?yjplanid='+processId,
				  btn1:function(index, layero){
					  var flag=layero.find("iframe")[0].contentWindow.PLAN.checkForm();
					  if(flag){
						  layero.find("iframe")[0].contentWindow.PLAN.submitForm();
					  }
				  },
				  end:function(){
					  doQuery(1);
				  }
		   });
	   }
   }
   function doCancel(){
	   var checkNodes = $('input[name="yjplanid"]:checked');
	   if( 0 == checkNodes.length){
  			window.top.layer.msg("请选择要作废的记录");
  			return;
  		}
  		if(!window.confirm('确认作废?')){
  			return;
  		}
  		var jsruleguid = "?1=1";
   		$(checkNodes).each(function(){ 
			jsruleguid += "&yjplanid="+$(this).val();
		}); 
		var url = window.base+"yjplanset/Cancel.do";
		$.ajax({
		   type: "POST",
		   url: url,
		   data: jsruleguid,
		   dataType: 'JSON',
		   success: function(respData){
		   	 if(respData.success == 'true'){
//		   	 	alert();
		   	 window.top.layer.msg('作废成功', {icon: 1});
		   	 	doQuery(1);
		   	 }else{
		   		window.top.layer.msg(respData.error, {icon:2});
//		   	 	alert(respData.error);
		   	 }
		   }
		});
   }
   
   function doDelete(){
   		var checkNodes = $('input[name="yjplanid"]:checked');
   		if( 0 == checkNodes.length){
   			window.top.layer.msg("请选择要删除的记录");
   			return;
   		}
   		if(!window.confirm('确认删除?')){
   			return;
   		}
   		var jsruleguid = "?1=1";
   		$(checkNodes).each(function(){ 
			jsruleguid += "&yjplanid="+$(this).val();
		}); 
		var url = window.base+"yjplanset/delete.do";
		$.ajax({
		   type: "POST",
		   url: url,
		   data: jsruleguid,
		   dataType: 'JSON',
		   success: function(respData){
		   	 if(respData.success == 'true'){
//		   	 	alert();
		   	 window.top.layer.msg('删除成功', {icon: 1});
		   	 	$(checkNodes).each(function(){ 
					$(this).parent().parent().remove();
				});
		   	 }else{
		   		window.top.layer.msg(respData.error, {icon:2});
//		   	 	alert(respData.error);
		   	 }
		   }
		});
   }
   
   function doEdit(xzruleid){
   		window.open(window.base+"/yjplanset/edit.do?xzruleid="+xzruleid,'修改组内分成设置','height:400px;width:500px');
   }
   //发起审批
   function addprocess(){
 	   var $temp=$("table input[type=checkbox]:checked");
 	   if($temp.length>0){
 		   var processId=$temp[0].value;
 		  var status=$temp[0].id;
 		  if(status=="0"){
 			parent.parent.layer.open({
 				  type: 2,
 				  title: '新增流程',
 				  shadeClose: true,
 				  shade: 0.8,
 				  area: ['1000px', '500px'],
 				  content: window.base+'/workflow/'+processId+'/startPlanProcessInit.do',
 				  end : function(){
 					  doQuery(1);
 				  }
 			});
 			}else{
 				parent.parent.layer.alert("草稿/审批中/已生效!");
 			}
 	   }else{
 			parent.parent.layer.alert("请选择一行记录!");
 		}
 	}
	
	function clean(){
  	$('#projguidHidden').val('');
  	$('#prijselecter').val('');
  	$('#inputselect1').val('');
  	$('#tjDiv1 a:first').text('所有');
  	doQuery();
  }