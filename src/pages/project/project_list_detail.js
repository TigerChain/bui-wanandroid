loader.define(function(require,exports,module){

    var pageview = {};

    var cid,
    	name ;

	var getParams = bui.getPageParams();
	    getParams.done(function(result){
	        // result is params object
	        // 
	        cid = result.cid ;
	        name = result.title ;

	        console.log(cid,name) ;
	    })

    pageview.init = function() {

    	// /project/list/1/json?cid=294
    	// 
    	$("#home_list_detail_title").html(name)

    	// 列表滚动加载 js 初始化: 
    	var uiScroll = bui.scroll({
    	    id: "#home_list_detail_uiScroll",
    	    children: "#home_list_detail_uiScroll_bui-list",
    	    page:0,
    	    pageSize:5,
    	    onRefresh: function () {
    	        var page = 0;
    	        var pagesize = 5;
    	        getData(page,pagesize,"html");
    	    },
    	    onLoad: getData
    	})
    	
    	
    	//新增下一页数据
    	function getData(page,pagesize,command){
    	  var command = command || "append";

    	  bui.ajax({
    	      url: baseUrl+"/project/list/"+page+"/json?",
    	      data: {
    	      	"cid":cid
    	      },//接口请求的参数
    	      // 可选参数
    	      method: "GET"
    	  }).then(function(result){
    	    
    	      var data = result.data.datas ;
    	      
    	      console.log(data)

    	      var html = "" ;
    	      data.map((el,index)=>{
    	      	html +=`<li class="bui-btn">

					<div class="bui-box" >
						<div class="bui-thumbnail"><img src="${el.envelopePic}"></img></div>
						<div class="span1">
							<h3 class="item-title">${el.desc}</h3>
						</div>
					</div>

					<div style="display:flex;justify-content:space-between;margin-top:5px;">
						<span>Author:${el.author}</span>
						<span>${el.niceDate}</span>
					</div>

    	      	</li>` ;
    	      }) ;

    	      $("#home_list_detail_uiScroll_bui-list")[command](html)


    	  // 更新分页信息,如果高度不足会自动请求下一页
    	  uiScroll.updateCache(page,result.data.datas);
    	
    	  // 刷新的时候返回位置
    	  uiScroll.reverse();
    	
    	      
    	  },function(result,status){
    	      // 失败 
    	  });
    	 
    	}
    	
    
    
    }

    pageview.init() ;

    return pageview;
})