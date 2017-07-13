var ProjectZtree =function() {	
	this.projTree = null;
	this.treeId = '';
	this.outProjId;
	this.outProjName;
	this.isBind = false;
	
	this.init = function(url){
		this.projTree =new ProjectTree();
		this.projTree.callbackfunc.onClick=this.onClick;
		if(undefined == url || null == url || '' == url){
			this.projTree.init(null,null,"imf/gettreeJson.do?_t="+Math.random());
		}else{
			this.projTree.init(null,null,url);
		}
	};
	
	this.onClick = function(e, treeId, treeNode){
		$("#"+temp_Project_Ztree_tree.outProjId).val(treeNode.value);
		$("#"+temp_Project_Ztree_tree.outProjName).val(treeNode.name);
		temp_Project_Ztree_tree.projTree.hideMenu();
		diyZtreeClick(e, treeId, treeNode);
	};
	
	this.getProjInfo = function (projId,projName){
		this.outProjId = projId;
		this.outProjName = projName;
		if(!$('#'+projId).prop('isBind')){
			this.projTree.bind($("#"+this.outProjName));
			this.isBind = true;
			$('#'+projId).prop('isBind',true);
			$("#"+projName).trigger("click");
		}
	};
	
};

function diyZtreeClick(e, treeId, treeNode){

}
var temp_Project_Ztree_tree;
function getProjInfo(projId,projName){
	temp_Project_Ztree_tree.getProjInfo(projId,projName)
}

function getTreeInitUrl(){
	return '';
}
$(function(){
	temp_Project_Ztree_tree= new ProjectZtree();
	temp_Project_Ztree_tree.init(getTreeInitUrl());
});