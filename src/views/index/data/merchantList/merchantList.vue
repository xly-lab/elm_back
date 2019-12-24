<template>
    <div>
        <div class="merchant-list">
            <van-list v-model="loading"
                      :finished="finished"
                      finished-text="没有更多了"
                      @load="onLoad"
                      error-text="请求失败，点击重新加载">
                <van-collapse v-model="activeNames" accordion v-for="(item,key) in list">
                    <van-collapse-item :name="key"
                                       title="店铺名称"
                            icon="shop-o">
                        <div slot="title" class="title_header" >{{item.shop_name}}
                            <div class="more">查看详情</div>
                        </div>
                        <div class="shop_info">
                            <div class="shop_info_list">
                                <van-cell title="店铺地址" :value="item.shop_address" />
                                <van-cell title="店铺介绍" :value="item.shop_detail" />
                                <van-cell title="店铺ID" :value="item.shop_id" />
                                <van-cell title="联系电话" :value="item.shop_phone" />
                                <van-cell title="评分" value="5" />
                                <van-cell title="销量" :value="100" />
                                <van-cell title="分类" :value="item.shop_type" />
                            </div>
                            <div class="shop_info_handle">
                                <van-button type="info" size="small" plain hairline @click="show=true">编辑</van-button>
                                <van-button type="info" size="small" plain hairline @click="addFood(item.shop_id)">添加商品</van-button>
                                <van-button type="danger" plain hairline size="small">删除</van-button>
                            </div>
                        </div>
                    </van-collapse-item>
                </van-collapse>
            </van-list>

<!--            </van-list>-->
            <van-overlay :show="show" @click="show = false">
                <div class="wrapper" @click="show=false">
                    <div class="block" @click.stop>
                        <h4>修改店铺信息</h4>
                        <van-cell-group>
                            <van-field
                                    v-model="shopName"
                                    clearable
                                    label="店铺名称"
                                    placeholder="请输入店铺名称"
                            />

                            <van-field
                                    v-model="shopAddress"
                                    label="详细地址"
                                    placeholder="请输入详细地址"
                                    required
                            />
                            <van-field
                                    v-model="shopMsg"
                                    required
                                    clearable
                                    label="店铺介绍"
                                    placeholder="请输入店铺介绍"
                            />
                            <van-field
                                    v-model="shopPhone"
                                    required
                                    clearable
                                    label="联系电话"
                                    placeholder="请输入联系电话"
                            />
                            <div class="el_cascader">
                                <div>店铺分类</div>
                                <el-cascader :options="options" clearable/>
                            </div>
                            <div class="avatar_header">
                                <div>店铺头像</div>
                                <el-upload
                                        class="avatar-uploader"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :show-file-list="false"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </div>
                            <div class="button_">
                                <van-button type="info" plain hairline size="small">修改</van-button>
                                <van-button type="danger" plain hairline size="small">取消</van-button>
                            </div>
                        </van-cell-group>

                    </div>
                </div>

            </van-overlay>
        </div>
    </div>
</template>

<script>
    import options from '../../../../assets/data'
    import { reqShopList } from '../../../../api'
    let header = 0;
    export default {
        data(){
            return{
                iconName:'arrow',
                activeNames:[],
                show:false,
                shopName:'',
                shopAddress:'',
                shopPhone:'',
                shopMsg:'',
                showClass:false,
                options:[],
                imageUrl: '',
                list: [],
                loading: false,
                finished: false,
                error:false
            }
        },
        mounted(){
            this.options=options.options;
            header=0
        },
        methods:{
            changeIcon(){
                if(this.iconName==="arrow"){
                    this.iconName='arrow-down'
                }else this.iconName='arrow'
            },
            compileInfo(){

            },
            addFood(e){
                this.$router.replace({
                    name:'addData_addFood',
                    params:{
                        shop_id:e
                    }
                })
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            onLoad() {
                // 异步更新数据
                reqShopList({header,tail:10}).then((res)=>{
                    header+=10;
                    console.log("res",res);
                    this.list.push(...res.data);
                    console.log(this.list);
                    this.loading = false
                }).catch(()=>{
                    this.error = true;
                }).finally(()=>{
                    if(this.list.length%10!==0){
                        this.finished = true;
                    }
                })

            },
        }
    }
</script>

<style scoped>
    .merchant-list{
        margin: 50px 0 0 0;
    }

    .title_header{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .more{
        color: #98a1ab;
    }
    .shop_info_handle{
        display: flex;
        justify-content: space-around;
    }
    .van-cell__title, .van-cell__value{
        text-align: left;
    }
    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .block {
        width: 80%;
        height: 60%;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;
    }
    .el_cascader{
        display: flex;
        justify-content: space-around;
        font-size: 14px;
        align-items: center;
        height: 40px;
        padding: 2px;
    }
    .avatar_header{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
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
    >>>.el-upload{
        width: 217px;

    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
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
    .button_{
        display: flex;
        justify-content: space-around;
        width: 100%;
        height: 44px;
        align-items: center;
    }
</style>
