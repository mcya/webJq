
		var RelationBind={};
		RelationBind.trclick=function(obj,hrcode,hrname){
			obj.parents("table").find("tr").css("background","");
			obj.css("background","#cbd7fd");
			
			$('[name=hrcode]').val(hrcode);
			$('[name=hrname]').val(hrname);
			
			
			$('[name=hrEmpCode]').val(hrcode);
			$('[name=hrEmpName]').val(hrname);
			
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
				if(!$('[name=hrEmpCode]').val() || $('[name=hrEmpCode]').val()=="" || !$('[name=hrEmpName]').val() || $('[name=hrEmpName]').val()==""){
					layer.msg('请选择要绑定的HR系统人员', {
						icon: 6
						});
					return ;
				}
				$.post("imf/saveRelationBind.do",$("#saveform").serialize(),function(msg){
					parent.Relation.fulshForm();
					parent.layer.msg(msg);
					parent.layer.close(parent.layer.getFrameIndex(window.name));
				});
			});
			
		});