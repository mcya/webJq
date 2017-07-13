/**
 * 金额按千位逗号分割
 * @character_set UTF-8
 * @author Jerry.li(hzjerry@gmail.com)
 * @version 1.2014.08.24.2143
 *  Example
 * 	<code>
 *      alert($.formatMoney(1234.345, 2)); //=>1,234.35
 *      alert($.formatMoney(-1234.345, 2)); //=>-1,234.35
 *      alert($.unformatMoney(1,234.345)); //=>1234.35
 *      alert($.unformatMoney(-1,234.345)); //=>-1234.35
 * 	</code>
 */
;(function($)
{
    $.extend({
    	/**
    	 * $.tips('Hi，我是tips', '吸附元素选择器，如#id');
    	 */
    	tips :function(id,msg){
    		layer.tips(msg, id,{tipsMore: true});
    	},
    	
    	/**
    	 * ajax发送，老记不得参数，简化下
    	 */
    	ajaxdata:function(url,data,async,sfunc,efunc){
    		$.ajax({
    			url:url,
    			async:async,
    			cache:false,
    			data:data,
    			type:'POST',
    			success:sfunc,
    			error:efunc
    		});
    	},
    	
    	ajaxjson:function(url,data,async,sfunc,efunc){
    		$.ajax({
    			url:url,
    			async:async,
    			cache:false,
    			data:data,
    			dataType:'JSON',
    			type:'POST',
    			success:sfunc,
    			error:efunc
    		});
    	},
    	
        /**
         * 金额按千位逗号分割
         * @public
         * @param mixed mVal 数值
         * @param int iAccuracy 小数位精度(默认为2)
         * @return string
         */
        formatMoney:function(mVal, iAccuracy){
            var fTmp = 0.00;//临时变量
            var iFra = 0;//小数部分
            var iInt = 0;//整数部分
            var aBuf = new Array(); //输出缓存
            var bPositive = true; //保存正负值标记(true:正数)
            
            /**
             * 输出定长字符串，不够补0
             * <li>闭包函数</li>
             × @param int iVal 值
             * @param int iLen 输出的长度
             */
            function funZero(iVal, iLen){
                var sTmp = iVal.toString();
                var sBuf = new Array();
                for(var i=0,iLoop=iLen-sTmp.length; i<iLoop; i++)
                    sBuf.push('0');
                sBuf.push(sTmp);
                return sBuf.join('');
            };

            if (typeof(iAccuracy) === 'undefined')
                iAccuracy = 2;
            if(mVal && mVal.toString().indexOf(",")!=-1)return mVal;//防重
            mVal=Number(mVal).toFixed(iAccuracy);
            bPositive = (mVal >= 0);//取出正负号
            fTmp = (isNaN(fTmp = parseFloat(mVal))) ? 0 : Math.abs(fTmp);//强制转换为绝对值数浮点
            //所有内容用正数规则处理
            iInt = parseInt(fTmp,10); //分离整数部分
            iFra = parseInt((fTmp - iInt) * Math.pow(10,iAccuracy) + 0.5,10); //分离小数部分(四舍五入)
            do{
            	var t=funZero(iInt % 1000, 3);
                aBuf.unshift(t);
            }while((iInt = parseInt(iInt/1000)));
            aBuf[0] = parseInt(aBuf[0],10).toString();//最高段区去掉前导0
            return ((bPositive)?'':'-') + aBuf.join(',') +'.'+ ((0 === iFra)?'00':funZero(iFra, iAccuracy));
        },
        /**
         * 将千分位格式的字符串转换为浮点数
         * @public
         * @param string sVal 数值
         * @return float
         */
        unformatMoney:function(sVal){
        	if(sVal){
        		sVal=sVal.toString();
        		var fTmp = parseFloat(sVal.replace(/,/g, ''));
        		return (isNaN(fTmp) ? 0 : fTmp);
        	}
        	return 0;
        },


        /**
         * 把数字加上千分位
         *
         * @param sval string
         * @param dcnt 小数位数
         * @returns {string}
         */
        fnum: function (sval, dcnt) {
            sval = sval || "0";
            var temcnt = 0;
            if (typeof(dcnt) != 'undefined') {
                temcnt = dcnt
            } else {
                var idx = sval.indexOf(".");
                if (idx >= 0) {
                    temcnt = sval.substring(idx + 1).length;
                }
            }
            return $.formatMoney(sval, temcnt);
        },


        /**
         * unformatNumber
         *
         * @param string sVal 数值
         * @return float
         */
        unfn: function (sVal) {
            return $.unformatMoney(sVal);
        },

        /**
         * 将千分位格式的字符串去掉千分位
         *
         * @param sVal
         * @returns {string}
         */
        unfs: function (sVal) {
            return  (sVal || "").replace(/,/g, '');
        },

        /**
         * 去掉千分号再转成parseFloat
         * @param sVal
         */
        pfl: function (sVal) {
            return parseFloat($.unfs(sVal) || 0);
        },

        forbitEdit: function () {
            $("a").each(function () {
                var a = $(this);
                var text = $(a).html();
                if(!text || text == "上一步" || text == "下一步") {
                    return;
                }
                if($(a).hasClass("abnext") || $(a).hasClass("abpre") || $(a).hasClass("MJBtn")) {
                    return;
                }
                $(a).attr("href", "javascript:void(0);").unbind().removeAttr("onclick");
                if ($(a).hasClass("a_Div")) {
                    $(a).attr("class", "disableBtn a_Div");
                } else {
                    $(a).attr("class", "disableAnchor");
                }
            });
            $("div.fileBtn").attr("class", "disableBtn").unbind().siblings().remove();
            $("input[type='text']").attr("readonly", true).attr("disabled", true);

        },

        /**
         * parseFloat
         *
         * @param val
         * @returns {Number}
         */
        p: function (val) {
            return parseFloat(val);
        },

        /**
         * toFixed -> parseFloat
         * @param val
         * @param pos
         * @returns {*}
         */
        fix: function (val, pos) {
            if (!val)return Number(0).toFixed(pos);
            if (!pos)pos = 2;
            var num = Number(val).toFixed(pos);
            return $.p(num);
        },

        /**
         * verify number input
         * @param ipt
         */
        vni: function (ipt) {
            var val = $.unfs($(ipt).val()); //先去掉数字中的','号
            if (!/^\d+$/.test(val) && !/^\d+.?\d+$/.test(val)) {
                $(ipt).val("");
            }
        },

        showProcessing: function (msg) {
            try {
                var win = $.messager.progress({
                    title: '处理中',
                    text: '',
                    interval: 800,
                    msg: msg || '正在处理，请等待...'
                });
            } catch (e) {
                //alert("error");
            }
        },

        closeProcessing: function () {
            try {
                $.messager.progress('close');
            } catch (e) {
                //ignore
            }
        },
        /**
         * 树对象，被查找的属性名，查找的关键字
         */
        searchTree : function(zTree,keyType,keyword){
        	if(!zTree)return;
        	var nodeList = zTree.getNodesByParamFuzzy(keyType, keyword);
        	var nodes = zTree.transformToArray(zTree.getNodes());
        	zTree.showNodes(nodes);
        	for(var i=0,l=nodes.length;i<l;i++){//查找树
        		var finded=false;
        		var node=nodes[i];
        		for(var j=0,x=nodeList.length; j<x; j++) {
            		if(node.name==nodeList[j].name)finded=true;
            	}
        		if(!finded)zTree.hideNode(node);
        	}
        	for(var j=0,x=nodeList.length; j<x; j++) {//查找树把各个树节点显示
        		var node=nodeList[j];
        		while(node.getParentNode() && node.getParentNode().pId!="0"){
        			node=node.getParentNode();
        			zTree.showNode(node);
        		}
        	}
        	
        	zTree.expandAll(false);
        	if(keyword!=""){//关键字非空，展开所有节点
        		//alert(keyword);
        		zTree.expandAll(true);
        	}
        	
        }


    });
})(jQuery);