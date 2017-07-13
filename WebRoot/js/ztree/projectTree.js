
//<div id="menuContent" class="menuContent" style="height:300px;display:none; position: absolute;z-index: 9999999;background-color: white;overflow: auto;">
//		查找:<input style="width: 150px;height: 18px;" onkeyup="$.searchTree($.fn.zTree.getZTreeObj('projtree'),'name',this.value)" />
//		<ul id="projtree" class="ztree" style="margin-top:0; "></ul>
//	</div>

/*
 例子:
 	var tree=new ProjectTree();
 	//初始化回调,具体回调API请参考http://www.ztree.me/v3/api.php
	tree.callbackfunc.onClick=function(e, treeId, treeNode){
		//dosomething...
	};
	//初始化树
	tree.init(null,zNodes,null);//第三个参数为URL，异步加载
	//绑定input
	tree.bind($("#prijselecter"));
 */

if(!ProjectTree)//还得防重定义....
	var ProjectTree=function(body){
	this.treeid="tid_"+parseInt(Math.random()*100000000000000,10);//感觉ztree的内部是根据ID拼串来拿UL对象的，所以必须过滤掉.号
	this.mainDiv=$("<div />");
	this.inputDiv=$("<div />");
	this.ul=$("<ul />");
	this.input=$("<input style='padding-top:10px'/>");
	this.loading=$("<div style='display:none'>加载中...</div>");//有空再弄漂亮点吧
	this.bindInput;
	this.body=body?body:"body";
	window.ProjectTree[this.treeid]=this;
	this.callbackfunc={ //回调函数列表，执行init前先初始化这里的回调
		beforeAsync : null,
		beforeCheck : null,
		beforeClick : null,
		beforeCollapse : null,
		beforeDblClick : null,
		beforeDrag : null,
		beforeDragOpen : null,
		beforeDrop : null,
		beforeEditName : null,
		beforeExpand : null,
		beforeMouseDown : null,
		beforeMouseUp : null,
		beforeRemove : null,
		beforeRename : null,
		beforeRightClick : null,
		onAsyncError : null,
		onAsyncSuccess : null,
		onCheck : null,
		onClick : null,
		onCollapse : null,
		onDblClick : null,
		onDrag : null,
		onDragMove : null,
		onDrop : null,
		onExpand : null,
		onMouseDown : null,
		onMouseUp : null,
		onNodeCreated : null,
		onRemove : null,
		onRename : null,
		onRightClick : null
	};
	/**
	 * 获取ztree对象
	 */
	this.getTreeObj=function(){
		return window.ProjectTree[this.treeid+"_"];
	}
	
	/**
	 * 初始化树
	 * setting
	 * zNodes
	 * callback_onclick  点击的事件函数
	 */
	this.init=function(setting,zNodes,url){
		var oo=this;//当前对象
		this.mainDiv.attr("id","menuContent");
		this.mainDiv.attr("tid",this.treeid);
		this.mainDiv.addClass("menuContent");
		this.mainDiv.attr("style","display:none;position: absolute;z-index: 9999999;background-color: white;border:1px solid #bfbfbf;border-radius:2px;");
		this.inputDiv.attr("style","width:100%;height:38px;background:#f1f1f1;padding-top:5px;");
		this.ul.attr("id",this.treeid);
		this.ul.attr("tid",this.treeid);
		this.ul.attr("style","height:280px;overflow:auto;");
		this.ul.addClass("ztree");
		this.ul.addClass("");
		this.ul.css("margin-top","0");
		this.input.attr("style","display:block;margin:5px auto;margin-top:0;width: 225px;padding:0 10px;padding-right:25px;height: 32px;line-height:34px;border-radius:1px;");
		this.input.attr("placeholder","输入查找的项目名称");
		this.input.addClass("tree");
		this.input.attr("tid",this.treeid);
//		this.input.keyup(function(){
//			$.searchTree(window.ProjectTree[oo.treeid+"_"],'name',$(this)[0].value);
//		});
		
		this.input.bind("input propertychange mousedown",function(){//文本框变更、鼠标按下(兼容小XX)
			$.searchTree(window.ProjectTree[oo.treeid+"_"],'name',$(this)[0].value);
		});
		
		this.mainDiv.html("");
		this.mainDiv.append(this.inputDiv);
		this.inputDiv.append(this.input);
		this.mainDiv.append(this.loading);
		this.mainDiv.append(this.ul);
		$(this.body).append(this.mainDiv);
		
		if(!setting){//没有初始化参数,就默认
			setting={
				data: {
					simpleData: {
						enable: true
					}
				},
				callback: oo.callbackfunc
			};
		}else{
			if(!setting.callback)setting.callback=oo.callbackfunc;
		}
		if(url && !zNodes){
			this.loading.show();
			$.ajaxdata(url,null,true,function(data){
				zNodes=eval(data);
				$.fn.zTree.init(oo.ul, setting, zNodes);
				oo.loading.hide();
				//alert(window.ProjectTree[oo.treeid]);
				
				//树控件
				window.ProjectTree[oo.treeid+"_"]=$.fn.zTree.getZTreeObj(oo.treeid);
				//alert("1:"+ProjectTree.trees[oo.treeid]);
				//alert($.fn.zTree.getZTreeObj(oo.treeid));
				//window.ProjectTree[oo.treeid]=$.fn.zTree.getZTreeObj(oo.treeid);
			});
		}else{
			$.fn.zTree.init(this.ul, setting, zNodes);
		}
		
	};
	
	/**
	 * 绑定input
	 * inputObj 绑定的对象
	 * width 树DIV的宽度
	 * left 左偏移
	 * top 上偏移
	 * abs 使用绝对定位
	 */
	this.bind=function(inputObj,width,left,top,abs){
		var oo=this;
		oo.bindInput=$(inputObj);
//		alert(oo.treeid);
		oo.bindInput.attr("belongtid",oo.treeid);
		$(inputObj).click(function(){
			if(!left)left=1;
			if(!top)top=0;
			var treeDiv=oo.mainDiv;
			var obj=$(this);
			var offer=obj.offset();
			if(abs)offer=obj.position();
			treeDiv.css({left:left+offer.left + "px", top:top+offer.top + obj.outerHeight() + "px"}).show();
			if(!width)width=283;
			treeDiv.css("width",width+"px");
			$(oo.body).bind("mousedown", oo.onBodyDown);
			window.ProjectTree.currTree=oo.treeid;
		});
	};
	
	this.hideMenu=function(){
		var oo=this;
		var tree=oo.mainDiv;
		tree.fadeOut("fast");
		$(oo.body).unbind("mousedown", oo.onBodyDown);
	}
	
	this.onBodyDown=function(event){
		var oo=window.ProjectTree[window.ProjectTree.currTree];
		var tid=$(event.target).parents("[tid="+window.ProjectTree.currTree+"]");
		if(tid.length==0 && event.target.getAttribute("tid")!=window.ProjectTree.currTree){
//			alert("come,"+oo);
			if(oo)oo.hideMenu();
		}
	};	
}


		



