<%@ page language="java"  pageEncoding="utf-8"%>
<%@ include file="/inc/head.inc" %>

<!-- 登陆了就自动跳转 -->
<shiro:authenticated>
	<script>
		window.location.href="main.jsp";
	</script>
</shiro:authenticated>

<body type="1" class="loginBd" >
    <div class="hdSection">
         <div class="hdmid"> <img src="images/logoBar.png"/></div>  
    </div>
    <div class="bodySection">
        <div class="bdCenter">
            
            <div class="yjLogForm">
                <div class="yjFormBd">
                    <form  action="bus/login.do" method="post">
                    	<input type="hidden" name="adflag" value="${param.adflag}" />
	                    <div class="yjFormHead"><img src="images/headPers.png"/></div>
	                    <center><span><font color="red">${error}</font></span></center>
	                    <div class="yjName">
	                        <input type="text" name="username" placeholder="用户名" value="<shiro:principal property="usercode" />" required /><em></em>
	                    </div>
	                    <div class="yjPwd">
	                        <input type="password" name="password" placeholder="密码" required /><em></em>
	                    </div>
	                    <div class="yjforgetPs">忘记密码</div>
	                    <a class="yjLogBtn" onclick="$(this).parents('form').submit()"><span>登录</span></a>
                    </form>
                </div>
            </div>
        </div>

    </div>
    <div class="yjLogfoot"><div class="company">系统维护：亚信（广州）软件服务有限公司</div></div>
     <script type="text/javascript">
    $('.yjLogfoot').css('padding-top',(document.body.clientHeight-584-28)+'px');
    $(window).resize(function(){
         $('.yjLogfoot').css('padding-top',(document.body.clientHeight-584-28)+'px');
         
         $('.bodySection').css('width',document.body.scrollWidth);
    });
    function checkForm(){
    	var flag=true;
    	var name=$("[name=username]").val();
    	var password=$("[name=password]").val();
    	if(!name || name==""){
    		$.tips("[name=username]","请输入用户名");
    		flag=false;
    	}
    	if(!password || password==""){
    		$.tips("[name=password]","请输入密码");
    		flag=false;
    	}
    	return flag;
    }
    //$.validator.setDefaults({
    //    submitHandler: function() {
    //      alert("提交事件!");
    //    }
    //});
    $("form").validate({
    	messages: {
    		username:'请输入用户名',
    		password:'密码不能为空'
    	},
    	errorPlacement:function(error, element){
    		var msg=$(error[0]).html();
    		$.tips(element,msg);
    	}
    });
    document.onkeydown=function(event){
    	 var e = event || window.event || arguments.callee.caller.arguments[0];
	   	 if(e && e.keyCode==13){
	   		 $('form').submit();
	   	 }
    }
    </script>
</body>

</html>

