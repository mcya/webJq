
var Importer={};

Importer.downloadFile=function(id){
	if(id){
		var href="cul/downloadimportFile.do?taskid="+id;
		var iframe=$("<iframe style='display:none;' />").appendTo($("body"));
		
		iframe.attr("src",href);
		iframe.load(function(){
			var msg=iframe.contents().find("body").text();
			if(msg && msg!=""){
				layer.msg(msg);
			}
		});
//		iframe[0].onload=function(){
//			alert($(this).text());
//		}
//		alert(iframe.text());
//		if(iframe.text());
	}
}

Importer.trclick=function(obj,taskid){
	obj.parents("table").find("tr").css("background","");
	obj.css("background","#cbd7fd");
	Importer.taskid=taskid;
};

Importer.reset=function(){
	$('[name=importForm]')[0].reset();
	$('[name=importForm] input').val("");
}

Importer.fulshForm=function(changepage){
	if(!changepage)$('[name=importForm]').doPage('init');
	Importer.taskid=null;
	$("[name=importForm]").attr("action","cul/importPage.do");//不设这个AA会自动置空！？！？
	//所要提交的表单 
    ajaxAnywhere.formName="importForm";  
    //所要刷新的区域	 
    ajaxAnywhere.getZonesToReload = function(){
        return "tasktable";
    }
    ajaxAnywhere.submitAJAX();
}

Importer.openDetail=function(){
	if(!Importer.taskid || Importer.taskid==""){
		layer.msg('请选择要查看的导入记录.');
		return;
	}
	window.top.layer.open({
		  type: 2,
		  title: '导入明细',
		  shadeClose: false,
		  shade: 0.8,
		  area: ['900px', '90%'],
		  content: 'cul/importDetail.do?taskid='+Importer.taskid,
	}); 
}



Importer.onexport=function(){
	var projGUID=$("[name=importForm]").find("#projGUID").val();
	if(!projGUID || projGUID==""){
		window.top.layer.msg('请选择导出的项目.');
		return;
	}
	
	window.top.layer.open({
		  type: 2,
		  title: '文件生成中，请稍后...',
		  shadeClose: false,
		  shade: 0.8,
		  area: ['400px', '0%'],
		  content: 'cul/exportData.do?projGUID='+projGUID,
		  success:function(layero, index){
			  var txt=$(layero.find("iframe")[0].contentWindow.document.body).text();
			  var code=txt.split(",")[0];
			  var msg=txt.split(",")[1];
			  
			  //alert(code+"】:【"+msg);
			  if("OK"==code){//生成成功
				  window.top.layer.close(index);
				  window.location.href=$("base").attr("href")+"cul/downloadExportFile.do?fid="+msg;
			  }else{
				  window.top.layer.close(index);
				  window.top.layer.alert(msg, {icon: 2});
			  }
			  Importer.fulshForm(1);
		  }
	}); 
}


$(function(){
	$("#uploadinput2").uploadify({
        'swf': 'js/fileupload/uploadify.swf',
        'uploader': '../ord/upload.do',
        'method'   :'post',
        'queueID': 'fileQueue',
        'auto': false,
        'multi': false,
        'width': '20',
        'height':'20',
        'buttonClass': null,
        'buttonText':'',
        'queueSizeLimit' : 1,
        'successTimeout':9999,//永不超时
        'fileTypeExts' : '*.txt;',
        'onSelect' : function(file) {
           $("#file").val(file.name);
        },
        'onCancel' : function(file){
        	layer.closeAll();
        	$("#file").val("");
        	$('#fileQueue').css('display','none');
        },
        'onDialogOpen':function(){
        	$('#uploadinput2').uploadify('cancel','*');
        	layer.closeAll();
        	$("#file").val("");
        	$('#fileQueue').css('display','none');
        },
        'onUploadSuccess' : function(file, data, response) {
        	if("OK"==data){
//        		Importer.fulshForm();
        		window.top.layer.alert("数据导入完成", {icon: 1});
        	}else{
        		window.top.layer.alert(data, {icon: 2});
        	}
        	
        	$("#file").val("");
        	$('#fileQueue').css('display','none');
        	layer.close(Importer.DivIndex);
        },
        'onUploadStart': function (file) {  
            $("#uploadinput2").uploadify("settings", "formData", {'projGUID': $("#projguidHidden").val()}); 
        },
        'onUploadError':function(){
        	alert("11");
        }
    });
	
	$("#uploadbutton2").click(function(){
		if($("#reaprjinput").val()=="" || !$("#reaprjinput").val()){
			window.top.layer.msg('请选择项目.');
			return ;
		}
		
		if($("#file").val()=="" || !$("#file").val()){
			window.top.layer.msg('请选择要上传的文件.');
			return ;
		}
		
		$("#uploadinput2").uploadify('settings','uploader','ord/upload.do');
		Importer.DivIndex=layer.open({
		  type: 1,
		  shade: [0.3, '#000'],
		  title: false, //不显示标题
		  closeBtn: 0,
		  offset: '20px',
		  content: $('#fileQueue'), //捕获的元素
		  cancel: function(index){
		    layer.close(index);
		    this.content.show();
		    //layer.msg('捕获就是从页面已经存在的元素上，包裹layer的结构', {time: 5000, icon:6});
		  }
		});
		$("#uploadinput2").uploadify('upload','*');
	});
	
	
});