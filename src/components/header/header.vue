<template>
    <div>
        <van-nav-bar :title="title" :left-text="left_text" :left-arrow="left_arrow" @click-left="$router.back()">
<!--            <van-icon name="arrow-left" slot="left" />-->
        </van-nav-bar>
    </div>
</template>

<script>
    export default {
        props:{
            title:String,
            left_text:String,
            left_arrow:Boolean
        },
        methods:{
            cads(){
                console.log('s')
            }
        }
    }
</script>

<style scoped>
    .van-nav-bar{
    background-image: linear-gradient(to right,#88ed78,#3da9aa,#ecf5ff);
}
</style>
