<template>
    <div>
        <router-view/>
        <van-tabbar v-model="active"  active-color="#fff" inactive-color="#000">
            <van-tabbar-item  @click="replaceRouter('/index/fpage')" icon="wap-home">首页</van-tabbar-item>
            <van-tabbar-item  @click="replaceRouter('/index/data')"  icon="cluster">数据管理</van-tabbar-item>
            <van-tabbar-item  @click="replaceRouter('/index/adddata')" icon="add">添加数据</van-tabbar-item>
            <van-tabbar-item  @click="replaceRouter('/index/other')" icon="weapp-nav">其他</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    import axios from 'axios'
    import Cookies from 'js-cookie'
    export default {
        data(){
            return{
                active:0
            }
        },
        mounted(){
            console.log(Cookies.get('_id'),this.active)
        },
        methods:{
            req(){
                console.log('www');
                axios.get('http://www.xly.xyz:3000');
            },
            replaceRouter(P){
                if(this.$route.path!==P){
                    this.$router.replace(P)
                }
            }
        }
    }
</script>

<style scoped>
    .van-tabbar{
        background-image: linear-gradient(to right,#88ed78,#3da9aa);
        color: white;
    }
</style>
