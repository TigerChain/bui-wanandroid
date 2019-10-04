loader.define(function(require,exports,module){

    var pageview = {};

    var reciveArticlesData ;

    var getParams = bui.getPageParams();
        getParams.done(function(result){

        	reciveArticlesData = JSON.parse(result.passData) ;
        	console.log(reciveArticlesData)

        })

    pageview.init = function() {
    	$("#navigation_list_detail_title").html(reciveArticlesData.title) ;

    	$("#navigation_detail_frame").attr('src',reciveArticlesData.link)
    }

    pageview.init() ;

    return pageview;
})