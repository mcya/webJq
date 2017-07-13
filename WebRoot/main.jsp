<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/inc/head.inc" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>时代地产</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<script type="text/javascript" src="<%=basePath %>/js/yjIndex.js"></script>
    <script type="text/javascript" src="<%=basePath %>/js/jquery.placeholder.min.js"></script>
    <script type="text/javascript" src="<%=basePath %>/js/common.js"></script>
    <script type="text/javascript" src="<%=basePath %>/js/datetimepicker/build/jquery.datetimepicker.full.js"></script>
    <link rel="stylesheet" type="text/css" href="<%=basePath %>/js/datetimepicker/jquery.datetimepicker.css"/>
	<link href="<%=basePath %>/css/yj_index.css" type="text/css" rel="stylesheet" />
	<link href="<%=basePath %>/css/animate.css" type="text/css" rel="stylesheet" />
	
	
	
	<script type="text/javascript">
	$.ajaxSetup ({ 
	    cache: false //关闭AJAX相应的缓存 
	}); 
    $(function() {
        var tabs = new timesTabs.Tabs({
            id: 'tabBox1'
        });
        //自适应高度
        var bodyHeight = document.documentElement.clientHeight;
        var h = bodyHeight - 42 - 60;
        $(tabs.contStack).css('height', h + 'px');
        $(window).resize(function() {
            var bodyHeight = document.documentElement.clientHeight
            var h = bodyHeight - 42 - 60;
   /*       var tabs = new timesTabs.Tabs({
                id: 'tabBox1'
            });
    */  
         $(tabs.contStack).css('height', h + 'px');
        });
        window.tabs = tabs;
        
        $(".menuList").find("li").each(function(){
			$(this).click(function(){
				//遍历取消所有选择


				$(".menuList").find("li").each(function(){
					$(this).removeClass("on");
				});
				$(this).addClass("on");
				tabs.addItem($(this).find('span').html(), $(this).attr("turl"),$(this).attr("load"));
			});
    	});
    });

    function addTabItem() {

        tabs.addItem('新增tab', 'http://www.baidu.com');
   		  
    }
    $(function() {
        new timesTabs.Tabs({
            id: 'tabBox11'
        });
    });
    $(function() {
        new timesTabs.Tabs({
            id: 'tabBox21'
        });
    });

	
    //绑定自动搜索功能
    $(function() {
        $(".winMagerCss>input").keydown(function(e) {
            var obj = event.srcElement ? event.srcElement : event.target;
            tabs.tabManager($(obj).val());
        });
    });
    function loginout(){
		//$.messager.confirm('注意', '确定退出登录?', function(r){
		//		if (r){
		//			window.location.href='<%=basePath %>bus/logout.do';
		//		}
		//});
    	layer.confirm('确定退出登录?', {
   		  btn: ['确定','取消'] //按钮
   		}, function(){
   			window.location.href='<%=basePath %>bus/logout.do';
   		});
	}
	
	function showContentFrame(title,srcURL,height,width){
		$('#winTitle').html(title);
		$('#contentFrame').attr('src',srcURL);
		if(undefined != height && null != height){
			$('#deWin').css("height",height);
			$('#contentFrame').css("height",height);
		}
		if(undefined != height && null != height){
			$('#deWin').css("width",width);
			$('#contentFrame').css("width",width);
		}
		showBusiwin('deWin');
	}
	
	function hidenContentFrame(){
		$('#contentFrame').attr('src','');
		hideBusiwin('deWin');
	}



	
    </script>
  </head>
  
  <body style="overflow: hidden;">
  	<!--左侧菜单-->
    <div class="leftMenuPanel">
        <div class="logoDiv">
            <img src="images/yjLogo.png">
        </div>
        <div class="userinf">
            <div class="infCont clearfix">
                <div class="hd_icobg"> <img src="images/minHd.png"></div>
                <div class="htext">
                    <span class="hName"><shiro:principal property="username"/></span>
                    <a class="dBtn"></a>
           <!--     <a class="userTips" id="userTips"><span>3</span></a>  --> 
                </div>
            </div>
        </div>
        <div class="menuList">
            <ul>
            	<li class="on" turl="http://localhost//TimesCommision"><a class="menuAt1"><span>我的工作台</span></a></li>
         		<li turl="<%=basePath %>workflow/workflowInit.do" ><a class="menuAt5"><span>工作流管理</span></a></li>
            	<li turl="<%=basePath %>businessparam/goBusinessParam.do" ><a class="menuAt7"><span>业务系统参数</span></a></li>
            	<li turl="<%=basePath %>yjplanset/goPlanQuery.do" ><a class="menuAt4"><span>佣金方案设置</span></a></li>
                <li turl="imf/init.do" load="1"><a class="menuAt2"><span>信息管理</span></a></li>
                <li turl="<%=basePath %>ord/yjorder.do" ><a class="menuAt3"><span>订单管理</span></a></li>
                <%--<li turl="cul/init.do" load="1"><a class="menuAt5"><span>佣金计算</span></a></li>--%>
                <li turl="<%=basePath %>tzmanager/goTabs.do" ><a class="menuAt6"><span>佣金台账</span></a></li>
                
                
            </ul>
        </div>
    </div>
    <!--右侧内容-->
    <div class="rightCont">
        <div class="topTool clearfix">
            <a class="back" onclick="loginout();"><span></span>
            </a>
   <!--     <a class="setting"><span></span>
            </a>
            <a class="weixin"><span></span>
                 <div class="msgTips" id="msgTips"><em>3</em></div>
            </a>
            <a class="sharde"><span></span>
            </a>
    -->    
        </div>
        <div class="contentPanel">
            <div class="tabBox" id="tabBox1">
                <span class="minAwr" onclick="toggelNewEle(this)"></span>
                <div class="winMagerCss block">
                    <input name="" type="text" value="">
                    <a class="searchMgr"></a>
                    <ul>
                        
                    </ul>
                </div>
                <!--–[if lte IE 7]-->
                <div></div>
                <!--[endif]–-->
	                <div class="timesTab tabTitle" style="overflow: hidden;padding-right:63px;">
	                    <div style="zoom: 1;" class="clearfix" style="margin-left:-10px;">
	     
	                    </div>
	                        <div class="lMoveBtn" onclick="tabs.movetoLeft();"></div>
	                        <div class="rMoveBtn" onclick="tabs.movetoRight();"></div> 
							<b></b>
						 <div style="position:fixed;top:62px;left:221px;width:21px;height:40px;background:#F3F3F3;"></div>  
	                </div>
                <div id="timesCon" class="timesCon tabContent">
                    
                </div>
                <!--tab end-->
            </div>
        </div>
    </div>
    <div id="editWind" class="easyui-window"  style="width:1000px;height:350px;padding:10px;"
		        data-options="modal:true,closed:true,iconCls:'icon-save'"  >
		        <iframe id="goto"  style="border: none;" scrolling="yes" frameborder="0" scrolling="no" marginwidth="0" marginheight="0"></iframe>
	</div>
	
	   <div class="inputPanel1 tabBox" id="deWin" style="width: 1000px; height: 490px;display:none" >
        <div class="newPageWin">
            <div class="title"><span id="winTitle"></span>
                <a class="clo_icon" onclick="hidenContentFrame()"></a>
            </div>
            <iframe id="contentFrame" src="" width="100%" height="100%" scrolling="auto" frameborder="0"> </iframe>
        </div>
   </div>          
  </body>
</html>
