var Referess={};
Referess.trclick=function(obj,guid,name,phone){
	obj.parents("table").find("tr").css("background","");
	obj.css("background","#cbd7fd");
	Referess.guid=guid;
	Referess.name=name;
	Referess.phone=phone;
};
Referess.fulshForm=function(changepage){
	if(!changepage)$('[name=refereesform]').doPage('init');
	var status=$("[name=status]").val();
	$("[name=refereesform]").attr("action","imf/refereesQuery.do?status="+status);//不设这个AA会自动置空！？！？
	//所要提交的表单 
    ajaxAnywhere.formName="refereesform";  
    //所要刷新的区域	 
    ajaxAnywhere.getZonesToReload = function(){  
        return "refereesform";
    }
    ajaxAnywhere.submitAJAX();
    Referess.guid=null;
    Referess.name=null;
    Referess.phone=null;
}

/**
 * 

Relation.del=function(){
	if(!Relation.empcode){
		layer.msg('请选择一条要删除的记录.');
	}else{

		layer.confirm('确定要解除['+decodeURI(decodeURI(Relation.empname))+']的HR人员绑定吗？', {
			btn : [ '确定', '取消' ]
		}, function() {
			$.ajaxdata("imf/deleteRelationStatus.do",{'erpUserguid':Relation.empguid},true,function(data){
				Relation.fulshForm();
				layer.msg(data);
			});
		});
		
	}
}
$(function(){
//	var tree=new ProjTree($(ProjTree.treeDIVId),r_zNodes);
//	tree.bind("#reaprjinput");
	
	var tree=new ProjectTree();
	tree.callbackfunc.onClick=function(e, treeId, treeNode){
		if(treeNode.level>=1){
			$("#reaprjinput").val(treeNode.name);
			$("[name=relationform]").find("#projguidHidden").val(treeNode.value);
			tree.hideMenu();
			//Relation.fulshForm();
		}
	};
//	tree.init(null,r_zNodes);
	tree.init(null,null,"imf/gettreeJson.do");
	tree.bind($("#reaprjinput"));
});

 */