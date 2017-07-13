   /*
   var treeNodes = [
		{ id:1, pId:0, name:"随意勾选 1", open:true},
		{ id:11, pId:1, name:"随意勾选 1-1", open:true},
		{ id:111, pId:11, name:"随意勾选 1-1-1"},
		{ id:112, pId:11, name:"随意勾选 1-1-2"},
		{ id:12, pId:1, name:"随意勾选 1-2", open:true},
		{ id:121, pId:12, name:"随意勾选 1-2-1"},
		{ id:122, pId:12, name:"随意勾选 1-2-2"},
		{ id:2, pId:0, name:"随意勾选 2", checked:true, open:true},
		{ id:21, pId:2, name:"随意勾选 2-1"},
		{ id:22, pId:2, name:"随意勾选 2-2", open:true},
		{ id:221, pId:22, name:"随意勾选 2-2-1", checked:true},
		{ id:222, pId:22, name:"随意勾选 2-2-2"},
		{ id:23, pId:2, name:"随意勾选 2-3"}
	];
	*/
   var setting = {
	data: {
		simpleData: {
			enable: true
		}
	},
	check: {
			enable: true
		},
	callback: {
		onClick: onClick,
		onCheck: onCheck,
		beforeCheck: beforeCheck
	}
};
var basePath = '';
var treeId;
function initTree(treeTarget,treeNodes){
	treeId = treeTarget;
	$.fn.zTree.init($("#"+treeTarget), setting, treeNodes);
	var zTree = $.fn.zTree.getZTreeObj(treeTarget);
    zTree.setting.check.chkboxType = { "Y":"p", "N":"ps"};
}

function onClick(e, treeId, treeNode) {
	//如果不是公司结点,并且无下级结点表示该节点为项目节点就LOAD项目下的楼栋
	if(!treeNode.isCompany && !treeNode.isParent){
		$("div[name='bldRoomView']").css("display","none");
		loadProjBld(treeNode.value,treeNode.name);
	}
}

function onCheck(e, treeId, treeNode){
	//如果取消了公司或项目,分期的选择则要清除其下所有楼栋及房间的选中
	if(!treeNode.checked){
		cleanProjBld();
	}else if(!treeNode.isCompany && !treeNode.isParent){
		//如果切换项目则隐藏其它楼栋,及房间信息
		$("div[name='bldRoomView']").css("display","none");
		loadProjBld(treeNode.value,treeNode.name);
	}
}

function beforeCheck(treeId, treeNode) {
	if(treeNode.checked){//true表示原来是选中现在取消
		if(!treeNode.isCompany && !treeNode.isParent ){//本身就是叶子节点项目
			cleanProjBld(treeNode.value);
		}else{
			var zTree = $.fn.zTree.getZTreeObj(treeId);
			var checkNodes =  zTree.getNodesByParam("checked", true, treeNode);
			$.each(checkNodes,function(i,node){
				if(!node.isCompany && !node.isParent ){
					cleanProjBld(node.value);
				}
			});
		}
	}
	return null;
}
	
  //加载项目楼栋
  function loadProjBld(projGUID,projName){
   var buildDivId = projGUID+"_ProjectViewDiv";
   $("div[name='projectBuildViewDiv']").css("display","none");
   if($('#'+buildDivId).length > 0){
   		$('#'+buildDivId).show();
   		return;
   }
  	showBldView(projGUID,projName);
  }
  
  function showBldView(projGUID,projName){
  var buildDivId = projGUID+"_ProjectViewDiv";
  //创建一个新的项目楼栋信息展示域
   	 $('#projBuildDiv').append("<div name='projectBuildViewDiv' projid='"+projGUID+"' id="+buildDivId+">"+projName+"<br></div>");
  	var url = basePath+"/building/queryMapByProjGUID.do";
	$.ajax({
	   async: false,	
	   type: "POST",
	   url: url,
	   data: {'projGUID':projGUID},
	   dataType: 'JSON',
	   success: function(respData){
		 if(respData.success == 'true'){
		   	 buildBldView(projGUID,projName,respData.dataList);
	   	 }else{
	   	 	alert(respData.error);
	   	 }
	   }
	});
  }
  
  function buildBldView(projGUID,projName,bldData){
  	 //隐藏所有楼栋DIV
   	 var buildDivId = projGUID+"_ProjectViewDiv";
   	 
 	var projectBuildHtml = "";
 	if(undefined == bldData){
 		projectBuildHtml="<font color='red'>没找到相关楼栋数据</font>";
 		alert('没找到相关楼栋数据');
 		//$('#'+buildDivId).remove()//暂时注释,有需要时可放开(放开后就是对于没楼栋数据的项目每次都会新建一个
 	}else{
		$.each(bldData,function(i,node){
			projectBuildHtml += "<div class='checkBor'><a class='inputBtn' href='javascript:void(null)' ><input type='checkbox' name='bldCheckbox' id='"+node.bldguid+"'";
			projectBuildHtml += " projid='"+projGUID+"'";
			projectBuildHtml += " bldid='"+node.bldguid+"'";
			projectBuildHtml += " onclick='loadBldRoom(this)'";
			projectBuildHtml += " value='"+node.bldguid+"'";
			projectBuildHtml += " bldname='"+node.bldname+"'";
			projectBuildHtml += " /></a><a href='javascript:void(0)' onclick=showBldRoom('"+projGUID+"','"+node.bldguid+"');> "+node.bldname+"</a></div>";
		});
 	}
 	$('#'+buildDivId).append(projectBuildHtml);
 	litileTools();//为选中CHECKBOX效果
  }
  
  //加载楼栋房间信息
  function loadBldRoom(bldObject){
  	var projid = $(bldObject).attr('projid');
  	var bldid = bldObject.value;
  	if(bldObject.checked){
  		showBldRoom(projid,bldid);
  		//如果选中楼栋那么就要选中他所在的上级(分期,项目,公司)
  		checkProjByBldCheck(projid);
  	}else{
  		cleanRoom(projid,bldid);
  	}
  }
  
  //展示楼栋房间
  function showBldRoom(projGUID,bldGUID){
  //隐藏所在单元,楼层,房间显示域
  	$("div[name='bldRoomView']").css("display","none");
  	
  	var bldUnitViewID = bldGUID+"_UnitViewDiv";
  	var bldFloorViewID = bldGUID+"_FloorViewDiv";
  	var bldRoomViewID = bldGUID+"_RoomViewDiv";
  	var bldRoomDataID = bldGUID+"_RoomDataDiv";
  //如果已经存在楼栋房间信息则显示
  	if($('#'+bldRoomDataID).length !== 0){
  		$('#'+bldUnitViewID).show();
  		$('#'+bldFloorViewID).show();
  		$('#'+bldRoomViewID).show();
  		return ;
  	}
  	
  	//新建一个域保存楼栋房间所有信息
  	$('#bldDataDiv').append("<div id='"+bldRoomDataID+"' ></div>");
  	//新建一个楼栋单元展示域
  	$('#bldUnitDiv').append("<div name='bldRoomView' projid='"+projGUID+"' bldid='"+bldGUID+"' id='"+bldUnitViewID+"' ></div>");
  	//新建一个楼栋楼层展示域
  	$('#bldFloorDiv').append("<div name='bldRoomView' projid='"+projGUID+"' bldid='"+bldGUID+"' id='"+bldFloorViewID+"' ></div>");
  	//新建一个楼栋房间展示域
  	$('#bldRoomDiv').append("<div name='bldRoomView' projid='"+projGUID+"' bldid='"+bldGUID+"' id='"+bldRoomViewID+"' ></div>");
  	var url = basePath+"/room/queryMapByBldGUID.do";
  	$.ajax({
  	   async: false,	
	   type: "POST",
	   url: url,
	   data: {'bldGUID':bldGUID},
	   dataType: 'JSON',
	   success: function(respData){
		   	 if(respData.success == 'true'){
		   	 buildRoomView(respData.roomData,projGUID,bldGUID);
	   	 }else{
	   	 	alert(respData.error);
	   	 }
	   }
	});
	
  }
  
  //构造楼栋房间的数据,单元,楼层,房间展示层
function buildRoomView(roomData,projGUID,bldGUID){
  	var bldUnitViewID = bldGUID+"_UnitViewDiv";
  	var bldFloorViewID = bldGUID+"_FloorViewDiv";
  	var bldRoomViewID = bldGUID+"_RoomViewDiv";
  	var bldRoomDataID = bldGUID+"_RoomDataDiv";
  	
 	var unitHtml = "";
 	var floorHtml = "";
 	var roomHtml = "";
 	if(undefined == roomData || '' == roomData){
 		roomHtml="<font color='red'>没找到相关房间数据</font>";
 		alert('没找到相关房间数据');
 		//$('#'+bldRoomDataID).remove()//暂时注释,有需要时可放开(放开后就是对于没房间数据的楼栋每次都会新建一个
 	}else{
 		//$('#'+bldRoomDataID).val(roomData);//保留楼栋下所以房间数据 暂不需要设值需要时可放开
 		var unitNodes = roomData.unitSet;
 		var floorNodes = roomData.floorSet;
 		var roomNodes = roomData.roomList;
 		$.each(unitNodes,function(i,node){
 			unitHtml += "<div class='checkBor'><a class='inputBtn' href='javascript:void(null)' ><input type='checkbox' name='unitCheckbox' onclick='unitChange(this)' ";
 			unitHtml += " value='"+node+"' ";
 			unitHtml += " projid='"+projGUID+"' ";
 			unitHtml += " buildid='"+bldGUID+"' ";
 			unitHtml += " unitid='"+node+"' ";
 			unitHtml += " /></a>"+node+"</div>";
 		});
 		$('#'+bldUnitViewID).append(unitHtml);
 		
 		$.each(floorNodes,function(i,node){
 			floorHtml += "<div class='checkBor'><a class='inputBtn' href='javascript:void(null)' ><input type='checkbox' name='floorCheckbox' onclick='floorChange(this)' ";
 			floorHtml += " value='"+node+"'";
 			floorHtml += " projid='"+projGUID+"' ";
 			floorHtml += " buildid='"+bldGUID+"' ";
 			floorHtml += " floorid='"+node+"' ";
 			floorHtml += " /></a>"+node+"</div>";
 		});
 		$('#'+bldFloorViewID).append(floorHtml);
 		
 		var curFloor = '';
 		$.each(roomNodes,function(i,node){
 			if(curFloor != '' && curFloor != node.floor){
 				roomHtml += "<br>";
 			}
 			curFloor = node.floor;
 			roomHtml += "<div class='checkBor ul_list'><a class='inputBtn' href='javascript:void(null)' ><input type='checkbox' name='roomCheckbox' onclick='roomChange(this)' ";
 			roomHtml += " value='"+node.roomguid+"'";
 			roomHtml += " id='"+node.roomguid+"'";
 			roomHtml += " projid='"+projGUID+"' ";
 			roomHtml += " buildid='"+bldGUID+"' ";
 			roomHtml += " unitid='"+node.unit+"' ";
 			roomHtml += " floorid='"+node.floor+"' ";
 			roomHtml += " roomid='"+node.roomguid+"' ";
 			roomHtml += " roomname='"+node.room+"' ";
 			roomHtml += " /></a>"+node.room+"</div>";
 			
 		});
 	}
 	$('#'+bldRoomViewID).append(roomHtml);
 	litileTools();//为选中CHECKBOX效果
  }
  
  function cleanRoom(projGUID,bldGUID){
  	$("input[name='unitCheckbox'][projid='"+projGUID+"'][buildid='"+bldGUID+"']").prop("checked","");
	$("input[name='floorCheckbox'][projid='"+projGUID+"'][buildid='"+bldGUID+"']").prop("checked","");
	$("input[name='roomCheckbox'][projid='"+projGUID+"'][buildid='"+bldGUID+"']").prop("checked","");
  }
  
  	
function cleanProjBld(projGUID){
	//所有项目下所有房间单元,楼层,房间选择
	$("input[name='unitCheckbox'][projid='"+projGUID+"']").prop("checked","");
	$("input[name='floorCheckbox'][projid='"+projGUID+"']").prop("checked","");
	$("input[name='roomCheckbox'][projid='"+projGUID+"']").prop("checked","");
	//取消所有项目下所有楼栋选择
	$("input[name='bldCheckbox'][projid='"+projGUID+"']").prop("checked","");
	//隐藏单元,楼层,房间展示域
	$("div[name='bldRoomView'][projid='"+projGUID+"']").css("display","none");
	//隐藏楼栋展示域
	$("div[name='projectBuildViewDiv'][projid='"+projGUID+"']").css("display","none");
	
}
  
  
  function unitChange(unitCheckbox){
  	//如果选中了单元,那就就要选中他所在上级
  	var projid = $(unitCheckbox).attr('projid');
  	var buildid = $(unitCheckbox).attr('buildid');
  	var unitid = $(unitCheckbox).val();
  	$("input[type='checkbox'][name='roomCheckbox'][projid='"+projid+"'][buildid='"+buildid+"'][unitid='"+unitid+"']").prop('checked',unitCheckbox.checked);
  	if(unitCheckbox.checked){
  		checkBldFloorOrUnitCheck(projid,buildid);
  		$("input[type='checkbox'][name='roomCheckbox'][projid='"+projid+"'][buildid='"+buildid+"'][unitid='"+unitid+"']").parent().addClass("on");
  	}else{
  		$("input[type='checkbox'][name='roomCheckbox'][projid='"+projid+"'][buildid='"+buildid+"'][unitid='"+unitid+"']").parent().removeClass("on");
  	}
  }
   
  function floorChange(floortCheckbox){
  	var projid = $(floortCheckbox).attr('projid');
  	var buildid = $(floortCheckbox).attr('buildid');
  	var floouid = $(floortCheckbox).val();
  	$("input[type='checkbox'][name='roomCheckbox'][projid='"+projid+"'][buildid='"+buildid+"'][floorid='"+floouid+"']").prop('checked',floortCheckbox.checked);
  	if(floortCheckbox.checked){
  		checkBldFloorOrUnitCheck(projid,buildid);
  		$("input[type='checkbox'][name='roomCheckbox'][projid='"+projid+"'][buildid='"+buildid+"'][floorid='"+floouid+"']").parent().addClass("on");
  	}else{
  		$("input[type='checkbox'][name='roomCheckbox'][projid='"+projid+"'][buildid='"+buildid+"'][floorid='"+floouid+"']").parent().removeClass("on");
  	}
  }
  
  function roomChange(roomCheckbox){
  	var projGUID = $(roomCheckbox).attr("projid");
  	var bldGUID = $(roomCheckbox).attr("buildid");
  	var floor = $(roomCheckbox).attr("floorid");
  	var unit = $(roomCheckbox).attr("unitid");
  	if(roomCheckbox.checked){
  		checkUnitOrFloorByRoomCheck(projGUID,bldGUID,floor,unit);
  	}
  }
  
  //房间被选中时,选中其上级单元,楼层
  function checkUnitOrFloorByRoomCheck(projGUID,bldGUID,floor,unit){
  	$("input[name='unitCheckbox'][projid='"+projGUID+"'][buildid='"+bldGUID+"'][unitid='"+unit+"']").prop("checked","checked").parent().addClass("on");
  	$("input[name='floorCheckbox'][projid='"+projGUID+"'][buildid='"+bldGUID+"'][floorid='"+floor+"']").prop("checked","checked").parent().addClass("on");
  	//触发 选中其上级楼栋
  	checkBldFloorOrUnitCheck(projGUID,bldGUID);
  }
  //选中楼层或单元时要选中其上级楼栋
  function checkBldFloorOrUnitCheck(projGUID,bldGUID){
  	$("input[name='bldCheckbox'][projid='"+projGUID+"'][bldid='"+bldGUID+"']").prop("checked","checked").parent().addClass("on");
  	//触发 选中其上级项目
  	checkProjByBldCheck(projGUID);
  }
  //选中楼栋时要选中其上级项目
  function checkProjByBldCheck(projGUID){
  	var zTree = $.fn.zTree.getZTreeObj(treeId);
  	var node = zTree.getNodeByParam("value",projGUID);
  	zTree.checkNode(node, true, true);
  }


 function initScope(scopeNodes){
 var zTree = $.fn.zTree.getZTreeObj(treeId);
 	$.each(scopeNodes,function(i,node){
 		if(node.scopetype == "company"){
 			var treeNode = zTree.getNodeByParam("value", node.buid, null);
 			if(undefined != treeNode && null != treeNode){
 				zTree.checkNode(treeNode, true, true);
 			}
 		}else if(node.scopetype == "fenqi"){
 			var treeNode = zTree.getNodeByParam("value", node.projid, null);
 			if(undefined != treeNode && null != treeNode){
 				zTree.checkNode(treeNode, true, true);
 			}
 		}else if(node.scopetype == "project"){
 			var treeNode = zTree.getNodeByParam("value", node.projid, null);
 			if(undefined != treeNode && null != treeNode){
 				zTree.checkNode(treeNode, true, true);
 			}
 		}else if(node.scopetype == "building"){
 			var treeNode = zTree.getNodeByParam("value", node.projid, null);
 			if(undefined != treeNode && null != treeNode){
				loadProjBld(node.projid,treeNode.name);
	 			$("input[name='bldCheckbox'][projid='"+node.projid+"'][bldid='"+node.bldid+"']").parent().addClass("on");
	 			$("#"+node.bldid).trigger("click");
 			}
 		}else if(node.scopetype == "room"){
 			var treeNode = zTree.getNodeByParam("value", node.projid, null);
 			if(undefined != treeNode && null != treeNode){
				loadProjBld(treeNode.value,treeNode.name);
				showBldRoom(node.projid,node.bldid);
				bindRoomAndAncertor(node,zTree);
				/*
	 			$("input[type='checkbox'][name='roomCheckbox'][projid='"+node.projid+"'][buildid='"+node.bldid+"'][roomid='"+node.roomid+"']").trigger("click");
				$("input[type='checkbox'][name='roomCheckbox'][projid='"+node.projid+"'][buildid='"+node.bldid+"'][roomid='"+node.roomid+"']").parent().addClass("on");
				*/
			}
 		}
 	});
 }
	//解决当选择很多房间IE8下会提示页面脚本造成WEB浏览器运行缓慢问题 
	function bindRoomAndAncertor(node,zTree){
		var treeNode = zTree.getNodeByParam("value", node.projid, null);
		if(undefined != treeNode && null != treeNode){
			//选中项目
			zTree.checkNode(treeNode, true, true);
			//选中楼栋
			$("#"+node.bldid).parent().addClass("on");
			$("#"+node.bldid).prop('checked','checked');
			//选中房间
			$("#"+node.roomid).parent().addClass("on");
			$("#"+node.roomid).prop('checked','checked');
			
			//根据选中的房间选中楼层，及单元
			
			var unit = $("#"+node.roomid).prop('unitid')
			var floor = $("#"+node.roomid).prop('floorid')
			var bldUnitViewID = node.bldid+"_UnitViewDiv";
  			var bldFloorViewID = node.bldid+"_FloorViewDiv";
			
			$("input[name='unitCheckbox'][buildid='"+node.bldid+"'][unitid='"+unit+"']",$('#'+bldUnitViewID)).prop("checked","checked").parent().addClass("on");
  			$("input[name='floorCheckbox'][buildid='"+node.bldid+"'][floorid='"+floor+"']",$('#'+bldFloorViewID)).prop("checked","checked").parent().addClass("on");
  			
  			
  		}
	}

  //生成范围
  function genScope(){
   	var companyNodes = new Array();//公司级
   	var fqProjectNodes = new Array();//分期
   	var projectNodes = new Array();//项目级
   	var resultprojectNodes = new Array();//最后真正项目级(该项目下没有选择有相应楼栋)
   	var bldNodes = new Array();	//楼栋级
   	var roomNodes = new Array();//房间级
   	
   	var scopeNodes = new Array();
   	var zTree = $.fn.zTree.getZTreeObj("projTree");
   	var nodes = zTree.getCheckedNodes(true);
   	
   	var companyNames = new Array();
   	var projNames = new Array();
   	var bldNames = new Array();
   	var roomNames = new Array();
   	$.each(nodes,function(i,node){
   		//alert("have children:"+zTree.getNodeByParam("checked", true, node));
   		if(node.isCompany == true && zTree.getNodeByParam("checked", true, node) == null ){
   			companyNodes.push(node);
   			var scopeNode = new Object();
   			scopeNode.scopetype = "company";
   			scopeNode.buid = node.value;
   			scopeNode.projid = "";
   			scopeNode.bldid = "";
   			scopeNode.roomid = "";
   			scopeNodes.push(scopeNode);
   			
   			companyNames.push(node.name);
   		}else if(node.isCompany != true && node.isParent  && zTree.getNodeByParam("checked", true, node) == null  ){
   			fqProjectNodes.push(node);
   			var scopeNode = new Object();
   			scopeNode.scopetype = "fenqi";
   			scopeNode.buid = "";
   			scopeNode.projid = node.value;
   			scopeNode.bldid = "";
   			scopeNode.roomid = "";
   			scopeNodes.push(scopeNode);
   			
   			projNames.push(node.name);
   		}else if(node.isCompany != true && !node.isParent ){
   			projectNodes.push(node);
   		}
   	});
   	
   //把没有选楼栋的项目加到最终项目数组
   $.each(projectNodes,function(i,node){
   		var bldCheckBoxs = $("input[type='checkbox'][name='bldCheckbox'][projid='"+node.value+"']:checked");
   		if(bldCheckBoxs.length == 0){
   			resultprojectNodes.push(node);
   			var scopeNode = new Object();
   			scopeNode.scopetype = "project";
   			scopeNode.buid = "";
   			scopeNode.projid = node.value;
   			scopeNode.bldid = "";
   			scopeNode.roomid = "";
   			scopeNodes.push(scopeNode);
   			
   			projNames.push(node.name);
   		}else{
   			//取只选了楼栋没选房间的楼栋
   			$.each(bldCheckBoxs,function(i,bldCheckBox){
   				var projid= $(bldCheckBox).attr("projid");
   				var bldid= $(bldCheckBox).attr("bldid");
   				if($("input[type='checkbox'][name='roomCheckbox'][projid='"+projid+"'][buildid='"+bldid+"']:checked").length == 0){
   					bldNodes.push(bldCheckBox);
   					var scopeNode = new Object();
		   			scopeNode.scopetype = "building";
		   			scopeNode.buid = "";
		   			scopeNode.projid = $(bldCheckBox).attr("projid");
		   			scopeNode.bldid = bldCheckBox.value;
		   			scopeNode.roomid = "";
		   			scopeNodes.push(scopeNode);
		   			
		   			bldNames.push($(bldCheckBox).attr("bldname"));
   				}
   			});
   		}
   });
   
   
   //取所有选中的房间信息
   roomNodes = $("input[type='checkbox'][name='roomCheckbox']:checked");
   $.each(roomNodes,function(i,node){
   		var scopeNode = new Object();
		scopeNode.scopetype = "room";
		scopeNode.buid = "";
		scopeNode.projid = $(node).attr("projid");
		scopeNode.bldid = $(node).attr("buildid");
		scopeNode.roomid = node.value;
		scopeNodes.push(scopeNode);
		
		roomNames.push( $(node).attr("roomname"));
   });
   	$('#scope').html(JSON.stringify(scopeNodes));
   	parent.setScope(JSON.stringify(scopeNodes),companyNames,projNames,bldNames,roomNames)
   	var index = parent.layer.getFrameIndex(window.name);
 	parent.layer.close(index);
   	//return JSON.stringify(scopeNodes)+"|"+companyNames+projNames+bldNames+roomNames;
  }