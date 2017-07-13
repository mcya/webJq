<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/inc/head.inc"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">
		<title>新建流程类型</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<script type="text/javascript" src="<%=basePath%>js/wolkflow/public.js"></script>
		<link href="<%=basePath %>/css/wolkflow/index.css" type="text/css" rel="stylesheet" />
		<link href="<%=basePath %>/css/wolkflow/public.css" type="text/css" rel="stylesheet" />
<script type="text/javascript">
	function clearForm(){
		$('#form').form('clear');
	}
	function add(){
		if($("#form").form('validate')){
            $('#form').submit();
        }
	}	
	$(function(){
		//样式
		$.doselect("#yjactDiv", "#processId");
		$.doselectValue("#yjactDiv", "#processId","佣金工作流:1:30004");
		$.doselect("#sjactDiv", "#sjId");
		$.doselectValue("#sjactDiv", "#sjId",1);
    });
</script>
	</head>
	<body>
	<div class="inputPanel1 tabBox" id="deWin" style="display: block; top: 216.5px; left: 424.5px;">
		<div class="inPCont">
            <div>
                <div class="mbt10">
                    <label class="minlabel frmEle">项目</label>
                    <div class="selCss selLoud" id="tjDiv1">
                        <a>调价范围</a>
                        <div class="marks">
                            <span></span>
                        </div>
                        <input name="" type="hidden" value="" id="inputselect1">
                        <ul style="display: none;">
                            <li>
                                <a href="javascript:void(0);" selvalue="1">亚信小谷围</a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" selvalue="时代地产">时代地产</a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" selvalue="亚信小谷围1">亚信小谷围1</a>
                            </li>
                        </ul>
                    </div>
                    <label class="minlabel frmEle" style="width:260px;">结佣条件名称</label>
                    <input style="width: 262px;" class="inputCss">
                </div>
                <div class="mbt10">
                    <label class="minlabel frmEle">有效时间</label>
                    <div class="selCss selLoud" id="tjDiv1">
                        <a>调价范围</a>
                        <div class="marks">
                            <span></span>
                        </div>
                        <input name="" type="hidden" value="" id="inputselect1">
                        <ul style="display: none;">
                            <li>
                                <a href="javascript:void(0);" selvalue="1">亚信小谷围</a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" selvalue="时代地产">时代地产</a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" selvalue="亚信小谷围1">亚信小谷围1</a>
                            </li>
                        </ul>
                    </div>
                    <label class="minlabel frmEle" style="width: 260px;">
                        失效时间
                    </label>
                    <div class="selCss selLoud" id="tjDiv2">
                        <a>视图</a>
                        <div class="marks">
                            <span></span>
                        </div>
                        <input name="" type="hidden" value="" id="inputselect2">
                        <ul style="display: none;">
                            <li>
                                <a href="javascript:void(0);" selvalue="1">房间资料</a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" selvalue="时代地产">时代地产</a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" selvalue="亚信小谷围1">亚信小谷围1</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="divMarg1">
                    <label class="minlabel frmEle frmEleIe">
                        有无预售证
                    </label>
                    <input type="checkbox" class="frmEle chkBox">
                    <label class="frmEle chkLabel">
                        有
                    </label>
                    <input type="checkbox" class="frmEle chkBox" style="margin-left:50px;">
                    <label class="frmEle chkLabel">
                        无
                    </label>
                </div>
                <div class="grayBgDiv mbt10" style="height: 113px;border-top: none;">
                    <label class="minlabel frmEle">付款方式</label>
                    <div class="selCss selLoud" style="width: 86px!important;" id="tjDiv1">
                        <a>按揭</a>
                        <div class="marks">
                            <span></span>
                        </div>
                        <input name="" type="hidden" value="" id="inputselect1">
                        <ul style="display: none;">
                            <li>
                                <a href="javascript:void(0);" selvalue="1">亚信小谷围</a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" selvalue="时代地产">时代地产</a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" selvalue="亚信小谷围1">亚信小谷围1</a>
                            </li>
                        </ul>
                    </div>
                    <label class="minlabel frmEle" style="width:60px">条件</label>
                    <div class="selCss selLoud" style="width: 219px!important;" id="tjDiv1">
                        <a>签署完《商品买卖合同》</a>
                        <div class="marks">
                            <span></span>
                        </div>
                        <input name="" type="hidden" value="" id="inputselect1">
                        <ul style="display: none;">
                            <li>
                                <a href="javascript:void(0);" selvalue="1">亚信小谷围</a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" selvalue="时代地产">时代地产</a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" selvalue="亚信小谷围1">亚信小谷围1</a>
                            </li>
                        </ul>
                    </div>
                    <label class="minlabel frmEle" style="width:60px">付款</label>
                    <div class="selCss selLoud" style="width: 86px!important;" id="tjDiv1">
                        <a>首付</a>
                        <div class="marks">
                            <span></span>
                        </div>
                        <input name="" type="hidden" value="" id="inputselect1">
                        <ul style="display: none;">
                            <li>
                                <a href="javascript:void(0);" selvalue="1">亚信小谷围</a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" selvalue="时代地产">时代地产</a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" selvalue="亚信小谷围1">亚信小谷围1</a>
                            </li>
                        </ul>
                    </div>
                    <label class="minlabel frmEle" style="width:60px">支付佣金</label>
                    <div class="selCss selLoud" style="width: 86px!important;" id="tjDiv1">
                        <a>50</a>
                        <div class="marks">
                            <span></span>
                        </div>
                        <input name="" type="hidden" value="" id="inputselect1">
                        <ul style="display: none;">
                            <li>
                                <a href="javascript:void(0);" selvalue="1">亚信小谷围</a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" selvalue="时代地产">时代地产</a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" selvalue="亚信小谷围1">亚信小谷围1</a>
                            </li>
                        </ul>
                    </div>
                    <label class="minlabel frmEle" style="width:10px">%</label>
                    <a class="yjNumber yjAdBtn"></a>
                    <a class="yjMinus yjNumber"></a>
                </div>
            </div>
        </div>
        </div>
	</body>
</html>
