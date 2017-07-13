var ProjectZtree =function() {	
	this.projTree = null;
	this.treeId = '';
	this.outProjId;
	this.outProjName;
	this.isBind = false;
	
	this.init = function(url){
		this.projTree =new ProjectTree();
		this.projTree.callbackfunc.onClick=this.onClick;
		this.projTree.init(null,null,"imf/gettreeJson.do?_t="+Math.random());
	};
	
	this.onClick = function(e, treeId, treeNode){
		$("#"+temp_Project_Ztree_tree.outProjId).val(treeNode.value);
		$("#"+temp_Project_Ztree_tree.outProjName).val(treeNode.name);
		temp_Project_Ztree_tree.projTree.hideMenu();
	};
	
	this.getProjInfo = function (projId,projName){
		this.outProjId = projId;
		this.outProjName = projName;
		if(!this.isBind){
			this.projTree.bind($("#"+this.outProjName));
			this.isBind = true;
			$("#"+projName).trigger("click");
			//this.getProjInfo(projId,projName);
		}
	};
	
};

var temp_Project_Ztree_tree;
function getProjInfo(projId,projName){
	temp_Project_Ztree_tree.getProjInfo(projId,projName)
}

$(function(){
	temp_Project_Ztree_tree= new ProjectZtree();
	temp_Project_Ztree_tree.init();
});