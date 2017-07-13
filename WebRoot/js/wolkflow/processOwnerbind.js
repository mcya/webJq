
		var RelationBind={};
		RelationBind.trclick=function(obj,hrcode,hrname,departmentname){
			obj.parents("table").find("tr").css("background","");
			obj.css("background","#cbd7fd");
			
			$('[name=hrusercode]').val(hrcode);
			$('[name=hrname]').val(hrname);
			$('[name=departmentname]').val(departmentname);
			$('[name=hrEmpCode]').val(hrcode);
			$('[name=hrEmpName]').val(hrname);
			$('[name=hrEmpUserCode]').val(hrcode);
			
		};
		RelationBind.onClick=function(e, treeId, treeNode){
			$("[name=deptCode]").val("");
			$("[name=companyCode]").val("");
			$("[name=level]").val(treeNode.value);
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
			var taskid=$('[name=taskid]').val();
			var level=$('[name=level]').val();
			$("#form").attr("action","workflow/"+taskid+"/"+level+"/processOwnerbindInit.do");//不设这个AA会自动置空！？！？
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
			$.fn.zTree.init($("#projtree"), setting, zNodes);
			var tree=$.fn.zTree.getZTreeObj('projtree');
			tree.expandNode(tree.getNodes()[0],true );
			
			//alert($("#searchBox").length);
			$("#searchInput").keyup(function(){
				//
				$("#dataTable").find("tbody tr").css("display","none");
				$("#dataTable").find("tbody tr:contains("+$.trim($(this).val())+")").css("display","");
				
			});
			$("#submitButton").click(function(){
				if(!$('[name=hrEmpCode]').val() || $('[name=hrEmpCode]').val()=="" || !$('[name=hrEmpName]').val() || $('[name=hrEmpName]').val()==""){
					layer.msg('请选择要绑定的HR系统人员', {
						icon: 6
						});
					return ;
				}
				//parent.parent.layer.alert($('[name=hrEmpUserName]').val());
				$.post("workflow/dosetOwner.do",$("#saveform").serialize(),function(msg){
					//parent.Relation.fulshForm();
					//parent.layer.msg(msg.info);
					parent.layer.close(parent.layer.getFrameIndex(window.name));
				});
			});
			
		});