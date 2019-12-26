<template>
    <div>
        <div class="add_food" v-if="show_add_food">
            <el-form ref="form" :model="food" label-width="80px" enctype="multipart/form-data">
                <el-form-item label="食物名称">
                    <el-input v-model="food.name"/>
                </el-form-item>
                <el-form-item label="食品活动">
                    <el-input v-model="food.activities"/>
                </el-form-item>
                <el-form-item label="食品详情">
                    <el-input v-model="food.detail"/>
                </el-form-item>
                <div class="avatar_header">
                    <div class="avatar_text">上传店铺头像</div>
                    <el-upload
                            action="http://localhost:3000/elm_back/photos"
                            list-type="picture-card"
                            :before-upload="upImg"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
                <el-form-item label="食物特点">
                    <el-radio-group v-model="food.characteristics">
                        <el-radio :label="0">新品</el-radio>
                        <el-radio :label="1">招牌</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="食品规格">
                    <el-radio-group v-model="food.specifications">
                        <el-radio :label="0">单规格</el-radio>
                        <el-radio :label="1">多规格</el-radio>
                    </el-radio-group>
                </el-form-item>
                <div class="single_specifications" v-show="food.specifications===0">
                    <el-form-item label="打包费" prop="packaging_fee">
                        <el-input-number v-model="food.packaging_fee" :min="0" :max="20"></el-input-number>
                    </el-form-item>
                    <el-form-item label="价格" prop="prise">
                        <el-input-number v-model="food.price" :min="0" :max="50"></el-input-number>
                    </el-form-item>
                </div>
                <div class="more_specifications" v-show="food.specifications===1">
                    <el-button type="primary" @click="addSpecifications">添加规格</el-button>
                    <el-table v-show="tableData.length>0"
                              :data="tableData"
                              style="width: 100%">
                        <el-table-column
                                label="规格名称"
                                width="180">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.specsName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="包装费"
                                width="180">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    <p>包装费: {{ scope.row.packing_fee }}</p>
                                    <div slot="reference" class="name-wrapper">
                                        <el-tag size="medium">{{ scope.row.packing_fee }}</el-tag>
                                    </div>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="价格"
                                width="300">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    <p>价格: {{ scope.row.price }}</p>
                                    <div slot="reference" class="name-wrapper">
                                        <el-tag size="medium">{{ scope.row.price}}</el-tag>
                                    </div>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                </div>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button @click="$router.back()">取消</el-button>
                </el-form-item>
                <el-dialog title="添加规格" :visible.sync="dialogFormVisible">
                    <el-form :model="specsForm">
                        <el-form-item label="规格名称" label-width="120px">
                            <el-input v-model="specsForm.specsName" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="包装费" label-width="120px">
                            <el-input-number v-model="specsForm.packing_fee" :min="0" :max="100"></el-input-number>
                        </el-form-item>
                        <el-form-item label="价格" label-width="120px">
                            <el-input-number v-model="specsForm.price" :min="0" :max="100"></el-input-number>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addSpecs">确 定</el-button>
                    </div>
                </el-dialog>
            </el-form>
        </div>
        <div class="add_food_success" v-else>
            <van-icon name="passed"
                      color="rgb(61, 210, 121)"
                      size="100"/>
            <p>添加成功</p>
        </div>
    </div>
</template>

<script>
    import {Toast,Dialog} from 'vant'
    import {reqSaveFood} from '../../../../api'
    export default {
        data(){
            return{
                show_add_food:true,
                shop_id:'',
                food: {
                    packaging_fee:'',//包装费
                    price:'',//价格
                    name: '',//食品名
                    activities:'',//食品活动
                    detail:'',//食品详情
                    types:'',//店铺分类
                    introduce:'',//食品介绍
                    characteristics:1,//食物特点
                    specifications:0//食品规格
                },
                dialogImageUrl: '',
                dialogVisible: false,
                tableData:[],
                dialogFormVisible:false,
                specsForm:{
                    specsName:'',
                    packing_fee:'',
                    price:''
                },
                uploadData:{
                    articleId:'',
                    url:''
                }
            }
        },
        mounted(){
                this.$nextTick(()=>{
                    console.log(this.$route.params);
                    if( Object.keys(this.$route.params).length===0){
                        Dialog.confirm({
                            title: '注意',
                            message: '你没有选择商铺，不能成功添加食物，请到商铺列表选择商铺添加'
                        }).then(() => {
                            // on confirm
                            return this.$router.replace('/index/merchantlist');
                        }).catch(() => {
                            // on cancel
                            return this.$router.back()
                        });
                    }else {
                        this.shop_id=this.$route.params.shop_id
                    }
                })
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            upImg(file){
                console.log(file);
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = ()=> {
                    file.url = reader.result;
                    this.uploadData.articleId = this.shop_id;
                    this.uploadData.url = file.url;
                 }
                },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            onSubmit(){
                if(!this.food.name){
                    return Toast('请输入食品名称');
                }
                if(!(/^[\u4e00-\u9fa5a-zA-Z]{2,12}$/.test(this.food.name))){
                    return Toast('商铺名称仅支持中英文字符');
                }
                if(!this.food.activities){
                    return Toast('请输入食品活动');
                }
                if(!/^[\u4e00-\u9fa50-9a-zA-Z-,，.。 ]{0,40}$/.test(this.food.activities)){
                    return Toast('食品活动仅支持中英文字符，数字，部分符号，且40个字符内');
                }
                if(!this.food.detail){
                    return Toast('请输入食品活动');
                }
                if(!/^[\u4e00-\u9fa50-9a-zA-Z-,，.。 ]{0,40}$/.test(this.food.detail)){
                    return Toast('食品活动仅支持中英文字符，数字，部分符号，且40个字符内');
                }
                if(this.food.specifications===1){
                    return this.$message.error('暂不支持多规格')
                }
                if(!this.shop_id){
                    return Toast('没有选择商铺');
                }
                const foodInfo={
                    food_name:this.food.name,
                    food_active:this.food.activities,
                    food_detail:this.food.detail,
                    food_characteristics:this.food.characteristics,
                    food_specifications:this.food.specifications,
                    food_packaging_fee:this.food.packaging_fee,
                    food_price:this.food.price,
                    food_shop_id:this.shop_id,
                };
                reqSaveFood(foodInfo).then((res)=>{
                    if(res.code===1){
                        this.$message.error(res.msg);
                    }else {
                        this.show_add_food=false
                    }
                });
            },
            addSpecifications(){
                this.dialogFormVisible = true;
                console.log('e')
            },
            handleDelete(index){
                this.tableData.splice(index,1);

            },
            addSpecs(){
                this.tableData.unshift(this.specsForm);
                this.dialogFormVisible = false;
                setTimeout(()=>{
                    this.$message.error('暂不支持多规格')
                },500)
            },
        },
        watch:{
            shop_id(n){
                if(n===''||n===undefined){
                    Toast('请选择商铺');
                    return this.$router.back()
                }else {
                    this.shop_id = n;
                }
            }
        }
    }
</script>

<style scoped>
    .add_food{
        margin: 55px 15px 10px 15px;
        box-shadow: 0px 0px 20px silver;
        padding: 5px;
        text-align: left;
    }
    .add_food_success{
        margin: 50% auto;
    }
    .avatar_header{
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        font-size: 14px;
        padding: 2px;
    }
    .avatar_text{
        text-align: left;
    }
    .more_specifications,.single_specifications{
        text-align: center;
        margin: 10px 0;
    }
    >>>.el-dialog{
        width: 80% !important;
    }
    >>>.el-dialog__body{
        padding: 0;
    }
    >>>.el-input-number{
        width: 100%;
    }
</style>
