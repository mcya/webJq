<%@page import="com.asiainfo.times.commision.common.Command"%>
<%@page import="com.asiainfo.times.tool.UtilTools"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'CalCtrl.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">

  </head>
  <%
  	String cmd=request.getParameter("cmd");
    String cycle=request.getParameter("cycle");
  	if(!UtilTools.isNullOrBlank(cmd)){
  		Command _cmd=new Command();
  		_cmd.cmd=cmd;
  		if(!UtilTools.isNullOrBlank(cycle))_cmd.param=new String[]{cycle};
  		_cmd=UtilTools.sendCmd(_cmd);
  		out.print("执行结果:"+_cmd.success+"信息:"+_cmd.msg);
  	}
  %>
  <body>
    <form action="CalCtrl.jsp" method="post">
    	账期:<input name="cycle" />
    	命令:<select name="cmd">
    		<option value="endPro">终止程序</option>
    		<option value="CAL">所有计算</option>
    		<option value="CAL3">阶段3</option>
    		<option value="HRJOB">HR同步</option>
    		<option value="Target">刷目标</option>
    	</select>
    	<input type="submit" value="提交命令">
    </form>
  </body>
</html>
