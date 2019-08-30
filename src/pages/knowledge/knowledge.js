loader.define(function(require,exports,module){

    var pageview = {};

    pageview.init = function() {

    	// 列表控件 js 初始化: 
    	var uiList = bui.list({
    	    id: "#knowledge-uiList",
    	    url: baseUrl +"/tree/json",
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
    	    	// console.log(data)
    	        var html = "";
    	        data.map(function(el, index) {
    	
    	            html +=`

    	            <li class="bui-btn-title">${el.name}</li>

    	            <li style="display:flex;align-items:center;padding:10px;
    	            justify-content:space-between;">
    	              	<ul style="display:flex;flex-wrap:wrap">
							${el.children.map((child,childIndex) =>

								`${childIndex<6?`<li style="padding:5px;">
										<div style="padding:5px;border:1px solid red;background:#eee;">
											${child.name}
										</div>
									</li>`:""}`
								).join('')}
    	              	</ul>
    	                <i class="icon-listright"></i>
    	            </li>`  
    	        });
    	
    	        return html;
    	    },
    	    autoScroll:false
    	});
    	
    
    	
    }

    pageview.init() ;

    return pageview;
})