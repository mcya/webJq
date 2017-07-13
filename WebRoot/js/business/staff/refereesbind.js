
		var RelationBind={};
		RelationBind.trclick=function(obj,hrcode,hrname){
			obj.parents("table").find("tr").css("background","");
			obj.css("background","#cbd7fd");
			$('[name=hrcode]').val(hrcode);
			$('[name=hrname]').val(hrname);
			$('[name=hrEmpCode]').val(hrcode);
			$('[name=hrEmpName]').val(hrname);
			RelationBind.hrcode=hrcode;
			RelationBind.hrname=hrname;
			
		};
		RelationBind.onClick=function(e, treeId, treeNode){
			$("[name=deptCode]").val("");
			$("[name=companyCode]").val("");
			if(!treeNode.nocheck){
				$("[name=deptCode]").val(treeNode.id);
			}else{
				$("[name=companyCode]").val(treeNode.id);
			}
			RelationBind.fulshForm();
		}
		var func=new Function("AjaxAnywhere.findInstance('default').callback(); ")
		window["default_callbackFunction"]=function(){
	    	func();
			if(window["AjaxAnywhere.default"].req.readyState==4){//完成请求
				//$('.tblistNew').datagrid() //easyui的datagrid实在太卡。。不玩了
				$("#searchInput").keyup();//重新过滤一次表格
			}
	    }
		RelationBind.fulshForm=function(){
			$("#form").attr("action","imf/relationBind.do");//不设这个AA会自动置空！？！？
			//所要提交的表单 
		    ajaxAnywhere.formName="form";  
		    //所要刷新的区域	 
		    ajaxAnywhere.getZonesToReload = function(){  
		        return "dataTable";
		    }
		    ajaxAnywhere.submitAJAX();
		    //alert("OK");
		}
		var setting = {
				data: {
					simpleData: {
						enable: true
					}
				},
				callback: {
					onClick: RelationBind.onClick
				}
		};
		$(function(){
			
			$("#searchInput").blur(function(){$(
				"form [name=Sname]").val($(this).val());
				RelationBind.fulshForm();
			});
			
			$("#searchInput").keypress(function(event){
				if(event.keyCode == "13")    
		        {
					$("form [name=Sname]").val($(this).val());
					RelationBind.fulshForm();
		        }
			});
			$("#submitButton").click(function(){
				var brokerguid=$("[name=brokerguid]").val();
				brokerguid=decodeURI(brokerguid);
				var brokername=$("[name=brokername]").val();
				brokername=decodeURI(brokername);
				var phone=$("[name=phone]").val();
				phone=decodeURI(phone);
				var hrname=RelationBind.hrname;
				var hrcode=RelationBind.hrcode;
		//		alert(brokerguid);
	//			alert(brokername);
	//			alert(phone);
	//			alert(hrname);
	//			alert(hrcode);
				$.ajaxdata("imf/saveReferessbuld.do",{'erpUserguid':brokerguid,'erpUsername':brokername,"erpPhone":phone,"hrEmpName":hrname,"hrEmpCode":hrcode},true,function(data){
					parent.Referess.fulshForm();
					parent.layer.msg(data);
					parent.layer.close(parent.layer.getFrameIndex(window.name));
				});
			});
			
		});