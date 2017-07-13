function find(o){
	//alert(o.html());
	var div=o.parents("[curbidiv]");
	div.find("[name=pagenum]").val("1");
	var formdata=o.parents("form").serialize();//序列化form表单数据
	var action=o.parents("form").attr("action");
	$.ajaxdata(action,formdata,false,function(data){div.html(data);});
}

function reset(o){
	o.parents("form")[0].reset();
	$(o.parents("form")[0]).find("#searchBox input").val("");
}

var func_reset=reset;//奇怪。。居然自生成的表单直接用reset是nativeCode

function toPage(o){
	var div=o.parents("[curbidiv]");
	var formdata=o.parents("form").serialize();//序列化form表单数据
	var action=o.parents("form").attr("action");
	/*div.addClass("animated");
	div.addClass("rollOut");*/
	$.ajaxdata(action,formdata,false,function(data){
		
		
		div.html(data);
		/*
		div.removeAttr("class").attr("class","");
		div.addClass("animated");
		div.addClass("rollIn");*/
	});
}

 /*滚动的表格表格头部对齐*/
 function tableScroll(table){
            $("#"+table).find(".thead th").each(function(i){
            	var rownum=1;
            	if(document.getElementById(table).rows.length==1)rownum=0//表格tbody为空就是0
                var W=document.getElementById(table).rows[rownum].cells[i].offsetWidth;//获取头部的每列的宽度
				if(i==0){
					var L=$("#"+table).find("td:first").css("padding-left");
					W=parseInt(W)-parseInt(L)+"px";
					$("#"+table).find(".thead th:first").css("width",W);//不让第一页顶头显示
				}else{
					if(parseInt($(this).css("width"))<=parseInt(W)){
						$(this).css("width",W);//设置头部每一列的宽度
					}else{
						var W=parseInt($(this).css("width"))+10+"px";
						$(this).css("width",W);
						$("#"+table).find("tbody tr:first-child td").each(function(index){
							if(i==index){
							$(this).css("width",W);
							console.log($(this).css("width"));
							}
							console.log(index);
						})
					}				
				}
            })
 }       
/* 下拉列表控件*/
jQuery.doselect = function(divId, input) {
        $(document).click(function(e) {
            var target = $(e.target);
            if (target.closest(".select_def").length != 0
                || target.closest(".selCss").length != 0
                || target.closest(".cmSelect").length != 0
                || target.closest(".miniSel").length != 0) {
                //
            } else {
                $('.select_def>ul,.selCss>ul,.miniSel>ul,.cmSelect>ul').hide();
				$(divId).removeClass("on");
            }
			
        });
        var inputElem = $(input);
        $(divId + ">a," + divId + " .marks").click(function() {
            $('.select_def,.selCss,.miniSel,.cmSelect').css({
                'z-index': '0'
            });
            $(divId).css({
                'z-index': '2'
            });
            var ul = $(divId + " ul");
            if ($(ul).is(":hidden")) {
                $('.select_def>ul,.selCss>ul,.miniSel>ul,.cmSelect>ul').hide();
                ul.show();
                $(".selCss").removeClass("on");
				$(divId).addClass("on");
            } else {
                $('.select_def>ul,.selCss>ul,.miniSel>ul,.cmSelect>ul').hide();
                ul.hide();
				$(divId).removeClass("on");
            }
        });
        $(divId + " ul li").click(function() {
            var anchor = $(this).find("a").first();
            var txt = $(anchor).text();
            $(divId + ">a").html(txt);
            var value = $(anchor).attr("selValue");
            inputElem.val(value);
            $(divId + " ul").hide();
			$(divId).removeClass("on");
        });
}
jQuery.doselect2=function(divId, input,input2) {
    $(document).click(function(e) {
        var target = $(e.target);
        if (target.closest(".select_def").length != 0||target.closest(".selCss").length != 0||target.closest(".miniSel").length != 0) {} else {
            $('.select_def>ul,.selCss>ul,.miniSel>ul').hide();
        	$(divId).removeClass("on");
        }
    });
    var inputElem = $(input);
    var inputElem2 = $(input2);
    $(divId + ">a," + divId + " .marks").click(function() {
        $('.select_def,.selCss,.miniSel').css({
            'z-index': '0'
        });
        $(divId).css({
            'z-index': '2'
        });
        var ul = $(divId + " ul");
        if (ul.css("display") == "none") {
            $('.select_def>ul,.selCss>ul,.miniSel>ul').hide();
            ul.show();
            $(divId).addClass("on");
        } else {
            $('.select_def>ul,.selCss>ul,.miniSel>ul').hide();
            ul.hide();
            $(divId).removeClass("on");
        }
    });
    $(divId + " ul li a").click(function() {
        var txt = $(this).text();
        $(divId + ">a").html(txt);        
        var value = $(this).attr("selValue");
        inputElem.val(value);
        inputElem2.val(txt);
        $(divId + " ul").hide();
        $(divId).removeClass("on");
    });
}
	/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!选项卡tabs（可无限级嵌套）!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
$(function(){
	$(".bf-tab").each(function(){//便利每一个.bf-tab从而来设置每一级里面的tab头部和主题
		$(this).children(".bf-tabBody:first").show().siblings(".bf-tabBody").hide();//设置的一个bf-tabHead显示
		$(this).children(".bf-tabHead").children("li").each(function(index){
		   $(this).click(function(){
			   $(this).addClass("on").siblings().removeClass("on");
			  $(this).parent().siblings(".bf-tabBody").each(function(i){
				 if(index==i){
				   $(this).show().siblings(".bf-tabBody").hide();
				 }
			   });
			});	
		})
	})
})