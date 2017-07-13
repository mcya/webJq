;(function($)
{
    $.extend({
    	p:function(val){
    		return parseFloat(val);
    	},
    	fix:function(val,pos){
    		if(!val)return Number(0).toFixed(pos);
    		if(!pos)pos=2;
    		var num=Number(val).toFixed(pos);
    		return $.p(num);
    	}
    });
})(jQuery);