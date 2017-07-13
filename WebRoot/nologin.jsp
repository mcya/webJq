<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
  <script type="text/javascript">
  	alert("登陆超时，请重新登陆!");
  	window.top.location.href="<%=basePath%>index.jsp";
  </script>
