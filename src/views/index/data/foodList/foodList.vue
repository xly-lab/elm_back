<template>
    <div >
        <div class="food_list">
            <van-list v-model="loading"
                      :finished="finished"
                      finished-text="没有更多了"
                      @load="onLoad"
                      error-text="请求失败，点击重新加载">
                <van-collapse v-model="activeNames" accordion v-for="(item,key) in list">
                    <van-collapse-item :name="key"
                                       title="食品名称"
                                       icon="thumb-circle-o">
                        <div slot="title" class="title_header" @click="setFoodInfo(item)">{{item.food_name}}
                            <div class="more" >查看详情</div>
                        </div>
                        <div class="shop_info">
                            <div class="shop_info_list">
                                <van-cell title="商品活动" :value="item.food_active" />
                                <van-cell title="店品详情" :value="item.food_detail" />
                                <van-cell title="商品特点" :value="item.food_characteristics===1?'招牌':'新品'" />
                                <van-cell title="商品规格" :value="item.food_specifications===0?'单规格':'多规格'" />
                                <van-cell title="商品打包费" :value="item.food_packaging_fee" />
                                <van-cell title="商品价格" :value="item.food_price" />
                            </div>
                            <div class="shop_info_handle">
                                <van-button type="info" size="small" plain hairline @click="show=true">编辑</van-button>
                                <van-button v-show="userinfo?userinfo.user_type==2:userInfo.user_type==2" type="danger" plain hairline size="small" @click="deleteFood(item.food_id)">删除</van-button>
                            </div>
                        </div>
                    </van-collapse-item>
                </van-collapse>
                <van-overlay :show="show" @click="show = false">
                    <div class="wrapper" @click="show=false">
                        <div class="block" @click.stop>
                            <h4 class="h4_header">修改该商品信息</h4>
                            <van-cell-group>
                                <van-field
                                        v-model="food_name"
                                        clearable
                                        disabled
                                        label="商品名称"
                                        placeholder="请输入商品名称"
                                />
                                <van-field
                                        v-model="food_active"
                                        label="商品活动"
                                        placeholder="请输入商品活动"
                                        required
                                />
                                <van-field
                                        v-model="food_detail"
                                        label="商品详情"
                                        placeholder="请输入商品详情"
                                        required
                                />
                                <van-field
                                        v-model="characteristics[food_characteristics]"
                                        required
                                        clearable
                                        label="商品特点"
                                        placeholder="请输入商品特点"
                                />
                                <van-field
                                        v-model="food_packaging_fee"
                                        required
                                        clearable
                                        label="商品打包费"
                                        placeholder="请输入商品打包费"
                                />
                                <van-field
                                        v-model="food_price"
                                        required
                                        clearable
                                        label="商品价格"
                                        placeholder="请输入商品价格"
                                />
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
                                    <van-button type="info" plain hairline size="small" @click="changeFood">修改</van-button>
                                    <van-button type="danger" plain hairline size="small" @click="show=false">取消</van-button>
                                </div>
                            </van-cell-group>
                        </div>
                    </div>
                </van-overlay>

            </van-list>
        </div>
    </div>
</template>

<script>
    import {reqFoodList, reqUpdateFood, reqDeleteFood, reqUserInfo} from '../../../../api'
    import {Toast} from 'vant'
    import {mapGetters} from 'vuex'
    import Cookies from 'js-cookie'
    let header =0 ;
    export default {
        data(){
            return{
                food_name:'',
                iconName:'arrow',
                activeNames:[],
                characteristics:['新品','招牌'],
                food_id:'',
                show:false,
                food_active:'',
                food_detail:'',
                food_price:1,
                food_characteristics:'',
                food_packaging_fee:0,
                showClass:false,
                options:[],
                imageUrl: '',
                list: [],
                loading: false,
                finished: false,
                error:false,
                userInfo:{}
            }
        },
        mounted(){
            header=0;
            const user_id = Cookies.get('_id');
            console.log(Cookies.get('_id'));
            reqUserInfo({_id:user_id}).then((res)=>{
                console.log('res',res);
                this.userInfo=res.data
            })
        },
        methods:{
            setFoodInfo(item){
                this.food_id=item.food_id;
                this.food_name=item.food_name;
                this.food_active=item.food_active;
                this.food_detail=item.food_detail;
                this.food_price=item.food_price;
                this.food_packaging_fee=item.food_packaging_fee;
                this.food_characteristics=item.food_characteristics;
            },
            onLoad(){
                const listLen = this.list.length;
                let listEndLen;
                // 异步更新数据
                reqFoodList({header,tail:10}).then((res)=>{
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
            changeFood(){
                if(!this.food_active){
                    return Toast('请输入商品活动');
                }
                if(!this.food_detail){
                    return Toast('请输入商品详情');
                }
                if(!this.food_characteristics){
                    return Toast('请输入商品特点');
                }
                if(!(this.food_characteristics==='招牌'||this.food_characteristics==='新品')){
                    return Toast('请输入招牌或新品');
                }
                if(!this.food_packaging_fee){
                    return Toast('请输入商品打包费');
                }
                if(!this.food_price){
                    return Toast('请输入商品价格');
                }
                const changeFoodInfo = {
                    food_id:this.food_id,
                    food_active:this.food_active,
                    food_characteristics: this.food_characteristics,
                    food_detail: this.food_detail,
                    food_packaging_fee: this.food_packaging_fee,
                    food_price: this.food_price
                };
                console.log(changeFoodInfo);
                reqUpdateFood(changeFoodInfo).then((res)=>{
                    if(res.code===0){
                        this.show=false;
                        this.$router.replace('/index/data');
                        this.$message({
                            message: '更新成功',
                            type: 'success'
                        })
                    }
                });
            },
            deleteFood(food_id){
                this.$confirm('此操作将永久删除该商铺, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    reqDeleteFood({food_id}).then((res)=>{
                        if(res.code===0){
                            this.$router.replace('/index/data');
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            })
                        }else {
                            this.$message({
                                message: res.msg,
                                type: 'warning'
                            })
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
        },
        computed:{
            ...mapGetters(['userinfo'])
        }
    }
</script>

<style scoped>
    .h4_header{
        height: 50px;
        text-align: center;
       line-height: 50px;
    }
    .food_list{
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
    .shop_info_handle{
        display: flex;
        justify-content: space-around;
    }
    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
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

    .list_item_top{
        background-color: #eef1f6;
        border: 1px solid #cdcdcd;
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
    .button_{
        display: flex;
        justify-content: space-around;
        width: 100%;
        height: 44px;
        align-items: center;
    }
</style>
