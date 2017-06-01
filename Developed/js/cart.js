/**
 * Created by zofia on 17/5/23.
 */
var vm = new Vue({
    el:"#app",
    data:{
    //数据
        productList:[],
        totalMoney:0,
        checkAllFlag:false
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
        },
        changeMoney:function (product, flag) {
            if(flag >0){
                product.productQuantity ++;
            }else{
                product.productQuantity --;
                if(product.productQuantity < 1){
                    product.productQuantity = 1;
                }
            }
        },
        selectProduct:function (item) {
            if(typeof item.checked == "undefined"){
                this.$set(item,"checked",true);
            }else{
                item.checked = !item.checked;
            }
        },
        //全选
        checkAll:function (flag) {
            this.checkAllFlag = flag;
            this.productList.forEach((item, index) =>{
                if(typeof item.check === "undefined"){
                    this.$set(item,"checked",flag);
                }else{
                    this.checked = flag;
                }
            })
        }
    }
})
//全局过滤器
Vue.filter("money",function (value, type) {
    return "¥"+value.toFixed(2)+type;
})