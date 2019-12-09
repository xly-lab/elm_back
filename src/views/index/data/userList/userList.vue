<template>
    <div>
        <div class="user_list">
            <van-list>
                <div class="list_item list_item_top">
                    <div class="left">注册时间</div>
                    <div class="middle">用户名</div>
                    <div class="right">注册地</div>
                </div>
                <div class="list_item">
                    <div class="left">2019/12/9</div>
                    <div class="middle">xly</div>
                    <div class="right">贵阳</div>
                </div>
            </van-list>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style scoped>
    .user_list{
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
