<template>
    <div>
        <div class="add_food">
            <el-form ref="form" :model="food" label-width="80px">
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
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
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
    </div>
</template>

<script>
    import {Notify} from 'vant'
    export default {
        data(){
            return{
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
                food_shop_id:'',
                dialogImageUrl: '',
                dialogVisible: false,
                tableData:[],
                dialogFormVisible:false,
                specsForm:{
                    specsName:'',
                    packing_fee:'',
                    price:''
                }
            }
        },
        mounted(){

        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            onSubmit(){
                if(this.food.specifications===1){
                    return this.$message.error('暂不支持多规格')
                }
                console.log('e')
            },
            addSpecifications(){
                this.dialogFormVisible = true;
                console.log('e')
            },
            handleDelete(index,row){
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
    }
</script>

<style scoped>
    .add_food{
        margin: 55px 15px 10px 15px;
        box-shadow: 0px 0px 20px silver;
        padding: 5px;
        text-align: left;
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
