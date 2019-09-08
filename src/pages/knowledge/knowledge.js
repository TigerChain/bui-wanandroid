loader.define(function(require, exports, module) {

    var pageview = {};

    pageview.init = function() {
        // 初始化数据行为存储
        var bs = bui.store({
            scope: "page",
            data: {
                datas: []
            },
            methods: {
                showDetail: function(index, e) {
                    console.log(index)
                    bui.load({
                        url:"pages/knowledge/knowledge_detail_tab.html",
                        param:{
                            "data": JSON.stringify(this.datas[index])
                        } 
                    });
                    return false;
                }
            },
            watch: {},
            computed: {},
            templates: {},
            beforeMount: function() {
                // 数据解析前执行, 修改data的数据示例
                // this.$data.a = 2
            },
            mounted: function() {
                // 数据解析后执行
                // // 列表控件 js 初始化: 
                var that = this ;
                var uiList = bui.list({
                    id: "#knowledge-uiList",
                    url: baseUrl + "/tree/json",
                    pageSize: 5,
                    data: {},
                    //如果分页的字段名不一样,通过field重新定义
                    field: {
                        page: "page",
                        size: "pageSize",
                        data: "data"
                    },
                    callback: function(e) {},
                    template: function(data) {
                        // console.log(data)
                        // bs.datas = data ;
                        that.datas = data ;
                        var html = "";
                        data.map(function(el, index) {
                            html += `

                    <li class="bui-btn-title">${el.name}</li>

                    <li id="knowledge-item" b-click="page.showDetail(${index})" style="display:flex;align-items:center;padding:10px;
                    justify-content:space-between;">
                        <ul style="display:flex;flex-wrap:wrap">
                            ${el.children.map((child,childIndex) =>

                                `${childIndex<6?`<li style="padding:5px;">
                                        <div  style="padding:5px;border:1px solid red;background:#eee;">
                                            ${child.name}
                                        </div>
                                    </li>`:""}`
                                ).join('')}
                        </ul>
                        <i class="icon-listright"></i>
                    </li>
                    `
                        });
                        return html;
                    },
                    autoScroll: false
                });
            }
        })
        //  实现点击方式三
        // router.$("ul").on("click","#knowledge-item",function(e){
        //     var index = ($(this).index() -1)/2 ;
        //     console.log(index)
        //     return false ;
        // })
        // 
        //   实现点击方式一
        //   <script>
        //     function showDetail(index) {
        //         console.log(index)
        //    }
        // </script>
        //  实现点击方式二
        // window.showDetail = function(index) {
        //     console.log(index)
        // }
    }

    pageview.init();
    
    return pageview;
})