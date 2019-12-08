<template>
    <div>
        <div class="merchant-list">

                <van-collapse v-model="activeNames">
                    <van-collapse-item
                        title="店铺名称"
                        icon="shop-o">
                        <div slot="title" class="title_header">标1
                            <div class="more">查看详情</div>
                        </div>
                        <div class="shop_info">
                            <div class="shop_info_list">
                                <van-cell title="店铺地址" value="内容内容内容内容内容内容内容内容内容内容" />
                                <van-cell title="店铺介绍" value="内容" />
                                <van-cell title="店铺ID" value="内容" />
                                <van-cell title="联系电话" value="内容" />
                                <van-cell title="评分" value="内容" />
                                <van-cell title="销量" value="内容" />
                                <van-cell title="分类" value="内容" />
                            </div>
                            <div class="shop_info_handle">
                                <van-button type="info" size="small" @click="show=true">编辑</van-button>
                                <van-button type="info" size="small">添加商品</van-button>
                                <van-button type="danger" size="small">删除</van-button>
                            </div>
                        </div>
                    </van-collapse-item>
                    <van-collapse-item
                            title="标题2"
                            icon="shop-o">
                        <div slot="title" class="title_header">标1
                            <div class="more">查看详情</div>
                        </div>
                        内容
                    </van-collapse-item>
                </van-collapse>
<!--            </van-list>-->
            <van-overlay :show="show" @click="show = false">
                <div class="wrapper" @click="show=false">
                    <div class="block" @click.stop>
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
                            <div class="button_">
                                <van-button type="info" size="small">添加商品</van-button>
                                <van-button type="danger" size="small">删除</van-button>
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
                options:[]
            }
        },
        mounted(){
            this.options=options.options;
        },
        methods:{
            changeIcon(){
                if(this.iconName==="arrow"){
                    this.iconName='arrow-down'
                }else this.iconName='arrow'
            },
            compileInfo(){

            }
        }
    }
</script>

<style scoped>
    .merchant-list{
        margin: 50px 0;
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
        height: 264px;
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
    .button_{
        display: flex;
        justify-content: space-around;
        width: 100%;
        height: 44px;
        align-items: center;
    }
</style>
