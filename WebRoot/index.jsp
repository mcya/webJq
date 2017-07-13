<%@ page import="com.asiainfo.times.commision.control.SystemCtr" %>
<%@ page import="com.asiainfo.times.tool.UtilTools" %>
<%@ page import="org.apache.shiro.SecurityUtils" %>
<%@ page import="org.apache.shiro.subject.Subject" %>
<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="sun.misc.BASE64Decoder" %>
-
Created by IntelliJ IDEA.
User: lzb
Date: 2017/5/9
Time: 下午5:14
To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <title>Title</title>
  </head>
  <body>
  <%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
    BASE64Decoder decoder = new BASE64Decoder();
    String auth = request.getHeader("Authorization");
    if(!UtilTools.isNullOrBlank(auth)){//已认证
      auth = auth.substring(6, auth.length());
      String decodedAuth = new String(decoder.decodeBuffer(auth));
      String[] user_pass=decodedAuth.split(":",2);
      if(user_pass.length!=2){
        response.setStatus(401);
        response.setHeader("Cache-Control", "no-store");
        response.setDateHeader("Expires", 0);
        response.setHeader("WWW-authenticate", "Basic Realm=\"10.1.10.10\"");
        return;
      }
      System.out.println("auth decoded from base64 is " + user_pass[0]+"::"+user_pass[1]);
      String username=user_pass[0];
      if(username.indexOf("\\")==-1){
        username="timesgroup\\"+username;
      }
      request.setAttribute("username",username);
      request.setAttribute("password",user_pass[1]);
      request.setAttribute("adflag","true");
//      request.getRequestDispatcher("/bus/login.do").forward(request,response);
      try{
      SystemCtr sctr= WebApplicationContextUtils.getWebApplicationContext(request.getServletContext(),
              "org.springframework.web.servlet.FrameworkServlet.CONTEXT.spring").getBean(SystemCtr.class);
        System.out.println("ctr:"+sctr);
        try {
          sctr.login(request, response);
          Subject subject= SecurityUtils.getSubject();
          if(subject.isAuthenticated()){
            //x-auth
//            response.addCookie(new Cookie("x-auth","true"));
//            request.getRequestDispatcher("/").forward(request,response);
            response.sendRedirect(basePath+"main.jsp");
          }else{
            System.out.println("登录失败!");
            response.setStatus(401);
            response.setHeader("Cache-Control", "no-store");
            response.setDateHeader("Expires", 0);
            response.setHeader("WWW-authenticate", "Basic Realm=\"10.1.10.10\"");
          }
        }catch (Exception e2){
          System.out.println("登录失败!");
          response.setStatus(401);
          response.setHeader("Cache-Control", "no-store");
          response.setDateHeader("Expires", 0);
          response.setHeader("WWW-authenticate", "Basic Realm=\"10.1.10.10\"");
        }
      }catch (Exception e){
          e.printStackTrace();
      }
//      sctr.login(request,response);
    }else{//未认证
      response.setStatus(401);
      response.setHeader("Cache-Control", "no-store");
      response.setDateHeader("Expires", 0);
      response.setHeader("WWW-authenticate", "Basic Realm=\"10.1.10.10\"");
    }
  %>
  </body>
</html>
