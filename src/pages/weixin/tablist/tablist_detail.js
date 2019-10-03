loader.define(function(require,exports,module){

    var pageview = {};
    var title ;
    var link 
    var getParams = bui.getPageParams();
        getParams.done(function(result){
            // result is params object
           link = result.link ;
           title = result.title ;

           console.log(link)
    })

    pageview.init = function() {

    	$("#weixin_tab_detail_title").html(title) ;

    	$("#myframe").attr('src',"http://tigerchain.github.io") ;

    }

    pageview.init() ;

    return pageview;
})