
window.Statisticsform={};
//var setting = {
//	data: {
//		simpleData: {
//			enable: true
//		}
//	},
//	callback: {
//		onClick: onClick
//	}
//};

Statisticsform.fulshTeamLead=function(){
	//所要提交的表单 
    ajaxAnywhere.formName="Statisticsform";  
    //所要刷新的区域	 
    ajaxAnywhere.getZonesToReload = function(){  
        return "statisticsform";
    }
    ajaxAnywhere.submitAJAX();
}



$(function(){
	//$.fn.zTree.init($("#projtree"), setting, zNodes);
//	$("#imagetime").datetimepicker({
//		timepicker:false,
//		format:"Y-m-d"
//	});
	
	var tree=new ProjectTree();
	tree.callbackfunc.onClick=function(e, treeId, treeNode){
		if(!treeNode.nocheck){
			$("[name=statisticsform] #prijselecter").val(treeNode.name);
			$("[name=statisticsform] #projguidHidden").val(treeNode.value);
			tree.hideMenu();
//			fulshTeamLead();
		}
	};
	tree.init(null,null,"imf/gettreeJson.do");
	tree.bind($("[name=statisticsform] #prijselecter"));
	
});