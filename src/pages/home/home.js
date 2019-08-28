loader.define(function(require, exports, module) {
    var pageview = {};

    pageview.init = function() {

    	// 焦点图 js 初始化:
    	var uiSlide = bui.slide({
    	    id:"#slide",
    	    height:380,
    	    autopage: true,
    	    loop: true,
    	    autoplay:true,
    	    data: []
    	})


        bui.ajax({
            url: "api/banner/json",
            data: {}, //接口请求的参数
            // 可选参数
            method: "GET"
        }).then(function(result) {
            // 成功
            console.log(result.data)
            var dataImgs = new Array() ;
            for(let i=0;i<result.data.length;i++){
            	dataImgs[i]= {
            		image:result.data[i].imagePath
            	}
            }

            // 修改动态值
          uiSlide.option("data",dataImgs)
        }, function(result, status) {
            // 失败 
        });
    }

    pageview.init();

    return pageview;
})