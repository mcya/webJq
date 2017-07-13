//动态添加规则条件
   function addCondition(opertype,jsruleguid,scopeid,payformname,contractcondition,payformtype,jsyjpercent,fkpercent,status,jstype,jsyjamt){
   		this.jsruleguid = (undefined == jsruleguid || null == jsruleguid )?'':jsruleguid;
   		this.scopeid = (undefined == scopeid || null == scopeid )?'':scopeid;
   		this.payformname = (undefined == payformname || null == payformname )?'':payformname;
   		this.contractcondition = (undefined == contractcondition || null == contractcondition )?'':contractcondition;
   		this.payformtype = (undefined == payformtype || null == payformtype )?'':payformtype;
   		this.jsyjpercent = (undefined == jsyjpercent || null == jsyjpercent )?'':jsyjpercent;
   		this.jsyjamt = (undefined == jsyjamt || null == jsyjamt )?'':jsyjamt;
   		this.fkpercent = (undefined == fkpercent || null == fkpercent )?'':fkpercent;
   		this.status2 = (undefined == status || null == status )?'':status;
   		this.jstype=(undefined == jstype || null == jstype )?'':jstype
   		var tempId = new Date().valueOf();
   		var conditionHtml = '<div id='+tempId+' cdiv="1" name="conditionDiv"  style="height: 50px;">';
   		conditionHtml += '<input type="hidden" name="jsruleguid" value="'+this.jsruleguid+'"/>';
   		var payformnameHtml = ' <label class="minlabel frmEle">付款方式</label>';
            payformnameHtml += '<input name="payformname" type="hidden" value="'+this.payformname+'" class="required" id="payformname' + tempId + '">';
            payformnameHtml += '<div class="selCss selLoud" style="width: 86px!important;" id="payformname' + tempId + 'Div">';
            payformnameHtml += '<a>请选择</a>';
            payformnameHtml += '<div class="marks">';
            payformnameHtml += '<span></span>';
            payformnameHtml += '</div>';
            payformnameHtml += '<ul style="display: none;">';
            payformnameHtml += '<li>';
            payformnameHtml += '<a href="javascript:void(0);" selvalue="AJ">按揭</a>';
            payformnameHtml += '</li>';
            payformnameHtml += '<li>';
            payformnameHtml += '<a href="javascript:void(0);" selvalue="FQ">分期</a>';
            payformnameHtml += '</li>';
            payformnameHtml += '<li>';
            payformnameHtml += '<a href="javascript:void(0);" selvalue="YCX">全款(一次性付款)</a>';
            payformnameHtml += '</li>';
            payformnameHtml += '</ul>';
            payformnameHtml += '</div>';
       
        var contractconditionHtml =  '<label class="minlabel frmEle" style="width:60px">条件</label>';
          	contractconditionHtml += '<input type="hidden" name="contractcondition" value="'+this.contractcondition+'" class="required" id="contractcondition' + tempId + '">';
            contractconditionHtml += '<div class="selCss checkBoxLoud" style="width: 219px!important;" id="tionCheckBox' + tempId + 'Div">';
            contractconditionHtml += '<a >请选择</a>';
            contractconditionHtml += '<div class="marks2">';
            contractconditionHtml += '<span></span>';
            contractconditionHtml += '</div>';
            contractconditionHtml += '<ul style="display: none;">';
            contractconditionHtml += '<li>';
            contractconditionHtml += '<input type="checkbox" value="3" name="" class="frmEle chkBox"><label class="frmEle chkLabel">签署完《限购协议》</label>';
            contractconditionHtml += '</li>';
            contractconditionHtml += '<li>';
            contractconditionHtml += '<input type="checkbox" value="2" name="" class="frmEle chkBox"><label class="frmEle chkLabel">签署完《商品买卖合同》</label>';
            contractconditionHtml += '</li>';
            contractconditionHtml += '<li>';
            contractconditionHtml += '<input type="checkbox" value="1" name="" class="frmEle chkBox"><label class="frmEle chkLabel">签署完《按揭合同》</label>';
            contractconditionHtml += '</li>';
            contractconditionHtml += '<li>';
            contractconditionHtml += '<input type="checkbox" value="0" name="" class="frmEle chkBox"><label class="frmEle chkLabel">签署完《认购书》</label>';
            contractconditionHtml += '</li>';
            contractconditionHtml += '</ul>';
            contractconditionHtml += '</div>';  
            
        var payformtypeHtml =  '<label class="minlabel frmEle" style="width:60px">付款</label>';
            payformtypeHtml += '<input name="payformtype" type="hidden" value="'+this.payformtype+'" class="required" id="payformtype' + tempId + '">';
            payformtypeHtml += '<div class="selCss selLoud" style="width: 86px!important;" id="payformtype' + tempId + 'Div">';
            payformtypeHtml += '<a>请选择</a>';
            payformtypeHtml += '<div class="marks">';
            payformtypeHtml += '<span></span>';
            payformtypeHtml += '</div>';
            payformtypeHtml += '<ul style="display: none;">';
            payformtypeHtml += '<li>';
            payformtypeHtml += '<a href="javascript:void(0);" onclick="changePayformtype(this)" selvalue="DK">贷款</a>';
            payformtypeHtml += '</li>';
            payformtypeHtml += '<li>';
            payformtypeHtml += '<a href="javascript:void(0);" onclick="changePayformtype(this)" selvalue="SQ">首期</a>';
            payformtypeHtml += '</li>';
            payformtypeHtml += '<li>';
            payformtypeHtml += '<a href="javascript:void(0);" onclick="changePayformtype(this)" selvalue="FK">房款</a>';
            payformtypeHtml += '</li>';
            payformtypeHtml += '</ul>';
            payformtypeHtml += '</div>';
            
        var jsyjpercentHtml =  '<label class="minlabel frmEle" style="width:60px">支付佣金</label>';
        	 if('0'==jstype){
        		 jsyjpercentHtml += '<input name="jsyjpercent"  value="'+this.jsyjpercent+'" style="width: 20px;" class="inputCss required integer" min="0" max="100" id="jsyjpercent">';
        	 }else{
        		 jsyjpercentHtml += '<input name="jsyjpercent"  value="'+this.jsyjamt+'" style="width: 20px;" class="inputCss required" min="0" max="100" id="jsyjpercent">';
        	 }
             jsyjpercentHtml += '<select style="width: 35px;height: 30px;" id="jstype" name="jstype" onChange="checkselect(this)" value="'+jstype+'">';
             if('DK'==payformtype||'FK'==payformtype){
            	 jsyjpercentHtml +='<option value="0">%</option></select>'
             }else{
            	 if('0'==jstype){
            		 jsyjpercentHtml +='<option value="0" selected="selected">%</option>'
                     jsyjpercentHtml +='<option value="1">元</option></select>' 
            	 }
            	 if('1'==jstype){
            		 jsyjpercentHtml +='<option value="0">%</option>'
                     jsyjpercentHtml +='<option value="1" selected="selected">元</option></select>' 
            	 }
            	 if(''==jstype||undefined==jstype||null==jstype){
            		 jsyjpercentHtml +='<option value="0" selected="selected">%</option>'
                     jsyjpercentHtml +='<option value="1">元</option></select>' 
            	 }
            	 
             }
            
        var display = '';  
        var required = '';  
        if('DK' == payformtype){
        	display = 'none';
        	required ='';
        }else{
        	required = 'required';
        }
        var fkpercentHtml = '<label class="minlabel frmEle jsyjclass" style="width:60px;display:'+display+'">付款判断</label>'; 
        	fkpercentHtml += '<input name="fkpercent" value="'+this.fkpercent+'" style="width: 20px;display:'+display+'" class="inputCss integer jsyjclass '+required+'" min="0" max="100" id="fkpercent' + tempId +'" >';
        	fkpercentHtml += '<label class="minlabel frmEle jsyjclass" style="width:10px;display:'+display+'">%</label>';
           
        var statuHtml = '<label class="minlabel frmEle" style="width:40px">状态</label>';
            statuHtml += '<input name="status" type="hidden" value="'+this.status2+'" class="required" id="status' + tempId + '">';
        	statuHtml += '<div class="selCss selLoud" style="width: 86px!important;" id="status' + tempId + 'Div">';
        	statuHtml += '<a>请选择</a>';
            statuHtml += '<div class="marks">';
            statuHtml += '<span></span>';
            statuHtml += '</div>';
            statuHtml += '<ul style="display: none;">';
            statuHtml += '<li>';
            statuHtml += '<a href="javascript:void(0);" selvalue="1">有效</a>';
            statuHtml += '</li>';
            statuHtml += '<li>';
            statuHtml += '<a href="javascript:void(0);" selvalue="0">无效</a>';
            statuHtml += '</li>';
            statuHtml += '</ul>';
            statuHtml += '</div>'; 
            
        	
            conditionHtml += payformnameHtml;
            conditionHtml += contractconditionHtml;
            conditionHtml += payformtypeHtml;
            conditionHtml += fkpercentHtml;
            conditionHtml += jsyjpercentHtml;
            if("edit" == opertype){
            	conditionHtml += statuHtml;
            }else{
            	conditionHtml += '<a class="yjMinus yjNumber" onclick="delCondition('+ tempId +');"></a>';
            }
            conditionHtml += '</div>';
            $('#conditionDiv').append(conditionHtml);
            bindList($('#'+tempId));//下拉框绑定
	        bindCheckboxList($('#'+tempId));
	        checkselect(null,jstype);
   }

   
   function delCondition(divId){
	   	$('#'+divId).remove();
	   	if(isEmptyCodition()){
	   		$('#addConditionDiv').show();
	   	}
   }
   
   function changePayformtype(type){
   		var payType = $(type).attr('selvalue');
   		if('DK' == payType){//贷款时隐藏付款判断
   			$(type).closest("div[name='conditionDiv']").find("input[name='fkpercent']").removeClass('required');
   			$(type).closest("div[name='conditionDiv']").find(".jsyjclass").hide();
   		}else{///非贷款时显示付款判断
   			$(type).closest("div[name='conditionDiv']").find("input[name='fkpercent']").addClass('required');
   			$(type).closest("div[name='conditionDiv']").find(".jsyjclass").show();
   		}
   		if('SQ'!=payType){
   			$(type).parents("[cdiv=1]:eq(0)").find("input[id='jsyjpercent']").removeAttr("name");
   			$(type).parents("[cdiv=1]:eq(0)").find("input[id='jsyjpercent']").attr("name","jsyjpercent");
   			$(type).parents("[cdiv=1]:eq(0)").find("select[id='jstype']").find("option[value='1']").remove();
   			$(type).parents("[cdiv=1]:eq(0)").find("input[id='jsyjpercent']").removeAttr("max");
   			$(type).parents("[cdiv=1]:eq(0)").find("input[id='jsyjpercent']").removeAttr("min");
   			$(type).parents("[cdiv=1]:eq(0)").find("input[id='jsyjpercent']").attr("max","100");
   			$(type).parents("[cdiv=1]:eq(0)").find("input[id='jsyjpercent']").attr("min","0");
   			$(type).parents("[cdiv=1]:eq(0)").find("input[id='jsyjpercent']").removeAttr("class");
   			$(type).parents("[cdiv=1]:eq(0)").find("input[id='jsyjpercent']").attr("class","inputCss required integer");
   		}else{
   			$(type).parents("[cdiv=1]:eq(0)").find("select[id='jstype']").find("option[value='1']").remove();
   			$(type).parents("[cdiv=1]:eq(0)").find("select[id='jstype']").append("<option value='1'>元</option>");
   		}
   }
   function checkselect(str){
	   var number=$(str).val();
	   if('0'==number){
		   $(str).parents("[cdiv=1]:eq(0)").find("input[id='jsyjpercent']").removeAttr("name");
		   $(str).parents("[cdiv=1]:eq(0)").find("input[id='jsyjpercent']").attr("name","jsyjpercent");
		   $(str).parents("[cdiv=1]:eq(0)").find("input[id='jsyjpercent']").removeAttr("max");
		   $(str).parents("[cdiv=1]:eq(0)").find("input[id='jsyjpercent']").removeAttr("min");
		   $(str).parents("[cdiv=1]:eq(0)").find("input[id='jsyjpercent']").attr("max","100");
		   $(str).parents("[cdiv=1]:eq(0)").find("input[id='jsyjpercent']").attr("min","0");
		   $(str).parents("[cdiv=1]:eq(0)").find("input[id='jsyjpercent']").removeAttr("class");
		   $(str).parents("[cdiv=1]:eq(0)").find("input[id='jsyjpercent']").attr("class","inputCss required integer");
	   }else{
		   $(str).parents("[cdiv=1]:eq(0)").find("input[id='jsyjpercent']").removeAttr("name");
		   $(str).parents("[cdiv=1]:eq(0)").find("input[id='jsyjpercent']").attr("name","jsyjamt");
		   $(str).parents("[cdiv=1]:eq(0)").find("input[id='jsyjpercent']").removeAttr("max");
		   $(str).parents("[cdiv=1]:eq(0)").find("input[id='jsyjpercent']").removeAttr("min");
		   $(str).parents("[cdiv=1]:eq(0)").find("input[id='jsyjpercent']").attr("max","99999999.99");
		   $(str).parents("[cdiv=1]:eq(0)").find("input[id='jsyjpercent']").attr("min","0.00");
		   $(str).parents("[cdiv=1]:eq(0)").find("input[id='jsyjpercent']").removeAttr("class");
		   $(str).parents("[cdiv=1]:eq(0)").find("input[id='jsyjpercent']").attr("class","inputCss required");
	   }
   }
   function doCancle(){
   	//$('#form1')[0].reset();
   	window.top.hidenContentFrame();
   }
   
   function isEmptyCodition(){
   	return ($("input[name='payformname']").length == 0)?true:false;
   }
   
    function setScope(scopeValue,companyName,projName,bldName,roomName){
   		$('#scope').val(scopeValue);
   		var scopeNames = "";
   		if(undefined != companyName && null != companyName && companyName.length != 0){
   			scopeNames += companyName+",";
   		} 
   		if(undefined != projName && null != projName && projName.length != 0){
   			scopeNames += projName+",";
   		}
   		if(undefined != bldName && null != bldName && bldName.length != 0){
   			scopeNames += bldName+",";
   		}
   		if(undefined != roomName && null != roomName && roomName.length != 0){
   			scopeNames += roomName+",";
   		}
   		$('#scopeidDiv').children("a").first().html(scopeNames);
   		$('#scopeidDiv').children("a").attr("title",scopeNames);
   }
