
var ImporterDetail={};


ImporterDetail.fulshForm=function(changepage){
	if(!changepage)$('[name=form]').doPage('init');
	$("[name=form]").attr("action","cul/importDetail.do");//不设这个AA会自动置空！？！？
	//所要提交的表单 
    ajaxAnywhere.formName="form";  
    //所要刷新的区域	 
    ajaxAnywhere.getZonesToReload = function(){
        return "detailform";
    }
    ajaxAnywhere.submitAJAX();
}

$(function(){
	
	
});