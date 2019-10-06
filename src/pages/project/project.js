loader.define(function(require,exports,module){

    var pageview = {};

    pageview.init = function() {


    // 列表控件 js 初始化: 
    var uiList = bui.list({
        id: "#project_home_uiList",
        url:baseUrl+"/project/tree/json",
        pageSize:5,
        data: {},
        //如果分页的字段名不一样,通过field重新定义
        field: {
            page: "page",
            size: "pageSize",
            data: "data"
        },
        callback: function (e) {},
        template: function (data) {
            var html = "";
            data.map(function(el, index) {
    
                html +=`<li class="bui-btn bui-box" id="project_home_list_item">
				<div class="span1">
					<h3 class="item-title">${el.name}</h3>
				</div>
				<i class="icon-listright"></i>
       	 	</li>`
            });


            router.$("ul").on('click',"#project_home_list_item",function(e){

            	var index = $(this).index() ;
            	var passData = data[index] ;
            	console.log(passData) ;
            	var cid = passData.id ;
            	var name = passData.name ;
            	bui.load({
            		url:"pages/project/project_list_detail.html",
            		param:{
            			"cid":cid,
            			"title":name
            		} 
            	});

            	return false ;

            }) ;
    
            return html;
        },
        autoScroll:false,
        refresh:false
    });

    }

    pageview.init() ;


    

    return pageview;
})