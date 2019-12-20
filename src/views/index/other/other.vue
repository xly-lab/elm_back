<template>
    <div>
        <div class="other_body">
                <van-cell-group >
                    <van-cell title="用户分布" is-link to="/other/distribution" />
                    <van-cell title="管理员设置" is-link to="/other/admin" />
                    <van-cell title="说明" is-link to="/other/instructions" />
                    <br/>
                    <van-cell title="退出" is-link @click="getOut" />
                </van-cell-group >
        </div>
    </div>
</template>

<script>
    import {Dialog} from 'vant'
    import Cookies from 'js-cookie'
    export default {
        methods:{
            getOut(){
                Dialog.confirm({
                    title: '退出',
                    message: '确认退出帐号'
                }).then(() => {
                    console.log('he');
                    Cookies.set('_id',null);
                    this.$router.replace('/login')
                }).catch(() => {
                    // on cancel
                });
            }
        }
    }
</script>

<style scoped>
    .other_body{
        margin: 50px 0 ;
    }
    .van-cell{
        text-align: left;
    }
</style>
