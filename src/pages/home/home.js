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
            url: baseUrl +"/banner/json",
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

       // 列表滚动加载 js 初始化: 
       var uiScroll = bui.scroll({
           id: "#home_uiScroll",
           children: "#home-bui-list",
           page:0,
           pageSize:5,
           onRefresh: function () {// 下拉刷新 
               var page = 0;
               var pagesize = 5;
               getData(page,pagesize,"html");
           },
           onLoad: getData // 上拉加载
       })
       
       
       //新增下一页数据
       function getData(page,pagesize,command){
         var command = command || "append";

         bui.ajax({
             url: baseUrl +"/article/list/"+page+"/json",
             data: {},//接口请求的参数
             // 可选参数
             method: "GET"
         }).then(function(result){
             // 成功
             console.log(result.data.datas)

             var mydata = result.data.datas;

             var html ="" ;
             mydata.map(function(el,index){
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
                    </li>
                `
             })

             $("#home-bui-list")[command](html)

               // 更新分页信息,如果高度不足会自动请求下一页
         uiScroll.updateCache(page,result.data.datas);
       
         // 刷新的时候返回位置
         uiScroll.reverse();
         },function(result,status){
             // 失败 
         });
         
       
       
       }
      
       
    }

    pageview.init();

    return pageview;
})