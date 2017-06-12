/**
 * Created by zofia on 2017/6/12.
 */
new Vue({
    el:".container",
    data:{
        addressList:[],
        limitNum:3,
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
        loadMore(){
            this.limitNum = this.addressList.length
        }
    }
})