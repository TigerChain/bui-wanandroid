loader.define(function(require,exports,module){

    var pageview = {};

    pageview.init = function() {

    	bui.ajax({
    	    url: baseUrl +"/navi/json",
    	    data: {},//接口请求的参数
    	    // 可选参数
    	    method: "GET"
    	}).then(function(result){
    	    // 成功
    	    // 
    	    var data = result.data ;
    	    var dyTab = getNavigationTab(data) ;

    	    $("#navigation_home_list").html(dyTab)
    	},function(result,status){
    	    // 失败 
    	});

    }

    pageview.init() ;

    function getNavigationTab(data) {
    	var html ="" ;
    	data.map((el,index)=>{
    		html += `<li style="border:1px solid orange;border-radius:50px;margin:5px;padding:5px 15px;">${el.name}</li>` ;
    	}) ;

    	return html ;
    }
 
   

    return pageview;
})