loader.define(function(require,exports,module){

	// https://wanandroid.com/wxarticle/list/408/1/json

    var pageview = {};
    var scrolls = [] ;

    pageview.initScorllList = function(idFlag,id) {

    	if(scrolls[idFlag]) {
    		scrolls[idFlag].init({
    			onRefresh:onRefresh,
    			onLoad:getData
    		})
    	}else {
    		// 列表滚动加载 js 初始化: 
    	scrolls[idFlag] = bui.scroll({
    	    id:"#" +idFlag+ " #weixin_tab_list_uiScroll",
    	    children: "#" +idFlag+ " #weixin_tab_list_bui_list",
    	    page:1,
    	    pageSize:5,
    	    onRefresh: onRefresh,
    	    onLoad: getData
    	})
    	}
    	
    	
    	
    	//新增下一页数据
    	function getData(page,pagesize,command){
    	  var command = command || "append";
    	  
    	   bui.ajax({
    	       url: baseUrl +"/wxarticle/list/"+id+"/"+page+"/json",
    	       data: {},//接口请求的参数
    	       // 可选参数
    	       method: "GET"
    	   }).then(function(result){
    	       // 成功
    	       console.log(result.data.datas)
    	        // 成功
                var mydata = result.data.datas;
                var html = "";
                mydata.map(function(el, index) {
                    html += `
                    <li class="bui-btn">
                        <div style="display: flex;justify-content: space-between;margin-bottom: 10px;">
                            <span>
                                Author:${el.author}
                            </span>
                            <span>
                                ${el.niceDate}
                            </span>
                        </div>
                        <span style="font-size: 16px;color: black;">
                            ${el.title}
                        </span>
                        <div style="margin-top: 7px">
                            <span style="color: red;">
                                ${el.superChapterName}
                            </span>
                        </div>
                    </li>` ;
                })
                $("#" +idFlag+ " #weixin_tab_list_bui_list")[command](html)
                // 更新分页信息,如果高度不足会自动请求下一页
                scrolls[idFlag].updateCache(page, result.data.datas);
                // 刷新的时候返回位置
                scrolls[idFlag].reverse();
    	   },function(result,status){
    	       // 失败 
    	   });
    	
    	}
    	
    	function onRefresh() {
    		 var page = 1;
    	        var pagesize = 5;
    	        getData(page,pagesize,"html");
    	}
    	
    }


    return pageview;
})