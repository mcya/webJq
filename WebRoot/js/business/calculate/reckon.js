
window.Reckon={};

Reckon.fulshTeamLead=function(){
	//所要提交的表单 
    ajaxAnywhere.formName="reckonform";  
    //所要刷新的区域	 
    ajaxAnywhere.getZonesToReload = function(){  
        return "reckonform";
    }
    ajaxAnywhere.submitAJAX();
}


$(function(){
	
	var tree=new ProjectTree();
	tree.callbackfunc.onClick=function(e, treeId, treeNode){
		if(!treeNode.nocheck){
			$("[name=reckonform] #prijselecter").val(treeNode.name);
			$("[name=reckonform] #projguidHidden").val(treeNode.value);
			tree.hideMenu();
			Reckon.fulshTeamLead();
		}
	};
	tree.init(null,null,"imf/gettreeJson.do");
	tree.bind($("[name=reckonform] #prijselecter"));
	
});