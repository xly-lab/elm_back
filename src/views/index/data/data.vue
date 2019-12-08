<template>
    <div>
      <div class="data_body">
          <van-cell-group >
              <van-cell title="用户列表" is-link to="index" />
              <van-cell title="商家列表" is-link to="index" />
              <van-cell title="食品列表" is-link to="index" />
              <van-cell title="订单列表" is-link to="index" />
              <van-cell title="管理员列表" is-link to="index" />
          </van-cell-group >
      </div>
    </div>
</template>

<script>

    export default {

    }
</script>

<style scoped>
    .van-cell__title, .van-cell__value{
        text-align: left;
    }
    .data_body{
        margin: 50px 0;
    }
</style>
