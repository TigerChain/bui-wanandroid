loader.define(function(require,exports,module){

    var pageview = {};

    var reciveData ;

    var getParams = bui.getPageParams();
        getParams.done(function(result){
            // result is params object
            // 
            reciveData = JSON.parse(result.data) ;
            console.log(reciveData) ;
        })

       pageview.init = function() {

       	 $("#navigation_home_list_title").html(reciveData.name)

       	 var renderList = this.renderArticleList() ;
       	 $("#navigation_home_list_content").html(renderList) ;


       }

       pageview.renderArticleList = function() {
       	 var html = "" ;
       	 reciveData.articles.map((el,index)=>{
       	 	html +=`<li class="bui-btn bui-box" id="navigation_home_item_item">
				<div class="span1">
					<h3 class="item-title">${el.title}</h3>
				</div>
				<i class="icon-listright"></i>
       	 	</li>` ;
       	 }) ;

       	 return html ;
       }

       router.$('ul').on('click',"#navigation_home_item_item",function(e){

       	 var index = $(this).index() ;
       	 var passData = JSON.stringify(reciveData.articles[index]) ;

       	 bui.load({
       	 	url:"pages/navigation/navigation_item_detail.html",
       	 	param:{
       	 		"passData":passData
       	 	} 
       	 });

       	 e.stopPropagation() ;
       })

       

       pageview.init() ;

    return pageview;
})