<template>
    <div>
        <div class="user_list">
            <van-list v-model="loading"
                      :finished="finished"
                      finished-text="没有更多了"
                      @load="onLoad"
                      error-text="请求失败，点击重新加载">
                <div class="list_item list_item_top">
                    <div class="left">注册时间</div>
                    <div class="middle">用户名</div>
                    <div class="right">注册地</div>
                </div>
                <div class="list_item" v-for="item in list ">
                    <div class="left">{{item.register_time}}</div>
                    <div class="middle">{{item.username.length>6?item.username.substring(0,6)+'...':item.username}}</div>
                    <div class="right">{{item.province}}</div>
                </div>
            </van-list>
        </div>
    </div>
</template>

<script>
    import {reqUserList} from '../../../../api'
    import moment from 'moment'
    let header = 0;
    export default {
        data() {
            return {
                list: [],
                loading: false,
                finished: false,
                error:false
            };
        },
        mounted(){
            header=0
        },
        methods: {
            onLoad() {
                const listLen = this.list.length;
                let listEndLen;
                // 异步更新数据
                reqUserList({header,tail:10}).then((res)=>{
                    console.log("res",res);
                    header+=10;
                    for(let i=0;i<res.data.length;i++){
                        console.log(res.data[i].register_time);
                        res.data[i].register_time =new moment(res.data[i].register_time/1).format('YYYY-MM-DD')
                    }
                    this.list.push(...res.data);
                    listEndLen = this.list.length;
                    console.log(this.list);
                    this.loading = false
                }).catch(()=>{
                    this.error = true;
                }).finally(()=>{
                    if(this.list.length%10!==0||listLen===listEndLen){
                        this.finished = true;
                    }
                })
            },
        },
    }
</script>

<style scoped>
    .user_list{
        margin: 50px 0 0 0;
    }
    .list_item{
        display: flex;
        height: 50px;
        border-bottom: 1px solid #cdcdcd;
        border-left: 1px solid #cdcdcd;
        border-right: 1px solid #cdcdcd;
        font-size: 14px;
    }
    .list_item_top{
        background-color: #eef1f6;
        border: 1px solid #cdcdcd;
    }

    .left{
        width: 100px;
        height: 50px;
        line-height: 50px;
    }
    .middle{
        flex: 1;
        height: 50px;
        line-height: 50px;
    }
    .right{
        width: 100px;
        height: 50px;
        line-height: 50px;
    }

</style>
