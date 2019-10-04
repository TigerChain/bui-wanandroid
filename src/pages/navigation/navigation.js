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
    		html += `<li id="navigation_home_list_item" style="border:1px solid orange;border-radius:50px;margin:5px;padding:5px 15px;">${el.name}</li>` ;
    	}) ;

        router.$("ul").on('click',"#navigation_home_list_item",function(e){
            console.log(444) ;
            var index = $(this).index() ;

            var passData = JSON.stringify(data[index]) ;

            bui.load({
                url:"pages/navigation/navigation_home_list.html",
                param:{
                    "data":passData
                } 
            });
            e.stopPropagation() ;
        })

    	return html ;
    }
 
   

    return pageview;
})