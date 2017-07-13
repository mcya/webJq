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

$(function() {
    $('.detailInner').css('height', (document.body.clientHeight - 57 - 42 - 2) + 'px');
    $(window).resize(function() {
        $('.detailInner').css('height', (document.body.clientHeight - 57 - 42 - 2) + 'px');
    });
    /*菜单切换*/
    $('.menu a').click(function() {

        $('.detailInner').css('height', (document.body.clientHeight - 57 - 42 - 2) + 'px');
        var me = this;
        var number;
        $('.menu a').each(function(index, elem) {
            if (elem == me) {
                number = index;
                $(elem).addClass('on');
            } else {
                $(elem).removeClass('on');
            }
        });

        $('.detailCon .detailInner').each(function(index, elem) {
            if (index == number) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });

    });


    /******返回顶部按钮*******/
    $(window).scroll(function() {
        //获取窗口的滚动条的垂直位置 
        var s = jQuery(window).scrollTop();
        //当窗口的滚动条的垂直位置大于页面的最小高度时，让返回顶部元素渐现，否则渐隐 
        if (s > 0) {
            $("#topBtn").fadeIn(100);
        } else {
            $("#topBtn").fadeOut(200);
        };
    });
    pageScroll();
})

function pageScroll() {
    //把内容滚动指定的像素数（第一个参数是向右滚动的像素数，第二个参数是向下滚动的像素数） 
    window.scrollBy(0, -1000);
    //window.scrollTo(0,0); 
    //延时递归调用，模拟滚动向上效果 
    scrolldelay = setTimeout('pageScroll()', 50);
    //获取scrollTop值，声明了DTD的标准网页取document.documentElement.scrollTop，否则取document.body.scrollTop；因为二者只有一个会生效，另一个就恒为0，所以取和值可以得到网页的真正的scrollTop值 
    var sTop = document.documentElement.scrollTop + document.body.scrollTop;
    //判断当页面到达顶部，取消延时代码（否则页面滚动到顶部会无法再向下正常浏览页面） 
    if (sTop == 0) clearTimeout(scrolldelay);
}

function gotoPage(url) {
    window.location = url;
}



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
            $(".selCss").removeClass("on");
            var ul = $(divId + " ul");
            if (ul.css("display") == "none") {
                $('.select_def>ul,.selCss>ul,.miniSel>ul').hide();
                ul.show();
                 $(divId).removeClass("on"); 
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



function tbListShow(elem) {
    if ($(elem).hasClass('hiddenBtn')) {
        $(elem).attr('class', 'showBtn');
        $(elem).find('span').eq(0).html('展开');
    } else {
        $(elem).attr('class', 'hiddenBtn');
        $(elem).find('span').eq(0).html('收起');
    }
    $('.tbListPanel').toggle();
}


/******让元素固定位置显示********/
function fixedElem(b, h, p) {
    var g = document.getElementById(b);
    var d = n();
    var l = 0;
    if (p.id) {
        var c = document.getElementById(p.id)
    }
    if (window.addEventListener) {
        window.addEventListener("scroll", a, false)
    } else {
        if (window.attachEvent) {
            window.attachEvent("onscroll", a)
        }
    }

    function a() {
        d = n() + 100;
        var q = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (q >= d) {
            l = 1;
            if (!window.XMLHttpRequest) {
                g.style.cssText = "position: absolute; " + h + ": " + q + "px; z-index: 1001;"
            } else {
                g.style.cssText = "position: fixed; " + h + ": 0; z-index: 1001;"
            }
            if (p.type == "tabBuy") {
                c.style.display = "inline-block"
            }
            if (p.hideEle) {
                var hide = document.getElementById(p.hideEle);
                hide.style.display = "none";
            }

        } else {
            l = 0;
            g.style.cssText = "position: static; " + h + ": auto; z-index: 0;";
            if (p.type == "tabBuy") {
                c.style.display = "none"
            }

            if (p.hideEle) {

                var hide = document.getElementById(p.hideEle);
                hide.style.display = "inline-block";
            }

        }
    }

    function n() {
        g.style.cssText = "position: static; " + h + ": auto; z-index: 0;";
        var q = g.offsetTop;
        return q

    }
    var m = g.getElementsByTagName("a");
    for (var e = 0; e < m.length; e++) {
        m[e].onclick = function() {
            return function() {
                if (!l) {
                    return
                }
                l = 0;
                g.style.cssText = "position: static; " + h + ": auto; z-index: 0;";
                document.body.scrollTop = d - 1;
                document.documentElement.scrollTop = d - 1
            }
        }()
    }
}

/*******新版***********/
/**
 * 左边菜单accordion控件 by xjj
 * @param className  样式名称
 * @return 
 *  eg: $('.acdBox').accordion();
 */
$.fn.extend({
    accordion: function(options) {
        var acdBox, items;
        acdBox = $(this);
        items = acdBox.children(".acdItem");
        allItemList = items.find(".ItemBody");
        allitemHead = items.find(".ItemHead");
        allItemList.hide();
        items.each(function(i) {
            var menuItem = items.eq(i);
            var itemHead = menuItem.find(".ItemHead");
            itemHead.click(function() {
                var itemList = menuItem.children(".ItemBody");
                if (itemList.css("display") == 'none') {
                    allItemList.hide(200);
                    items.removeClass("on");
                    menuItem.addClass("on");
                    itemList.show(200);
                } else {
                    menuItem.removeClass("on");
                    itemList.hide(200);
                }
            });
        });
        //绑定事件
        var lis=allItemList.find("li");
        var as=allItemList.find("li>a");

        as.click(function(event){
                var e = event ? event : window.event;
                var elem = event.srcElement ? event.srcElement : event.target;
                lis.removeClass("select");
                //if($(elem)[0].tagName=='li'){
                $(elem).parent().addClass("select");
                //}
               
        });

        items.eq(0).find(".ItemHead").trigger('click');
    }
});
$(function() {
    $('.acdBox').accordion();
});
function itemSelect(){

}


/**
 * tab控件 by xjj
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
            this.hiddenDiv=$(overHiddenDiv);

            this.id=divId;
            this.tabDiv = tabDiv;
            this.contDiv = contDiv;


            var tabStack = [],
                contStack = [],
                titleStack=[];

            $(tabList).each(function(i) {
                tabStack.push(this);
                 //取标题
                var title=$(this).children("span").children('a').html();
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
            this.setActiveIndex(i);
        },
         setActiveItemByName: function(name) {
            isFind=false;
            var index;
            for (var i = 0; i < this.titleStack.length; i++) {
                if (this.titleStack[i].indexOf(name) > -1&&this.titleStack[i]==name) {
                   isFind=true;
                   index=i;
                }
            }
            if(isFind){
                  this.setActiveItem(index);
            }
        },
         movetoTab: function(index) {
            this.hiddenDiv.css('margin-left','-'+162*index+'px');
        },
         movetoLeft: function() {

             var reg = /\d+/;
           
            //var marLeft=parseInt(this.hiddenDiv.css('margin-left').match(reg)[0])-162;
            var marLeft=parseInt(this.hiddenDiv.css('margin-left'))-162;
            this.hiddenDiv.css('margin-left',''+marLeft+'px');
        },
         movetoRight: function() {
           
             var reg = /\d+/;
            var marLeft=parseInt(this.hiddenDiv.css('margin-left'))+162;
            marLeft=(marLeft>0)?0:marLeft;
            this.hiddenDiv.css('margin-left',''+parseInt(marLeft)+'px');
        },
        addItem: function(name,src) {



            //if(this.titleStack.toString().indexOf(name) > -1) {
                    // name=name+"_1";
            //}

            for (var i = 0; i < this.titleStack.length; i++) {
                if (this.titleStack[i].indexOf(name) > -1&&this.titleStack[i]==name) {
                	this.setActiveItem(i);
                	return ;
                }
            }


            var tabNew = $("<h2> <span><a>"+name+"</a></span><a class=\"del\"></a></h2>");
            var contNew = null;
//            if(!isload){
//            	contNew=$("<div class=\"timesInner hide\" id=\"introDiv\" style=\"display: none;\"><iframe style=\"border:0\" src="+src+" width=\"100%\" height=\"100%\"></div>")
//            }else{
//            	contNew = $("<div class=\"timesInner hide\" id=\"introDiv\" style=\"display: none;\"></div>").load(src);
//            }
            var contNew = $("<div class=\"timesInner hide\" id=\"introDiv\" style=\"display: none;\"><iframe style=\"border:0\" src="+src+" width=\"100%\" height=\"100%\"></div>");
            $(this.tabDiv).append(tabNew);
            $(this.contDiv).append(contNew[0]);


            //取标题
            var title=tabNew.children("span").children('a').html();
            this.titleStack.push(title);
            this.tabStack.push(tabNew[0]);
            this.contStack.push(contNew[0]);
            this.addEvents();
            var bodyHeight=document.documentElement.clientHeight ;
            var h=bodyHeight-58-20-32;
            $(contNew).css('height',h+'px');
            this.setActiveItem(this.tabStack.length - 1);
            this.tabManager();
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
             var tabs=this;
             $(this.tabStack).each(function(i) {
                    
                    if(tabs.tabStack[i]==item[0]){
                        tabs.removeItem(i);
                    }
             });
        },
        tabManager:function(value){
            var ul=$(".winMagerCss>Ul");
            ul.children().remove();
            var tempTitles=this.titleStack.slice(0); 
            var newTitles=tempTitles ;
            if(value!=null&&value!=""){
                //ie不支持filter
                // newTitles = tempTitles.filter(function(item){
                //     return !item.indexOf(value);
                // });
               newTitles= $.grep(tempTitles,function(item){
                            return !item.indexOf(value);
               });
            }

            for(var i=0;i<newTitles.length;i++){
                    var title=newTitles[i];
                    var li=$("<li><a onclick=\"tabs.setActiveItemByName('"+title+"')\">"+title+"</a></li>");
                    ul.append(li);
            }
        },
        updateStauts: function() {
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


    function toggelNewEle(elem){
        $(elem).next().toggle();
    }