<template>
    <div>
        <div class="other_body">
                <van-cell-group >
                    <van-cell title="用户分布" is-link to="/other/distribution" />
                    <van-cell title="管理员设置" is-link to="/other/admin" />
                    <van-cell title="说明" is-link to="/other/instructions" />
                </van-cell-group >
        </div>
    </div>
</template>

<script>

    export default {

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
