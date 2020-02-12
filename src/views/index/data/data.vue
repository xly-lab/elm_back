<template>
	<div>
		<div class="data_body">
			<router-view></router-view>
			<van-cell-group>
				<van-cell title="用户列表" is-link to="/index/userlist" />
				<van-cell title="商家列表" is-link to="/index/merchantlist" />
				<van-cell title="食品列表" is-link to="/index/foodlist" />
				<van-cell title="订单列表" is-link to="/index/orderlist" />
				<van-cell title="管理员列表" is-link to="/index/administratorlist" />
			</van-cell-group>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style scoped>
.van-cell__title,
.van-cell__value {
	text-align: left;
}
.data_body {
	margin: 50px 0;
}
</style>
