//var ProjTree=function(obj,zNodes){
//	this.treeObj=obj;
//	this.input;
//	this.settingX = {
//			data: {
//				simpleData: {
//					enable: true
//				}
//			},
//			callback: {
//				onClick: ProjTree.onClick
//			}
//	};
//	this.bind=function(input){
//		var func=ProjTree.showTree;
//		$(input).click(func);
//	}
//	
//	$.fn.zTree.init($(ProjTree.treeUlId), this.settingX, zNodes);
//}
//
//ProjTree.treeUlId="#r_projtree";
//ProjTree.treeDIVId="#projtreeDIV";
//
//ProjTree.showTree=function(){
//	var tree=$(ProjTree.treeDIVId);
//	var obj=$(this);
//	var offer=obj.position();
//	//alert(offer.left);
//	tree.css({left:11+offer.left + "px", top:offer.top + obj.outerHeight() + "px"}).slideDown("fast");
//	tree.css("width","286px");
//	$("body").bind("mousedown", ProjTree.onBodyDown);
//};
//ProjTree.onBodyDown=function(event) {
//	if (!(event.target.id == "menuBtn" || event.target.id == "prijselecter" || event.target.id == "menuContent" || $(event.target).parents(".menuContent").length>0)) {
//		ProjTree.hideMenu();
//	}
//};
//ProjTree.hideMenu=function() {
//	var tree=$(ProjTree.treeDIVId);
//	tree.fadeOut("fast");
//	$("body").unbind("mousedown", ProjTree.onBodyDown);
//};
//ProjTree.onClick=function(e, treeId, treeNode){
//	if(!treeNode.nocheck){
//		$("#reaprjinput").val(treeNode.name);
//		$("[name=relationform]").find("#projguidHidden").val(treeNode.value);
//		ProjTree.hideMenu();
//		Relation.fulshForm();
//	}
//}

var Relation={};
Relation.trclick=function(obj,empguid,empcode,empname){
	obj.parents("table").find("tr").css("background","");
	obj.css("background","#cbd7fd");
	Relation.empguid=empguid;
	Relation.empcode=empcode;
	Relation.empname=empname
};
Relation.fulshForm=function(){
	var projid=$("[name=relationform]").find("[name=projGUID]");
	if(!projid.val() || ""==projid.val()){
		layer.msg('请选择项目', {icon: 7});
		return ;
	}
	
	$("[name=relationform]").attr("action","imf/relationQuery.do");//不设这个AA会自动置空！？！？
	//所要提交的表单 
    ajaxAnywhere.formName="relationform";  
    //所要刷新的区域	 
    ajaxAnywhere.getZonesToReload = function(){  
        return "erpform";
    }
    ajaxAnywhere.submitAJAX();
}
Relation.binding=function(){
	if(!Relation.empcode){
		layer.msg('先选择一个要绑定HR系统帐号的员工.');
	}else{
		layer.open({
			  type: 2,
			  title: '系统成员绑定',
			  shadeClose: true,
			  shade: 0.8,
			  area: ['900px', '90%'],
			  content: 'imf/relationBind.do?guid='+Relation.empguid+'&name='+Relation.empname+"&usercode="+Relation.empcode //iframe的url 
			});
	}
}

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

