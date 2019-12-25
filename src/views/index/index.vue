<template>
    <div>
        <Header :title="HeaderConfig($route.path).title"
                :left_text="HeaderConfig($route.path).left_text"
                :left_arrow="HeaderConfig($route.path).left_arrow"
        />

            <router-view/>

        <van-tabbar v-model="active"  active-color="#fff" inactive-color="#000" v-if="$route.meta.showFooter" >
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
    import Header from "../../components/header/header";
    import  {headerConfig}  from '../../utils/headerConfig'
    export default {
        data(){
            return{
                active:0
            }
        },
        components:{
            Header
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
            },
            HeaderConfig(path){
                return headerConfig(path)
            }
        },
    }
</script>

<style scoped>
    .van-tabbar{
        background-image: linear-gradient(to right,#88ed78,#3da9aa);
        color: white;
    }
    >>>.van-nav-bar{
        position: fixed;
        width: 100%;
        top:0;
        color: white;
    }
    >>>.van-nav-bar__text{
        color: white;
    }
    >>>.van-nav-bar .van-icon{
        color: white;
    }
</style>
