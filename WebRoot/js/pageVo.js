
//<div class="paging clearfix mtp12" style="padding-bottom: 20px;">
//		<div class="pagetion">
//			<a class="first">上一页</a><span id="pageno"></span><a class="next">下一页</a> 共 ${pagevo.totalPage }页 到第 <input class="pageNo" type="text"> 页
//		</div>
//	</div>


/**
 * $(表单).doPage(分页放在这个对象之后,当前页数,总页数,每页数量,总记录数,分页回调(跳转页数));
 * 
 $('[name=agentform]').doPage($("#tbdiv"),'${pagevo.currentPage}','${pagevo.totalPage }','${pagevo.pageSize}','${pagevo.totalRecord}',function(pageno){
	 Agent.fulshForm(1);
});
 */
$.fn.doPage=function(table,currpage,totlepage,pagesize,totalrecord,gopagefunc){
	if(!table || currpage=='' || totlepage=='')return ;
	if(!gopagefunc)gopagefunc=function(){};
	if(table=='init'){//初始化pagenum为1，否则会造成项目选择时页数问题。
		$(this).find('[name=pagenum]').val("1");
		return;
	}
	currpage=parseInt(currpage,10);
	var form=$(this);
	var firdiv=$('<div class="paging clearfix mtp12" style="padding-bottom: 20px;" />');
	var secdiv=$('<div class="pagetion" />');
	var backpage=$('<a class="first">上一页</a>');
	var pagenospan=$('<span id="pageno"></span>');
	var nextpage=$('<a class="next">下一页</a>');
	var jmppage=$('<input class="pageNo" type="text">');
	var pagenum=$('<input type="hidden" name="pagenum" />');
	
	
	if(form.find('[name=pageSize]').length==0){
		form.append($('<input type="hidden" name="pageSize" value="'+pagesize+'" />'));
	}else{
		form.find('[name=pageSize]').val(pagesize);
	}
	
	if(form.find('[name=currentPage]').length==0){
		form.append($('<input type="hidden" name="currentPage" value="'+currpage+'" />'));
	}else{
		form.find('[name=currentPage]').val(currpage);
	}
	
	if(form.find('[name=totalRecord]').length==0){
		form.append($('<input type="hidden" name="totalRecord" value="'+totalrecord+'" />'));
	}else{
		form.find('[name=totalRecord]').val(totalrecord);
	}
	
	if(form.find('[name=pagenum]').length==0){
		form.append(pagenum);
	}else{
		pagenum=form.find('[name=pagenum]');
		form.find('[name=pagenum]').val(currpage);
	}
	backpage.click(function(){
		pagenum.val(currpage-1);
		gopagefunc(currpage-1);
	});
	nextpage.click(function(){
		pagenum.val(currpage+1);
		gopagefunc(currpage+1);
	});
	jmppage.change(function(){
		pagenum.val($(this).val());
		gopagefunc($(this).val());
	});
	jmppage.keydown (function(event){
//		alert(event.keyCode);
	 if((event.keyCode>=96 && event.keyCode<=105) || (event.keyCode>=48 && event.keyCode<=57) || event.keyCode==13){
		 
     }else{
    	 return false;
     }
	});
	jmppage.keypress(function(event){
		if(event.keyCode == "13")    
        {
            pagenum.val($(this).val());
    		gopagefunc($(this).val());
        }
	});
	
	
	var cul=5;
	var t_curpage=parseInt(currpage,10);
	if((t_curpage-cul)<1)t_curpage=0;
	else t_curpage=t_curpage-cul;
	while(t_curpage!=parseInt(currpage,10)){
		pagenospan.append($("<a>"+(++t_curpage)+"</a>"));
		//alert(t_curpage);
	}
	var acul=10-pagenospan.find("a").length;//页数
	//alert(acul);
	t_curpage=parseInt(currpage,10);
	while(totlepage>t_curpage && --acul>0){
		pagenospan.append($("<a>"+(++t_curpage)+"</a>"));
	}
	
	pagenospan.find("a").each(function(){
		if($(this).html()==currpage)$(this).addClass("on");
	});
	pagenospan.find("a").click(function(){
		pagenum.val($(this).html());
		//alert($(this).html());
		gopagefunc($(this).html());
	});
	secdiv.append(backpage).append(pagenospan).append(nextpage).append("共"+totlepage+"页,跳到第").append(jmppage).append("页");
	firdiv.append(secdiv);
	//if(window.PageVo)window.PageVo.remove();
	//window.PageVo=firdiv;
	table.after(firdiv);
}