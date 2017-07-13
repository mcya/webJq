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

Relation.fulshForm=function(){
	var projid=$("[name=form1]").find("[name=scopeid]");
	if(!projid.val() || ""==projid.val()){
		layer.msg('请选择项目', {icon: 7});
		return ;
	}
	
	$("[name=form1]").attr("action","ord/contractinfo.do");//不设这个AA会自动置空！？！？
	//所要提交的表单 
    ajaxAnywhere.formName="form1";  
    //所要刷新的区域	 
    ajaxAnywhere.getZonesToReload = function(){  
        return "listZone";
    }
    ajaxAnywhere.submitAJAX();
}
