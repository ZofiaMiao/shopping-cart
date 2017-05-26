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
    filters:{
    //局部过滤器
        fomartMoney:function (value) {
            return "¥"+value.toFixed(2);
        }
    },
    mounted:function () {
    //挂载到实例上去之后调用该钩子
        this.$nextTick(function () {
            vm.cartView();
        })

    },
    methods:{
    // 方法
        cartView:function () {
            this.$http.get("data/cartData.json").then(res=>{
                //es6箭头函数，作用域指向外层
                this.productList = res.data.result.list;
                this.totalMoney = res.data.result.totalMoney;
            });
        }
    }
})
//全局过滤器
Vue.filter("money",function (value, type) {
    return "¥"+value.toFixed(2)+type;
})