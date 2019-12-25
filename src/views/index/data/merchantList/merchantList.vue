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
                        <div slot="title" class="title_header" @click="setShopInfo(item)">{{item.shop_name}}
                            <div class="more" >查看详情</div>
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
                                <van-button  v-show="userinfo.user_type===3" type="danger" plain hairline size="small" @click="deleteShop(item.shop_id)">删除</van-button>
                            </div>
                        </div>
                    </van-collapse-item>
                </van-collapse>
                <van-overlay :show="show" @click="show = false">
                    <div class="wrapper" @click="show=false">
                        <div class="block" @click.stop>
                            <h4 class="h4_header">修改店铺信息</h4>
                            <van-cell-group>
                                <van-field
                                        v-model="shop_name"
                                        clearable
                                        disabled
                                        label="店铺名称"
                                        placeholder="请输入店铺名称"
                                />
                                <van-field
                                        v-model="shop_address"
                                        label="详细地址"
                                        placeholder="请输入详细地址"
                                        required
                                />
                                <van-field
                                        v-model="shop_detail"
                                        required
                                        clearable
                                        label="店铺介绍"
                                        placeholder="请输入店铺介绍"
                                />
                                <van-field
                                        v-model="shop_phone"
                                        required
                                        clearable
                                        label="联系电话"
                                        placeholder="请输入联系电话"
                                />
                                <div class="el_cascader">
                                    <div>店铺分类</div>
                                    <el-cascader :options="options" v-model="shop_type" clearable/>
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
                                    <van-button type="info" plain hairline size="small" @click="changeShop">修改</van-button>
                                    <van-button type="danger" plain hairline size="small" @click="show=false">取消</van-button>
                                </div>
                            </van-cell-group>

                        </div>
                    </div>

                </van-overlay>

            </van-list>

<!--            </van-list>-->

        </div>
    </div>
</template>

<script>
    import options from '../../../../assets/data'
    import { reqShopList,reqUpdateShop,reqDeleteShop } from '../../../../api'
    import {Toast} from 'vant'
    import {mapGetters} from 'vuex'
    let header = 0;
    export default {
        data(){
            return{
                iconName:'arrow',
                activeNames:[],
                show:false,
                shop_name:'',
                shop_address:'',
                shop_phone:'',
                shop_detail:'',
                showClass:false,
                options:[],
                imageUrl: '',
                list: [],
                loading: false,
                finished: false,
                error:false,
                shop_type:'',
                shop_id:'',
            }
        },
        mounted(){
            this.options=options.options;
            header=0
        },
        methods:{
            setShopInfo(item){
                this.shop_id=item.shop_id;
                this.shop_name=item.shop_name;
                this.shop_address=item.shop_address;
                this.shop_detail=item.shop_detail;
                this.shop_phone=item.shop_phone;
                this.shop_type=item.shop_type.split('-');
            },
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
                const listLen = this.list.length;
                let listEndLen;
                // 异步更新数据
                reqShopList({header,tail:10}).then((res)=>{
                    header+=10;
                    console.log("res",res);
                    this.list.push(...res.data);
                    listEndLen = this.list.length;
                    console.log(this.list);
                    this.loading = false
                }).catch(()=>{
                    this.error = true;
                }).finally(()=>{
                    if(this.list.length%10!==0||listLen===listEndLen){
                        this.finished = true;
                    }
                })

            },
            changeShop(){
                if(!this.shop_address){
                    return Toast('请输入商铺地址')
                }
                if(!this.shop_detail){
                    return Toast('请输入商铺介绍')
                }
                if(!this.shop_phone){
                    return Toast('请输入商铺手机')
                }
                if(!/^1[3456789]\d{9}$/.test(this.shop_phone)){
                    return Toast('请输入正确的号码');
                }
                if(!this.shop_type){
                    return Toast('请输入商铺类型')
                }
                const changeShopInfo = {
                    shop_id:this.shop_id,
                    shop_address:this.shop_address,
                    shop_detail:this.shop_detail,
                    shop_phone:this.shop_phone,
                    shop_type:this.shop_type.join('-')
                };
                reqUpdateShop(changeShopInfo).then((res)=>{
                    if(res.code===0){
                        this.show=false;
                        this.$router.replace('/index/data');
                        this.$message({
                            message: '更新成功',
                            type: 'success'
                        })
                    }
                })
            },
            deleteShop(shop_id){
                this.$confirm('此操作将永久删除该商铺, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    reqDeleteShop({shop_id}).then((res)=>{
                        if(res.code===0){
                            this.$router.replace('/index/data');
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            })
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            }
        },
        computed:{
            ...mapGetters(['userinfo'])
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
    .h4_header{
        height: 50px;
        text-align: center;
        line-height: 50px;
    }
    .block {
        width: 80%;
        background-color: #fff;
        border-radius: 10px;
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
