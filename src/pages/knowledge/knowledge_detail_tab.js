loader.define(function(require, exports, module) {
    var pageview = {};

    var passData;

    var getParams = bui.getPageParams();

    getParams.done(function(result) {
        // result is params object
        passData = JSON.parse(result.data);
    })

    pageview.init = function() {

    	var dyTab = getTab(passData.children) ;

    	$("#tab_knowledge_nav").html(dyTab) ;

        var uiTab = bui.tab({
            id: "#tab_knowledge_uiTabNavbar",
            menu: "#tab_knowledge_nav",
        });
        // 让顶部导航滚动到可视位置
        uiTab.on("to", function(index) {
            var left = $("#tab_knowledge_nav li")[index].offsetLeft;
            document.getElementById("tab_knowledge_uiNavbar").scrollLeft = left;
        })
    }

    function getTab(data) {
    	var html = "" ;
    	data.map((el,index)=>{
    		html+=`<li class="bui-btn">${el.name}</li>`
    	}) ;

    	return html ;
    } 

    pageview.init();

    return pageview;
})