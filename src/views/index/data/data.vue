<template>
    <div>
        <Header title="数 据"/>
        <van-cell-group >
            <van-cell title="路由跳转" is-link to="index" />
            <van-cell title="路由跳转" is-link to="index" />
            <van-cell title="路由跳转" is-link to="index" />
        </van-cell-group >
    </div>
</template>

<script>
    import Header from "../../../components/header/header";
    export default {
        components:{
            Header
        }
    }
</script>

<style scoped>
    .van-cell__title, .van-cell__value{
        text-align: left;
    }
</style>
