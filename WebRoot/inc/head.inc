
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="aa" uri="http://ajaxanywhere.sourceforge.net/" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@ taglib uri="/WEB-INF/commons" prefix="s" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
    String s_username=null;
    /*MyUserVo user=(MyUserVo)session.getAttribute("user");
    if(user==null){//no logging
    	String url=request.getRequestURL().toString();
    }*/
    //
    //try{s_username=((MyUserVo)request.getSession().getAttribute("user")).getUsername();}catch(Exception e){}
    
%>

<%--<c:if test="${!empty error}">--%>
    <%--<jsp:forward page="../error.jsp"/>--%>
<%--</c:if>--%>

<base href="<%=basePath%>" target="_self">

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<meta http-equiv="X-UA-Compatible" content="IE=10; IE=9; IE=8; IE=7; IE=EDGE"> 
<link rel="shortcut icon" href="<%=basePath%>favicon.ico" />
<!-- css and javascript -->
<link rel="stylesheet" type="text/css" href="<%=basePath%>css/easyui/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="<%=basePath%>css/easyui/themes/default/easyui-extend.css">
<link rel="stylesheet" type="text/css" href="<%=basePath%>css/easyui/themes/icon.css">
<link rel="stylesheet" type="text/css" href="<%=basePath%>css/base.css">
<link href="<%=basePath %>css/yj_index.css" type="text/css" rel="stylesheet" />
<script type="text/javascript" src="<%=basePath%>js/easyui/jquery-1.12.3.js"></script>
<script type="text/javascript" src="<%=basePath%>js/jquery.extend.js"></script>
<script type="text/javascript" src="<%=basePath%>js/easyui/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/easyui/datagrid.detailview.js"></script>
<script type="text/javascript" src="<%=basePath%>js/easyui/datagrid.cellediting.js"></script>
<script type="text/javascript" src="<%=basePath%>js/easyui/locale/easyui-lang-zh_CN.js"></script>

<script type="text/javascript" src="<%=basePath%>js/html5shiv.js"></script>
<script type="text/javascript" src="<%=basePath%>js/json2.js"></script>
<script type="text/javascript" src="<%=basePath%>js/jquery.placeholder.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/layer/layer.js"></script>
<link rel="stylesheet" type="text/css" href="<%=basePath%>js/layer/skin/layer.css">
<script type="text/javascript" src="<%=basePath%>js/validate/jquery.validate.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/validate/messages_zh.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/aa.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/common/page.js"></script>
<script type="text/javascript" src="<%=basePath %>/js/pageVo.js"></script>
<script type="text/javascript">
<!--
var basePath = "<%=basePath%>";
//-->
</script>

