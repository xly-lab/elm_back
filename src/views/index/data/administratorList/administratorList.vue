<template>
    <div>
        <div class="admin_list">
            <van-list v-model="loading"
                      :finished="finished"
                      finished-text="没有更多了"
                      @load="onLoad"
                      error-text="请求失败，点击重新加载">
                <div class="list_item list_item_top">
                    <div class="left">注册时间</div>
                    <div class="middle">用户名</div>
                    <div class="right">注册地</div>
                    <div class="right">权限</div>
                </div>
                <div class="list_item" v-for="item in list ">
                    <div class="left">{{item.register_time}}</div>
                    <div class="middle">{{item.username}}</div>
                    <div class="right">{{item.province}}</div>
                    <div class="right">{{userType(item.user_type)}}</div>
                </div>
            </van-list>
        </div>
    </div>
</template>

<script>
    import {reqAdminList} from "../../../../api";
    import moment from "moment";
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
                // 异步更新数据
                reqAdminList({header,tail:header=header+10}).then((res)=>{
                    console.log("res",res);
                    for(let i=0;i<res.data.length;i++){
                        console.log(res.data[i].register_time);
                        res.data[i].register_time =new moment(res.data[i].register_time/1).format('YYYY-MM-DD')
                    }
                    this.list.push(...res.data);
                    console.log(this.list);
                    this.loading = false
                }).catch(()=>{
                    this.error = true;
                }).finally(()=>{
                    if(this.list.length%10!==0){
                        this.finished = true;
                    }
                })
            },
            userType(user_type){
                let type = '';
                switch (user_type) {
                    case '1':
                        type= '管理员';
                        break;
                    case '2':
                        type= '超级管理员';
                        break;
                    case '3':
                        type= '普通会员';
                        break;
                }
                return type;
            }
        },
    }
</script>

<style scoped>
    .admin_list{
        margin: 50px 0;
    }
    .list_item{
        height: 50px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-bottom: 1px solid #cdcdcd;
        border-left: 1px solid #cdcdcd;
        border-right: 1px solid #cdcdcd;
        font-size: 14px;
    }
    .list_item_top{
        background-color: #eef1f6;
        border: 1px solid #cdcdcd;
    }
</style>
