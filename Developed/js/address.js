/**
 * Created by zofia on 2017/6/12.
 */
new Vue({
    el:".container",
    data:{
        addressList:[],
        limitNum:3,//显示多少个地址
        currIndex:0,//当前选中的地址索引
        shippingtype:1//配送方式
    },
    mounted:function(){
        this.$nextTick(function () {
            this.getAddressList();
        })
    },
    computed:{
        filterAddr:function(){
            return this.addressList.slice(0,this.limitNum);
        }
    },
    methods:{
        getAddressList(){
            this.$http.get("data/address.json").then(res=>{
                this.addressList = res.data.result;
                console.log(res);
            })
        },
        setDefault(addressId){
            this.addressList.forEach(item => {
                if(item.addressId == addressId){
                    item.isDefault = true;
                }else{
                    item.isDefault = false;
                }
            })
        },
        delAddr(item){
            var index = this.addressList.indexOf(item);
            this.addressList.splice(index,1);
        }
    }
})