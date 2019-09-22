loader.define(function(require, exports, module) {
    var pageview = {};

    pageview.init = function() {
        bui.ajax({
            url: baseUrl + "/wxarticle/chapters/json",
            data: {}, //接口请求的参数
            // 可选参数
            method: "GET"
        }).then(function(result) {
            // 成功
            var data = result.data;

            var dyTab = getTab(data) ;
            var contentLi = getContentLi(data) ;
            $("#weixin_tab_nav").html(dyTab)
            $("#weixin_tab_cotnent_ul").html(contentLi)
            var uiTab = bui.tab({
                id: "#weixin_tab_uiTabNavbar",
                menu: "#weixin_tab_nav",
                autoload: true
            });

            var contentLis = $("#weixin_tab_cotnent_ul li")
            // 让顶部导航滚动到可视位置
            uiTab.on("to", function(index) {
                var left = $("#weixin_tab_nav li")[index].offsetLeft;
                document.getElementById("weixin_tab_uiNavbar").scrollLeft = left;
                 var liId = contentLis[index].id ;
	            loader.require(["pages/weixin/tablist/tablist"], function(mod) {
	                        // 有回调的话是每次切换都会触发, 如果home里面还有init执行,则会造成2次触发
	                mod.initScorllList(liId,data[index].id);
	            })
            }).to(0)
        }, function(result, status) {
            // 失败 
        });
    }

    function getTab(data){
    	var html = "" ;
    	data.map((el,index)=>{
    		html+=`<li class="bui-btn" href="pages/weixin/tablist/tablist.html">${el.name}</li>` ;
    	}) ;
    	return html ;
    }
	 function getContentLi(data){
	    	var html = "" ;
	    	data.map((el,index)=>{
	    		html+=`<li id="weixin_tab_${index}"></li>` ;
	    	}) ;
	    	return html ;
	    }
    pageview.init();

    return pageview;
})