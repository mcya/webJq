<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/inc/head.inc"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">
		<title>文件上传</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<script type="text/javascript" src="<%=basePath%>js/wolkflow/public.js"></script>
		<link href="<%=basePath %>/css/wolkflow/index.css" type="text/css" rel="stylesheet" />
		<link href="<%=basePath %>/css/wolkflow/public.css" type="text/css" rel="stylesheet" />
		<script type="text/javascript" src="<%=basePath%>js/laydate/laydate.js"></script>
		<link href="<%=basePath %>js/fileupload/uploadify.css" type="text/css" rel="stylesheet" />
		<script type="text/javascript" src="<%=basePath%>js/fileupload/jquery.uploadify.min.js"></script>
		<style type="text/css">
		#queue {
		    background-color: #FFF;
		    border-radius: 3px;
		    box-shadow: 0 1px 3px rgba(0,0,0,0.25);
		    height: 300px;
		    margin-bottom: 10px;
		    overflow: auto;
		    padding: 5px 10px;
		    width: 600px;
		}
</style>
	<script type="text/javascript">
	var proInsId="157590";
	$(document).ready(function() {  
		$("#file_upload").uploadify({  
	        'swf' : '<%=basePath %>js/fileupload/uploadify.swf',//控件flash文件位置  
	                       //后台处理的请求（也就是action请求路径），后面追加了jsessionid，用来标示使用当前session（默认是打开新的session，会导致存在session校验的请求中产生302错误）  
	                       'uploader' : '<%=path%>/workflow/'+proInsId+'/filesupload.do',  
	        'queueID' : 'queue',//与下面HTML的div.id对应    
	        'width' : '300',//按钮宽度  
	        'auto': true,
	        'height' : '32',//按钮高度  
	        'fileTypeDesc' : '指定类型文件',  
	        'fileTypeExts' : '*', //控制可上传文件的扩展名，启用本项时需同时声明fileDesc   
	        'fileObjName' : 'file',//文件对象名称,用于后台获取文件对象时使用,详见下面的java代码  
	        'buttonText' : '附件上传',//上传按钮显示内容，还有个属性可以设置按钮的背景图片  
	        'fileSizeLimit' : '80000KB',  
	        'removeCompleted': false,
	        'multi' : true,  
	        'cancelImg':true,
	        'overrideEvents' : [ 'onDialogClose', 'onUploadSuccess', 'onUploadError', 'onSelectError' ],//重写默认方法  
	        'onFallback' : function() {//检测FLASH失败调用  
	        	parent.parent.layer.alert("您未安装FLASH控件，无法上传图片！请安装FLASH控件后再试。");  
	        },  
	        'onSelect' : uploadify_onSelect,  
	        'onSelectError' : uploadify_onSelectError,  
	        'onUploadError' : uploadify_onUploadError,  
	        'onUploadSuccess' : uploadify_onUploadSuccess  
	    });  
	    var uploadify_onSelectError = function(file, errorCode, errorMsg) {  
		    var msgText = "上传失败\n";  
		    switch (errorCode) {  
		    case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:  
		        // this.queueData.errorMsg = "每次最多上传 " +  
		        // this.settings.queueSizeLimit + "个文件";  
		        msgText += "上传的文件数量已经超出系统限制的" + $('#file_upload').uploadify('settings', 'queueSizeLimit') + "个文件！";  
		        break;  
		    case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:  
		        msgText += "文件 [" + file.name + "] 大小超出系统限制的" + $('#file_upload').uploadify('settings', 'fileSizeLimit') + "大小！";  
		        break;  
		    case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:  
		        msgText += "文件大小为0";  
		        break;  
		    case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:  
		        msgText += "文件格式不正确，仅限 " + this.settings.fileTypeExts;  
		        break;  
		    default:  
		        msgText += "错误代码：" + errorCode + "\n" + errorMsg;  
		    }  
		    alert(msgText);  
		};  
		  
		var uploadify_onUploadError = function(file, errorCode, errorMsg, errorString) {  
		    // 手工取消不弹出提示  
		    if (errorCode == SWFUpload.UPLOAD_ERROR.FILE_CANCELLED || errorCode == SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED) {  
		        return;  
		    }  
		    var msgText = "上传失败\n";  
		    switch (errorCode) {  
		    case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:  
		        msgText += "HTTP 错误\n" + errorMsg;  
		        break;  
		    case SWFUpload.UPLOAD_ERROR.MISSING_UPLOAD_URL:  
		        msgText += "上传文件丢失，请重新上传";  
		        break;  
		    case SWFUpload.UPLOAD_ERROR.IO_ERROR:  
		        msgText += "IO错误";  
		        break;  
		    case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:  
		        msgText += "安全性错误\n" + errorMsg;  
		        break;  
		    case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:  
		        msgText += "每次最多上传 " + this.settings.uploadLimit + "个";  
		        break;  
		    case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:  
		        msgText += errorMsg;  
		        break;  
		    case SWFUpload.UPLOAD_ERROR.SPECIFIED_FILE_ID_NOT_FOUND:  
		        msgText += "找不到指定文件，请重新操作";  
		        break;  
		    case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:  
		        msgText += "参数错误";  
		        break;  
		    default:  
		        msgText += "文件:" + file.name + "\n错误码:" + errorCode + "\n" + errorMsg + "\n" + errorString;  
		    }  
		    alert(msgText);  
		}  
		  
		var uploadify_onSelect = function() {  
		  
		};  
		  
		var uploadify_onUploadSuccess = function(file, data, response) {  
		    alert("保存每个文件上传后台返回的相关信息,在onQueueComplete方法中展示");  
		};  
		  
		var uploadify_onQueueComplete = function(){  
		    alert("全部完成-->并展示提示信息");  
		}  
	});
	</script>
	</head>
	<body>
	<div class="main">
	<div class="cont">
    <div class="mangerDiv">
		<form action="<%=path%>/workflow/startProcess.do" id="form" method="post">
		<div align="center">${info.info}</div>
		<div class="tableBox">   
		<table id="pq"  class="tblist">
				<tr>
					<td>
						附件列表:
					</td>
					<td colspan="3">
						<div id="queue"></div><!-- 上传队列展示区-->  
					</td>
				</tr>
				
				<td>附件</td>
					<td colspan="3">
						
    					<input name="uploadify" id="file_upload" type="file" multiple="true"><!-- 批量上传按钮-->  
					</td>
				</tr>
			</table>
	</form>
    </div>
    </div>
	</body>
</html>
