/**
 * Created by zofia on 17/5/23.
 */
var vm = new Vue({
    el:"#app",
    data:{
    //数据
        productList:[],
        totalMoney:0
    },
    fiters:{
    //过滤器

    },
    mounted:function () {
    //挂载到实例上去之后调用该钩子
        this.cartView();
    },
    methods:{
    // 方法
        cartView:function () {
            var _this = this;
            this.$http.get("data/cartData.json").then(function (res) {
                _this.productList = res.data.result.list;
                _this.totalMoney = res.data.result.totalMoney;
                console.log(_this.productList);
                console.log(_this.totalMoney);
            });
        }
    }
})