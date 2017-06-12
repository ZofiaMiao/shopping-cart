/**
 * Created by zofia on 17/5/23.
 */
var vm = new Vue({
    el:"#app",
    data:{
    //数据
        productList:[],//产品列表
        totalMoney:0,//总价
        checkAllFlag:false,//全选标识
        delFlag:false,//删除标识
        currProduct:""//当前产品
    },
    filters:{
    //局部过滤器
        fomartMoney:function (value,type) {
            return "¥"+value.toFixed(2) + type;
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
        cartView() {
            this.$http.get("data/cartData.json").then(res=>{
                //es6箭头函数，作用域指向外层
                this.productList = res.data.result.list;
                // this.totalMoney = res.data.result.totalMoney;
            });
        },
        changeMoney(product, flag) {
            if(flag >0){
                product.productQuantity ++;
            }else{
                product.productQuantity --;
                if(product.productQuantity < 1){
                    product.productQuantity = 1;
                }
            }
            this.calculateTotalMoney();
        },
        selectProduct(item) {
            if(typeof item.checked == "undefined"){
                this.$set(item,"checked",true);
            }else{
                item.checked = !item.checked;
            }
            // this.calculateTotalMoney();
        },
        //全选
        checkAll(flag) {
            this.checkAllFlag = flag;
            this.productList.forEach((item, index) =>{
                if(typeof item.check === "undefined"){
                    this.$set(item,"checked",flag);
                }else{
                    this.checked = flag;
                }
            })
            this.calculateTotalMoney();
        },
        calculateTotalMoney(){
            //计算总价
            this.totalMoney = 0;
            this.productList.forEach((item,index) =>{
                if(item.checked){
                    this.totalMoney += item.productPrice*item.productQuantity;
                }
            });
        },
        delPop(item){
            //删除产品的标识
            this.delFlag = true;
            this.currProduct = item;
        },
        delProduct(){
        //    删除产品
            this.delFlag = false;
            var index = this.productList.indexOf(this.currProduct);
            this.productList.splice(index,1);
            this.calculateTotalMoney();
        }

    }
})
//全局过滤器
Vue.filter("money",function (value, type) {
    return "¥"+value.toFixed(2)+type;
})