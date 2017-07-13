
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



$(function(){
	$("#uploadinput2").uploadify({
        'swf': 'js/fileupload/uploadify.swf',
        'uploader': '../ord/delete.do',
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
        		window.top.layer.alert("上传处理完成", {icon: 1});
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
        'onUploadError' : function(file, errorCode, errorMsg, errorString) {
        	window.top.layer.alert("上传出错,内部服务器错误!", {icon: 2});
        	$("#file").val("");
        	$('#fileQueue').css('display','none');
        	layer.close(Importer.DivIndex);
        }
    });
	
	$("#uploadbutton3").click(function(){
		
		
		if($("#reaprjinput").val()=="" || !$("#reaprjinput").val()){
			window.top.layer.msg('请选择项目.');
			return ;
		}
		
		if($("#file").val()=="" || !$("#file").val()){
			window.top.layer.msg('请选择要删除的文件.');
			return ;
		}
		$("#uploadinput2").uploadify('settings','uploader','ord/delete.do');
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