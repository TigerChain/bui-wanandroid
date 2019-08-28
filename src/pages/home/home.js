loader.define(function(require,exports,module){

    var pageview = {};

    bui.ajax({
        url: "api/banner/json",
        data: {},//接口请求的参数
        // 可选参数
        method: "GET"
    }).then(function(result){
        // 成功
        console.log(result)
    },function(result,status){
        // 失败 
    });

    return pageview;
})