/******弹出层******/
function showBusiwin(el) {
    $("<div id='bodyLoad' class=\"datagrid-mask\"></div>").css({
        display: "block",
        width: "100%",
        height: document.body.clientHeight
    }).appendTo("body");
    var elW = $('#' + el).outerWidth(true);
    var elH = $('#' + el).outerHeight(true);
    elW = (document.body.clientWidth - elW) / 2 + 'px';
    elH = (document.body.clientHeight - elH) / 2 + 'px';
    $('#' + el).css({
        display: "block",
        top: elH,
        left: elW
    });
}

function hideBusiwin(el) {
    if ($("#bodyLoad")[0]) {
        $("#bodyLoad").remove();
    }
    $('#' + el).css({
        display: "none"
    });
}
/**
 * tab控件 
 * @param id  tab容器id
 * @return 
 *  
 * eg:  var tabs = new timesTabs.Tabs({
            id: 'tabBox1'
        });

    方法：
    添加 tab 元素
    tabs.addItem('名称','内容的iframe的src链接')
     eg: tabs.addItem('新增tab', 'http://www.baidu.com');
 *
 */
var timesTabs = {
    setCookie: function(c_name, value, expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
    }
};

timesTabs.Tabs = function(options) {
    this.initFun(options.id);
}


timesTabs.Tabs.prototype = {
    activeIndex: 0,
    setActiveIndex: function(index) {
        this.activeIndex = index;
    },
    getActiveIndex: function(index) {
        return this.activeIndex;
    },
    initFun: function(divId) {
        var tabsContainer = $("#" + divId);
        var tabDiv = tabsContainer.children(".tabTitle").eq(0).children("div").get(0);
        var contDiv = tabsContainer.children(".tabContent").eq(0);

        var tabList = $(tabDiv).children('h2');
        var contList = $(contDiv).children('div');


        //添加tab滑动庶挡层
        var overHiddenDiv = tabsContainer.children(".tabTitle").eq(0).children("div").eq(0);
        this.hiddenDiv = $(overHiddenDiv);

        this.id = divId;
        this.tabDiv = tabDiv;
        this.contDiv = contDiv;


        var tabStack = [],
            contStack = [],
            titleStack = [];

        $(tabList).each(function(i) {
            tabStack.push(this);
            //取标题
            var title = $(this).children("span").children('a').html();
            titleStack.push(title);
            //var tabOne=$(tabList).children('h2').get(i);
        });

        $(contList).each(function(i) {
            contStack.push(this);
            //var tabOne=$(tabList).children('h2').get(i);
        });

        this.tabStack = tabStack;
        this.contStack = contStack;
        this.titleStack = titleStack;
        this.addEvents();
        this.setActiveItem(0);
        // this.addItem();
        // this.removeItem(3);
    },
    setActiveItem: function(i) {
        if (i >= this.tabStack.length) {
            return;
        }
        this.updateStauts();
        $(this.tabStack[i]).addClass("on");
        $(this.contStack[i]).show();
        //关联左侧的tab选项
        var conH2=$(this.tabStack[i]).find("span a").html();
        $(".menuList ul li").each(function(){
        	if(conH2==$(this).find("a span").html()){
        		$(this).siblings("li").removeClass("on");
        	 	$(this).addClass("on");
        	}
        })
               
        this.setActiveIndex(i);
    },
    setActiveItemByName: function(name) {
        isFind = false;
        var index;
        for (var i = 0; i < this.titleStack.length; i++) {
            if (this.titleStack[i].indexOf(name) > -1 && this.titleStack[i] == name) {
                isFind = true;
                index = i;
            }
        }
        if (isFind) {
            this.setActiveItem(index);
        }
    },
    movetoTab: function(index) {
        this.hiddenDiv.css('margin-left', '-' + 162 * index + 'px');
    },
    movetoLeft: function() {

        var reg = /\d+/;

        //var marLeft=parseInt(this.hiddenDiv.css('margin-left').match(reg)[0])-162;
      
       
       console.log(parseInt(this.hiddenDiv.css('margin-left')))
       //当点击左移按钮时，如果内容比显示区的宽度大时，才能左移有效
       if(this.tabStack.length*172-10+parseInt(this.hiddenDiv.css('margin-left'))>document.body.clientWidth-241-77){
    	    var marLeft = parseInt(this.hiddenDiv.css('margin-left')) - 172;
        	this.hiddenDiv.css('margin-left', '' + marLeft + 'px');
       }
    },
    movetoRight: function(){

        var reg = /\d+/;
        var marLeft = parseInt(this.hiddenDiv.css('margin-left')) + 172;
        marLeft = (marLeft > 0) ? 0 : marLeft;
        this.hiddenDiv.css('margin-left', '' + parseInt(marLeft) + 'px');
    },
    addItem: function(name, src,isload) {
        //if(this.titleStack.toString().indexOf(name) > -1) {
        // name=name+"_1";
        //}

        for (var i = 0; i < this.titleStack.length; i++) {
            if (this.titleStack[i].indexOf(name) > -1 && this.titleStack[i] == name) {
                //name = name + "_" + this.titleStack.length;
            	this.setActiveItem(i);
            	return ;
            }
        }

        var tabNew = $("<h2> <span><a>" + name + "</a></span><a class=\"del\"></a></h2>");
        var contNew = null;
        if(!isload){
        	contNew=$("<div class=\"timesInner hide\"  id=\"introDiv\" style=\"display: none;\"><iframe style=\"border:0;overflow:auto;\" id='iframe' src="+src+" width=\"100%\" height=\"100%\" frameborder=\"0\" scrolling=\"auto\" marginwidth=\"0\" marginheight=\"0\"></div>")
        }else{
        	contNew = $("<div class=\"timesInner hide\"  id=\"introDiv\" style=\"display: none;\"></div>").load(src);
        }
        $(this.tabDiv).append(tabNew);
        //当追加的元素总宽度大于显示宽度时，让追加的最后一个元素显示在最后一个
        console.log(document.body.clientWidth-241-77);
         if(this.tabStack.length*172-10-document.body.clientWidth-241-77+828>=0){
    	    var marLeft = this.tabStack.length*172-10-document.body.clientWidth-251-77;
    	    this.hiddenDiv.css('margin-left', '-' + marLeft + 'px');
         } 
                 
        $(this.contDiv).append(contNew[0]);


        //取标题
        var title = tabNew.children("span").children('a').html();
        this.titleStack.push(title);
        this.tabStack.push(tabNew[0]);
        this.contStack.push(contNew[0]);
        this.addEvents();
        var bodyHeight = document.documentElement.clientHeight;
        var h = bodyHeight - 50 - 20 - 32;
        $(contNew).css('height', h + 'px');
        this.setActiveItem(this.tabStack.length - 1);
        this.tabManager();
        
        var body=document.getElementById('iframe').contentWindow.document.getElementsByTagName("body");
        console.log(body);
            
    },
    removeItem: function(index) {
        var delTab = this.tabStack.splice(index, 1);
        //$(delTab[0]).remove();
        var delCont = this.contStack.splice(index, 1);


        if (this.getActiveIndex() >= index) {
            this.setActiveIndex((this.getActiveIndex() - 1) < 0 ? 0 : (this.getActiveIndex() - 1));
        }


        var changeActive;
        if (index != this.getActiveIndex()) {
            changeActive = true;
        }

        $(delTab[0]).remove();
        $(delCont[0]).remove();

        //更新标题栈
        this.titleStack.splice(index, 1);
        this.tabManager();

        if (changeActive) {
            this.setActiveItem((index - 1) < 0 ? 0 : (index - 1));
        } else {
            this.setActiveItem(this.getActiveIndex());
        }
        

    },
    removeItems: function(item) {
        var tabs = this;
        $(this.tabStack).each(function(i) {

            if (tabs.tabStack[i] == item[0]) {
                tabs.removeItem(i);
            }
        });
    },
    tabManager: function(value) {
        var ul = $(".winMagerCss>Ul");
        ul.children().remove();
        var tempTitles = this.titleStack.slice(0);
        var newTitles = tempTitles;
        if (value != null && value != "") {
            //ie不支持filter
            // newTitles = tempTitles.filter(function(item){
            //     return !item.indexOf(value);
            // });
            newTitles = $.grep(tempTitles, function(item) {
                return !item.indexOf(value);
            });
        }

        for (var i = 0; i < newTitles.length; i++) {
            var title = newTitles[i];
            var li = $("<li><a onclick=\"tabs.setActiveItemByName('" + title + "')\">" + title + "</a></li>");
            ul.append(li);
        }
    },
    updateStauts: function(){
        $(this.tabStack).each(function() {
            $(this).removeClass("on");
        });
        $(this.contStack).each(function() {
            $(this).hide();
        });
    },
    addEvents: function() {
        var tabs = this;
        $(this.tabStack).each(function(i) {
            $(this).click(function() {
                tabs.setActiveItem(i);
                tabs.setActiveIndex(i);
            });
            $(this).children('.del').click(function(event) {

                var e = event ? event : window.event;
                var elem = event.srcElement ? event.srcElement : event.target;
                tabs.removeItems($(elem).parent());
            });
        });

    }

}


function toggelNewEle(elem) {
    $(elem).next().toggle();
}


/*主页菜单*/
function menuList() {

    var menuList = $('#menuList');
    var li = menuList.find("li");
    li.click(function() {
        var lis = $(this);
        lis.siblings().removeClass("on").end().addClass("on");
    })

}

/*全屏*/
function fullSc(){
    if($('#leftMenuPanel').css('display')=='none'){
        $('#leftMenuPanel').show();
        $('#rightCont').css('margin-left','221px');
        
    }else{
        $('#leftMenuPanel').hide();
        $('#rightCont').css('margin-left','0');
    }
}


//初始化
$(function(){
    //菜单
    var menuList=$('#menuList');
    var li=menuList.find("li");
    li.click(function(){
        var lis=$(this);
        lis.siblings().removeClass("on").end().addClass("on");
    })
    //解决部分IE版本下console.log 不支持引起脚本错误部分功能不能用问题
		window.console = window.console || (function(){ 
		var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile 
		= c.clear = c.exception = c.trace = c.assert = function(){}; 
		return c; 
	})();
})



/**
 * 下拉列表控件 by xjj
 * @param divId  元素id      下拉列表控件
 * @param input  隐藏域id    用于记录实际选择的value
 * @return 
 *  eg:  初始化下拉列表控件 $.doselect("#cxDiv", "#inputselect1");
 */
jQuery.doselect = function(divId, input) {
        $(document).click(function(e) {
            var target = $(e.target);
            if (target.closest(".select_def").length != 0||target.closest(".selCss").length != 0||target.closest(".miniSel").length != 0) {} else {
                $('.select_def>ul,.selCss>ul,.miniSel>ul').hide();
            	$(divId).removeClass("on");
            }
        });
        var inputElem = $(input);
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
    /**
     * 下拉列表控件 by xjj
     * @param divId  元素id      下拉列表控件
     * @param input  隐藏域id    用于记录实际选择的value
     * @param value  修改的值    用于修改下拉列表的选择项
     * @return 
     *  eg: 动态设置值         $.doselectValue("#hxDiv", "#inputselect3","亚信小谷围1");
     */
jQuery.doselectValue = function(divId, input, value) {
    var inputElem = $(input);
    $(divId + " ul li a").each(function() {
        var value1 = $(this).attr("selValue");
        if (value == value1) {
            var txt = $(this).text();
            $(divId + ">a").html(txt);
            inputElem.val(value1);
        }
    })
}
jQuery.doselectIndex = function(divId, input, index) {
	var value=$(divId + " ul li a").eq(index).attr("selValue");
    var inputElem = $(input);
    $(divId + " ul li a").each(function() {
        var value1 = $(this).attr("selValue");
        if (value == value1) {
            var txt = $(this).text();
            $(divId + ">a").html(txt);
            inputElem.val(value1);
        }
    })
}

/*Soul Email:2585625475@qq.com ————————————————————————————————————————————————————————————————————————————*/
//二级弹窗
function showBusiwin2(el) {
    $("<div id='bodyLoad' class=\"datagrid-mask2\"></div>").css({
        display: "block",
        width: "100%",
        height: document.body.clientHeight
    }).appendTo("body");
    var elW = $('#' + el).outerWidth(true);
    var elH = $('#' + el).outerHeight(true);
    elW = (document.body.clientWidth - elW) / 2 + 'px';
    elH = (document.body.clientHeight - elH) / 2 + 'px';
    $('#' + el).css({
        display: "block",
        top: elH,
        left: elW
    });
}


function openFile(){
    $(".openFile>input").change(function(){
        var bb = $(this).val();
        $(".input_noneBor").val(bb);
    })
}
function litileTools(){
    //多选框样式修改
     $(".inputBtn").click(function(){
        if($(this).find("input[type='checkbox']").is(":checked")){
            $(this).addClass("on");
            $(this).parent().hasClass("ul_list")?false:$(this).parent().addClass("on");
        }else{
             $(this).removeClass("on");
             $(this).parent().hasClass("ul_list")?false:$(this).parent().removeClass("on");
        }
    });
}
//下拉框JQUERY 绑定
function selCssF(){
    //点击非下拉框区域，已展开的下拉框会自动收回
    $(document).click(function(e) {
            var target = $(e.target);
            if (target.closest(".select_def").length != 0||target.closest(".selCss").length != 0||target.closest(".miniSel").length != 0) {} else {
                $('.select_def>ul,.selCss>ul,.miniSel>ul').hide();
            }
        });
     $(".marks").click(function(){
        $(this).siblings("ul").slideToggle("fast");
      })
      $(".selLoud ul li a").click(function(){
            var a_obj = $(this);
            var value = $(this).attr("selValue");
            var txt = $(this).text();
            a_obj.parent().parent("ul").slideToggle("fast");
            a_obj.parent().parent("ul").siblings("input").val(value);
            a_obj.parent().parent("ul").siblings("a").html(txt);
      })
}
/*Soul Email:2585625475@qq.com  ——————————————————————————/——————————————————————————————*/


/************************************************* by wefrogll start **********************************************************/
//绑定下拉形式值，及选中 名称
function bindList(parent){
	var parentDom = document;
	if(undefined != parent && null != parent && '' != parent){
		parentDom = parent;
	}
	$(document).click(function(e) {
         var target = $(e.target);
         if (target.closest(".selCss").length != 0) {} else {
             $('.selCss>ul').hide();
             $(".selCss").removeClass("on");
         }
     });
     $(".selCss>a,.selCss>.marks",parentDom).click(function(){
    	$('.select_def>ul,.selCss>ul,.miniSel>ul').hide();
        if($(this).siblings("ul").css("display")=="none"){
        $(this).siblings("ul").css("display","block");
        $(".selCss").removeClass("on");
        $(this).parent(".selCss").addClass("on");		
        }else{
        $(this).siblings("ul").css("display","none")	
        $(this).parent(".selCss").removeClass("on");	
        }
       
      })
      
      //根据隐藏域值去选所属下拉框中的名称显示出来
      $(".selLoud",parentDom).each(function(item,i){
      		var selectValue = $(this).prev().val();
      		var selectName ="";
      		$(this).find("ul li a").each(function(item,i){
      			if(selectValue == $(this).attr("selValue")){
      				selectName = $(this).text();
      			}
      		});
      		if("" != selectName){
      			$(this).children('a:first').html(selectName);
      		}
      });
      //绑定事件
      $(".selLoud ul li a",parentDom).click(function(){
            var a_obj = $(this);
            var value = $(this).attr("selValue");
            var txt = $(this).text();
            a_obj.parent().parent("ul").css("display","none");
            a_obj.closest(".selCss").removeClass("on");
            a_obj.closest(".selLoud").prev("input[type='hidden']").val(value);
            a_obj.closest(".selLoud").find("a:first").html(txt);
          	
      })
}


//绑定下拉形式多选值，及选中 名称
function bindCheckboxList(parent){
	var parentDom =document;
	if(undefined != parent && null != parent && '' != parent){
		parentDom = parent;
	}
	$(document).click(function(e) {
         var target = $(e.target);
         if (target.closest(".selCss").length != 0) {} else {
             $('.selCss>ul').hide();
             $(".selCss").removeClass("on");
         }
     });
     $(".marks2",parentDom).click(function(){
       // $(this).siblings("ul").slideToggle("fast");
    	 if($(this).siblings("ul").css("display")=="none"){
        $(this).siblings("ul").css("display","block")	
        $(this).parent(".selCss").addClass("on");		
        }else{
        $(this).siblings("ul").css("display","none")	
        $(this).parent(".selCss").removeClass("on");	
        }
      })
      //根据隐藏域值去选中所属下拉框中的CHECKBOX及把相应的名称显示出来
      $(".checkBoxLoud",parentDom).each(function(item,i){
      		var checkValueArray = $(this).prev().val().split(',');
      		var checkNameArray = new Array();
      		$(this).find("input[type='checkbox']").each(function(item,i){
      			if($.inArray($(this).val(), checkValueArray) != -1  ){
      				$(this).prop('checked','checked');
      				checkNameArray.push($(this).next().html());
      			}
      		});
      		if(checkNameArray.length != 0){
      			$(this).children('a:first').html(checkNameArray);
      		}
      });
      //选定时把值绑定到隐藏域，及把相应的名称显示出来
      $(".checkBoxLoud ul li ",parentDom).click(function(){
            var a_obj = $(this);
            var checkValueArray = new Array();
            var checkNameArray = new Array();
            a_obj.children("input[type='checkbox']").trigger('click');
            a_obj.closest("ul").find("li input[type='checkbox']").each(function(item,index){
            	if($(this).prop("checked")){
            		checkValueArray.push($(this).val());
            		checkNameArray.push($(this).next().html());
            	}
            })
            a_obj.closest(".checkBoxLoud").prev().val(checkValueArray);
            a_obj.closest(".checkBoxLoud").children("a:first").html(checkNameArray);
      })
}

/************************************************** by wefrogll end*********************************************************/