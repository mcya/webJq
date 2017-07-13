var saleGroup={};
saleGroup.trclick=function(obj,code){
	obj.parents("table").find("tr").css("background","");
	obj.css("background","#cbd7fd");
	saleGroup.code=code;
};

function fulshTeamLead(){
	
	var projGUID=$("[name=salegroupform] #projguidHidden").val();
	if(!projGUID || ""==projGUID){
		layer.msg('请选择项目', {icon: 7});
		return ;
	}
	//所要提交的表单 
    ajaxAnywhere.formName="salegroupform";  
    //所要刷新的区域	 
    ajaxAnywhere.getZonesToReload = function(){  
        return "teamleadform";
    }
    ajaxAnywhere.submitAJAX();
    
    ajaxAnywhere.onAfterResponseProcessing=function(){
    	saleGroup.findTeamByLead($("#saleleadname").val());
    	//alert("aaa");
    }
    //alert("aaa");
    //saleGroup.findTeamByLead($("#saleleadname").val());
}


function findsaleTeam(mgrcode){
	var members=window.saleGroup.members;
	//alert(mgrcode+","+members.length);
	for(var i=0;i<members.length;i++){
		var lead=members[i];
		if(lead && lead.hrEmpCode==mgrcode){
			//循环找领导的小组信息
			var tbody=$("#teamDeatil").find("tbody");
			tbody.html("");
			var memcount=lead.culNum;
			var tr=$("<tr />")
			.append($("<td />").html(lead.hrEmpCode)) //组长工号
			.append($("<td />").html(lead.hrEmpName)) //组长姓名
			.append($("<td />").html("")) //组长手机
			.append($("<td />").html("组长")); //队员类型
			tbody.append(tr);
			for(var j=0;j<memcount;j++){
				var member=lead.memberlist?lead.memberlist[j]:null;//拿到队员信息,一个队员一个<tr>
				if(member){
				var tr=$("<tr />")
							.append($("<td />").html(member.hrEmpCode)) //队员工号
							.append($("<td />").html(member.hrEmpName)) //队员姓名
							.append($("<td />").html("")) //队员手机
							.append($("<td />").html("成员")); //队员类型
				tbody.append(tr);
				}
			}
			break;
		}
	}
}
//销售小组解绑大项目
$("#jiechu").click(function() {
	var projguid = $("[name=salegroupform] #projguidHidden").val();
	if(!saleGroup.code||projguid==""){
		layer.open({
			content:'请勾选需要解绑的小组',
			icon:2,
			btn: ['确定']
		});
	}else{
		$.ajaxdata("imf/saveDelete.do",{'teamCode':saleGroup.code,'projguid':projguid},true,function(data){
			fulshTeamLead();
			layer.msg(data);
		});
	}
});

//根据组长筛选
saleGroup.findTeamByLead=function(leadname){
	if(leadname && leadname!=null){
		$("#teamTable").find("tbody tr").css("display","none");
		var tr=$("#teamTable").find("tbody tr").each(function(){
		//	alert($(this).prop("tagName")); 
			if($(this).find("td:eq(3)").html().indexOf(leadname)!=-1)
			$(this).css("display","");
		});
		
	}else{
		$("#teamTable").find("tbody tr").css("display","");
	}
}
//筛选是否绑定大项目
saleGroup.isBigProj=function(isproj){
	if(isproj && isproj!=null){
		$("#teamTable").find("tbody tr").css("display","none");
		var tr=$("#teamTable").find("tbody tr").each(function(){
			if($(this).find("td:eq(5)").html().indexOf(isproj)!=-1)
			$(this).css("display","");
		});
	}else{
		$("#teamTable").find("tbody tr").css("display","");
	}
};

$(function(){
	//$.fn.zTree.init($("#projtree"), setting, zNodes);
//	$("#imagetime").datetimepicker({
//		timepicker:false,
//		format:"Y-m-d"
//	});
	
	var tree=new ProjectTree();
	tree.callbackfunc.onClick=function(e, treeId, treeNode){
		if(treeNode.level>=1){
			$("[name=salegroupform] #prijselecter").val(treeNode.name);
			$("[name=salegroupform] #projguidHidden").val(treeNode.value);
			tree.hideMenu();
			fulshTeamLead();
		}
	};
	tree.init(null,null,"imf/gettreeJson.do?level=2");
	tree.bind($("[name=salegroupform] #prijselecter"));
	
});