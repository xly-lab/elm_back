<template>
	<div>
		<div class="add_merchant" v-if="show_add_merchant">
			<el-form ref="form" :model="shop" label-width="80px">
				<el-form-item label="店铺名称">
					<el-input v-model="shop.name" placeholder="请输入商铺名称"></el-input>
				</el-form-item>
				<el-form-item label="详细地址">
					<el-input v-model="shop.detailAddress" placeholder="请输入详细地址"></el-input>
				</el-form-item>
				<el-form-item label="联系电话">
					<el-input v-model="shop.phone" placeholder="请输入联系电话"></el-input>
				</el-form-item>
				<el-form-item label="店铺介绍">
					<el-input v-model="shop.introduce" placeholder="请输入店铺介绍"></el-input>
				</el-form-item>
				<el-form-item label="店铺标语">
					<el-input v-model="shop.tag" placeholder="请输入店铺标语"></el-input>
				</el-form-item>
				<el-form-item label="店铺分类">
					<el-cascader :options="options" v-model="shop.types" clearable />
				</el-form-item>
				<el-form-item label="店铺特点">
					<el-checkbox-group v-model="shop.characteristics">
						<el-checkbox label="品牌保证" name="type"></el-checkbox>
						<el-checkbox label="准时达" name="type"></el-checkbox>
						<el-checkbox label="新开店铺" name="type"></el-checkbox>
						<el-checkbox label="外卖保" name="type"></el-checkbox>
						<el-checkbox label="蜂鸟专送" name="type"></el-checkbox>
						<el-checkbox label="开发票" name="type"></el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="配送费" prop="float_delivery_fee">
					<el-input-number v-model="shop.float_delivery_fee" :min="0" :max="20"></el-input-number>
				</el-form-item>
				<el-form-item label="起送价" prop="float_delivery_fee">
					<el-input-number v-model="shop.float_minimum_order_amount" :min="0" :max="20"></el-input-number>
				</el-form-item>
				<el-form-item label="营业时间">
					<el-col :span="11">
						<el-date-picker type="date" placeholder="选择日期" v-model="shop.date1" style="width: 100%;"></el-date-picker>
					</el-col>
					<el-col class="line" :span="2">-</el-col>
					<el-col :span="11">
						<el-time-picker placeholder="选择时间" v-model="shop.date2" style="width: 100%;"></el-time-picker>
					</el-col>
				</el-form-item>
				<div class="avatar_header">
					<div>上传店铺头像</div>
					<el-upload
						class="avatar-uploader"
						action="http://localhost:3000/elm_back/photos"
						:show-file-list="true"
						list-type="picture-card"
						:on-success="handleAvatarSuccess"
						:before-upload="beforeAvatarUpload"
						:on-progress="testL"
					>
						<img v-if="imageUrlAvatar" :src="imageUrlAvatar" class="avatar" />
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</div>
				<div class="avatar_header">
					<div>上传营业执照</div>
					<el-upload
						class="avatar-uploader"
						action="http://localhost:3000/elm_back/photos"
						list-type="picture-card"
						:on-success="handleLicenseSuccess"
						:before-upload="beforeLicenseUpload"
					>
						<img v-if="imageUrlLicense" :src="imageUrlLicense" class="avatar" />
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</div>
				<div class="avatar_header">
					<div>上传餐饮许可证</div>
					<el-upload
						class="avatar-uploader"
						action="http://localhost:3000/elm_back/photos"
						list-type="picture-card"
						:on-success="handlePermissionSuccess"
					>
						<img v-if="imageUrlPermission" :src="imageUrlPermission" class="avatar" />
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</div>
				<el-form-item label="优惠活动">
					<el-cascader :options="activities" v-model="action" clearable />
				</el-form-item>
				<el-table v-show="tableData.length>0" :data="tableData" style="width: 100%">
					<el-table-column label="活动标题" width="180">
						<template slot-scope="scope">
							<span style="margin-left: 10px">{{ scope.row.activeTag }}</span>
						</template>
					</el-table-column>
					<el-table-column label="活动名称" width="180">
						<template slot-scope="scope">
							<el-popover trigger="hover" placement="top">
								<p>活动标题: {{ scope.row.activeName }}</p>
								<div slot="reference" class="name-wrapper">
									<el-tag size="medium">{{ scope.row.activeName }}</el-tag>
								</div>
							</el-popover>
						</template>
					</el-table-column>
					<el-table-column label="活动内容" width="300">
						<template slot-scope="scope">
							<el-popover trigger="hover" placement="top">
								<p>住址: {{ scope.row.activeText }}</p>
								<div slot="reference" class="name-wrapper">
									<el-tag
										size="medium"
									>{{ scope.row.activeText.length>20? scope.row.activeText.substring(0,20)+'...':scope.row.activeText}}</el-tag>
								</div>
							</el-popover>
						</template>
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">立即创建</el-button>
					<el-button @click="$router.back()">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="add_merchant_success" v-else>
			<van-icon name="passed" color="rgb(61, 210, 121)" size="100" />
			<p>添加成功</p>
		</div>
	</div>
</template>

<script>
import options from "../../../../assets/data";
import { Toast } from "vant";
import { mapGetters } from "vuex";
import { reqSaveShop } from "../../../../api";
import Cookies from "js-cookie";
export default {
	data() {
		return {
			show_add_merchant: true,
			shop: {
				float_delivery_fee: "", //配送费
				float_minimum_order_amount: "", //起送价
				name: "", //商铺名
				types: "", //店铺分类
				detailAddress: "", //详细地址
				phone: "", //手机号
				date1: "", //运营早时间
				date2: "", //运营晚时间
				introduce: "", //店铺介绍
				characteristics: [], //商铺特点
				tag: "", //商铺标语
				avatar:'',//商铺头像
				license:'',//商铺营业执照
				permission:'',//商铺餐饮许可证
			},
			options: [],
			action: "", //活动
			imageUrlAvatar: "", //头像图片地址
			imageUrlLicense: "", //执照图片地址
			imageUrlPermission: "", //许可图片地址
			activeText: "", //活动内容
			activities: [],
			tableData: []
		};
	},
	mounted() {
		this.options = options.options;
		this.activities = options.activities;
		console.log(this.userinfo);
	},
	computed: {
		...mapGetters(["userinfo"])
	},
	methods: {
		testL(res, file, fileList) {
			console.log("res：", res);
			console.log("file：", file);
			console.log("fileList：", fileList);
		},
		onSubmit() {
			const user_id = Cookies.get("_id");
			if (!this.shop.name) {
				return Toast("请输入商铺名称");
			}
			if (
				!/^[\u4e00-\u9fa5a-zA-Z]{2,12}$/.test(
					this.shop.name
				)
			) {
				return Toast("商铺名称仅支持中英文字符");
			}
			if (!this.shop.detailAddress) {
				return Toast("请输入详细地址");
			}
			if (
				!/^[\u4e00-\u9fa50-9a-zA-Z-,，.。 ]{0,40}$/.test(
					this.shop.detailAddress
				)
			) {
				return Toast(
					"详细地址仅支持中英文字符，数字，部分符号，且40个字符内"
				);
			}
			if (!this.shop.phone) {
				return Toast("请输入联系电话");
			}
			if (!/^1[3456789]\d{9}$/.test(this.shop.phone)) {
				return Toast("请输入正确的联系电话");
			}
			if (!this.shop.introduce) {
				return Toast("请输入店铺介绍");
			}
			if (
				!/^[\u4e00-\u9fa50-9a-zA-Z-,，.。 ]{0,40}$/.test(
					this.shop.introduce
				)
			) {
				return Toast(
					"店铺介绍仅支持中英文字符，数字，部分符号，且40个字符内"
				);
			}
			if (!this.shop.tag) {
				return Toast("请输入店铺标语");
			}
			if (
				!/^[\u4e00-\u9fa50-9a-zA-Z-,，.。 ]{0,10}$/.test(
					this.shop.tag
				)
			) {
				return Toast(
					"店铺标语仅支持中英文字符，数字，部分符号，且10个字符内"
				);
			}
			if (!this.shop.types) {
				return Toast("请选择店铺分类");
			}
			if (!this.shop.date1 || !this.shop.date2) {
				return Toast("请选择营业时间段");
			}
			const shopData = {
				shop_name: this.shop.name,
				shop_address: this.shop.detailAddress,
				shop_phone: this.shop.phone,
				shop_detail: this.shop.introduce,
				shop_tag: this.shop.tag,
				shop_type: this.shop.types.join("-"),
				shop_characteristics: this.shop.characteristics.join(
					"-"
				),
				shop_float_delivery_fee: this.shop
					.float_delivery_fee,
				shop_float_minimum_order_amount: this.shop
					.float_minimum_order_amount,
				shop_date1: this.shop.date1,
				shop_date2: this.shop.date2,
				shop_user_id: this.userinfo
					? this.userinfo._id
					: user_id,
				tableData: this.tableData,
				shop_avatar:this.shop.avatar,
				shop_license:this.shop.license,
				shop_permission:this.shop.permission
			};
			console.log(shopData);
			reqSaveShop(shopData).then(res => {
				this.show_add_merchant = false;
			});
			console.log("submit!");
		},
		handleAvatarSuccess(response, file, fileList) {
			
			this.shop.avatar = response.filename
		},
		handleLicenseSuccess(response, file, fileList) {
			this.shop.license = response.filename
		},
		handlePermissionSuccess(response, file, fileList) {
			this.shop.permission = response.filename
		},
		beforeAvatarUpload(file) {
			console.log(file);
			const isJPG = file.type === "image/jpeg";
			const isLt2M = file.size / 1024 / 1024 < 2;

			if (!isJPG) {
				this.$message.error(
					"上传头像图片只能是 JPG 格式!"
				);
			}
			if (!isLt2M) {
				this.$message.error(
					"上传头像图片大小不能超过 2MB!"
				);
			}
			return isJPG && isLt2M;
		},
		beforeLicenseUpload(file) {
			const isJPG = file.type === "image/jpeg";
			const isLt2M = file.size / 1024 / 1024 < 2;

			if (!isJPG) {
				this.$message.error(
					"上传头像图片只能是 JPG 格式!"
				);
			}
			if (!isLt2M) {
				this.$message.error(
					"上传头像图片大小不能超过 2MB!"
				);
			}
			return isJPG && isLt2M;
		},
		beforePermissionUpload(file) {
			const isJPG = file.type === "image/jpeg";
			const isLt2M = file.size / 1024 / 1024 < 2;

			if (!isJPG) {
				this.$message.error(
					"上传头像图片只能是 JPG 格式!"
				);
			}
			if (!isLt2M) {
				this.$message.error(
					"上传头像图片大小不能超过 2MB!"
				);
			}
			return isJPG && isLt2M;
		},
		handleEdit(index, row) {
			console.log(index, row);
		},
		handleDelete(index, row) {
			this.tableData.splice(index, 1);
		}
	},
	watch: {
		action(n, o) {
			switch (n[0]) {
				case "满减优惠":
					this.$prompt("请输入活动内容", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消"
					})
						.then(({ value }) => {
							this.tableData.unshift({
								activeName:
									"满减优惠",
								activeTag: "满",
								activeText: value
							});
						})
						.catch(() => {});
					break;
				case "优惠大酬宾":
					this.$prompt("请输入活动内容", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消"
					})
						.then(({ value }) => {
							this.tableData.unshift({
								activeName:
									"优惠大酬宾",
								activeTag:
									"优惠",
								activeText: value
							});
						})
						.catch(() => {});
					break;
				case "新用户立减":
					this.$prompt("请输入活动内容", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消"
					})
						.then(({ value }) => {
							this.tableData.unshift({
								activeName:
									"新用户立减",
								activeTag: "新",
								activeText: value
							});
						})
						.catch(() => {});
					break;
				case "进店领卷":
					this.$prompt("请输入活动内容", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消"
					})
						.then(({ value }) => {
							this.tableData.unshift({
								activeName:
									"进店领卷",
								activeTag: "领",
								activeText: value
							});
						})
						.catch(() => {});
					break;
			}
		}
	}
};
</script>

<style scoped>
.add_merchant {
	margin: 55px 15px 10px 15px;
	box-shadow: 0px 0px 20px silver;
	padding: 5px;
	text-align: left;
}
.el-checkbox-group {
	display: flex;
	flex-wrap: wrap;
}
.add_merchant_success {
	margin: 50% auto;
}
.avatar_header {
	display: flex;
	flex-direction: row;
	justify-content: start;
	align-items: center;
	font-size: 14px;
	padding: 2px;
}

.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}
>>> .el-upload {
	width: 217px;
}
.avatar-uploader .el-upload:hover {
	border-color: #409eff;
}
.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 217px;
	height: 100px;
	line-height: 100px;
	text-align: center;
}
.avatar {
	width: 100px;
	height: 100px;
	display: block;
}
.el-table--fit {
	margin-bottom: 10px;
}
.el-form-item__content {
	margin-left: 0 !important;
}
</style>
<style>
>>> .el-message-box {
	width: 90% !important;
}
</style>
