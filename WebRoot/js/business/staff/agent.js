

var Agent={};
Agent.trclick=function(obj,name){
	obj.parents("table").find("tr").css("background","");
	obj.css("background","#cbd7fd");
	Agent.name=name;
};
Agent.fulshForm=function(changepage){
	var projGUID=$("[name=agentform]").find("#projguidHidden").val();
	if(!projGUID || ""==projGUID){
		layer.msg('请选择项目', {icon: 7});
		return ;
	}
	if(!changepage)$('[name=agentform]').doPage('init');
	$("[name=agentform]").attr("action","imf/agentQuery.do");//不设这个AA会自动置空！？！？
	//所要提交的表单 
    ajaxAnywhere.formName="agentform";  
    //所要刷新的区域	 
    ajaxAnywhere.getZonesToReload = function(){  
        return "agentform";
    }
    ajaxAnywhere.submitAJAX();
    Agent.name=null;
}
Agent.binding=function(){
	if(!Agent.name){
		layer.msg('先选择一个要绑定代理商.');
	}else{
		layer.open({
			  type: 2,
			  title: '代理商绑定',
			  shadeClose: true,
			  shade: 0.8,
			  area: ['900px', '93%'],
			  content: 'imf/agentQuery.do?hrflag=hr&guid='+Agent.guid+'&name='+Agent.name+"&code="+$("[name=agentform]").find("[name=projcode]").val() //iframe的url 
			});
	}
}

Agent.del=function(){
	if(!Agent.name){
		layer.msg('请选择一条要删除的记录.');
	}else{

		layer.confirm('确定要解除['+decodeURI(decodeURI(Agent.name))+']的HR代理商绑定吗？', {
			btn : [ '确定', '取消' ]
		}, function() {
			$.ajaxdata("imf/delAgentBind.do",{'erpAgency':decodeURI(decodeURI(Agent.name)),'projGUID':$("[name=agentform]").find("#projguidHidden").val()},true,function(data){
				Agent.fulshForm();
				layer.msg(data);
			});
		});
		
	}
}
$(function(){
	var tree=new ProjectTree();
	tree.callbackfunc.onClick=function(e, treeId, treeNode){
//		alert(treeNode.level);
		if(treeNode.level>=1){
			$("#ageprjinput").val(treeNode.name);
			$("[name=agentform]").find("#projguidHidden").val(treeNode.value);
			$("[name=agentform]").find("[name=projcode]").val(treeNode.id);
			Agent.guid=treeNode.value;
			tree.hideMenu();
			Agent.fulshForm();
		}
	}
	tree.init(null,null,"imf/gettreeJson.do?level=2");
	tree.bind($("#ageprjinput"));
});

