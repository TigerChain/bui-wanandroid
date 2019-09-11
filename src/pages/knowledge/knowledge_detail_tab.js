loader.define(function(require, exports, module) {
    var pageview = {};

    var passData;

    var getParams = bui.getPageParams();

    getParams.done(function(result) {
        // result is params object
        passData = JSON.parse(result.data);
    })

    pageview.init = function() {

        if(passData.children.length <=4){
            $("#tab_knowledge_uiNavbar").attr('class','bui-tab') ;
        }else {
            $("#tab_knowledge_uiNavbar").attr('class','bui-navbar') ;
        }

    	var dyTab = getTab(passData.children) ;
        var dyLi = getContentLi(passData.children) ;

    	$("#tab_knowledge_nav").html(dyTab) ;
        $("#tab_knowledge_content").html(dyLi) ;

        var uiTab = bui.tab({
            id: "#tab_knowledge_uiTabNavbar",
            menu: "#tab_knowledge_nav",
            autoload: true,
        });

        var contentLis = $("#tab_knowledge_content li") ;
        // 让顶部导航滚动到可视位置
        uiTab.on("to", function(index) {
            var left = $("#tab_knowledge_nav li")[index].offsetLeft;
            document.getElementById("tab_knowledge_uiNavbar").scrollLeft = left;

           
        }).to(0)

        uiTab.on("load", function(index) {
             var liId = contentLis[index].id ;
            loader.require(["pages/knowledge/knowledge_detail_list"], function(mod) {
                        // 有回调的话是每次切换都会触发, 如果home里面还有init执行,则会造成2次触发
                mod.initScorll(liId,passData.children[index].id);
            })
        });
    }

    function getTab(data) {
    	var html = "" ;
    	data.map((el,index)=>{
    		html+=`<li class="bui-btn" href="pages/knowledge/knowledge_detail_list.html">${el.name}</li>`
    	}) ;

    	return html ;
    } 

    function getContentLi(data) {
        var html = "" ;
        data.map((el,index)=>{
            html+=`<li id="knowledge_cotent_${index}"></li>` ;
        }) ;

        return html ;
    }

    pageview.init();

    return pageview;
})