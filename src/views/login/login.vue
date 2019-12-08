<template>
    <div class="login">
        <Header title="登 录" :left_arrow="false" :left_text="null"/>
        <el-alert
                :title="warningText"
                type="warning"
                center
                :closable="false"
                v-show="showWarning"
                show-icon>
        </el-alert>
        <div class="login_box">
            <div class="login_logo">
                <van-icon name="manager"/>
            </div>
            <van-cell-group>
                <van-field
                        placeholder="请输入用户名"
                        left-icon="contact"
                        v-model="username"
                />
                <van-field
                        placeholder="请输入密码"
                        left-icon="closed-eye"
                        v-model="pass"
                        type="password"
                />
                <van-field
                        placeholder="确认输入密码"
                        left-icon="closed-eye"
                        v-model="checkPass"
                        type="password"
                />
            </van-cell-group>
            <div class="_button">
                <van-button type="primary" @click="handleSubmit">登&nbsp;录</van-button>
                <van-button type="default" @click="reset">重&nbsp;置</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {reqSaveUser} from '../../api'
    import Header from "../../components/header/header";
    export default {
        data(){
            return{
                pass:'',
                checkPass:'',
                username:'',
                radio:'1',//1管理员2.超级管理员
                showWarning:false,
                warningText:'',
                province:'',
                city:'',
                district:'',
                street:'',
                streetNumber:''
            }
        },

        mounted(){
            //获取当前用户的经纬度
            const getPoint = new BMap.Geolocation();
            const geoc = new BMap.Geocoder();
            console.log(geoc);
            getPoint.getCurrentPosition((r)=>{
                console.log(r);
                geoc.getLocation(r.point, (rs)=> {
                    // 将获取的经纬度逆译为地址直段
                    var addComp = rs.addressComponents;
                    // console.log('地址：',addComp,addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
                    this.$nextTick(()=>{
                        this.province=addComp.province;
                        this.city=addComp.city;
                        this.district=addComp.district;
                        this.street=addComp.street;
                        this.streetNumber=addComp.streetNumber;
                    })
                });
            })
        },
        components: {
            Header
        },
        methods: {
            async handleSubmit(){
                if(!this.username){
                    this.warningText='用户名不能为空';
                    this.showWarning=true;
                    setTimeout(()=>{
                        this.showWarning=false;
                    },1000);
                    return;
                }
                if(!this.pass){
                    this.warningText='密码不能为空';
                    this.showWarning=true;
                    setTimeout(()=>{
                        this.showWarning=false;
                    },1000);
                    return;
                }
                if(!this.checkPass){
                    this.warningText='确认密码不能为空';
                    this.showWarning=true;
                    setTimeout(()=>{
                        this.showWarning=false;
                    },1000);
                    return;
                }
                if(this.checkPass!==this.pass){
                    this.warningText='两次密码不一致';
                    this.showWarning=true;
                    setTimeout(()=>{
                        this.showWarning=false;
                    },1000);
                    return;
                }
                const info = {
                    username:this.username,
                    pass : this.pass,
                    user_type: this.radio,
                    province:this.province,
                    city:this.city,
                    district:this.district,
                    street:this.street,
                    streetNumber:this.streetNumber,
                };
                const save_result = await reqSaveUser(info);
                if(save_result.code!==1){
                    this.$store.dispatch('set_user',info);
                    this.$router.replace('/index');
                }else {
                    this.warningText=save_result.msg;
                    this.showWarning=true;
                    setTimeout(()=>{
                        this.showWarning=false;
                    },1000);
                }
            },
            reset(){
                this.username='';
                this.pass='';
                this.checkPass='';
                this.radio='1';
            }
        },
        watch:{
            username(n){
                if(n==='xly'){
                    this.radio='2';
                }else this.radio='1'
            }
        }
    }
</script>

<style>
    .login_box{
        width: 350px;
        height: 440px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -175px;
        margin-top: -190px;
        background-color: #ffffff;
        -webkit-box-shadow: 0px 3px 3px 3px silver;
        box-shadow: 0px 3px 3px 3px #c0c0c045;
        border-radius: 5px;
    }
    .login_logo{
        position: absolute;
        width: 80px;
        height: 80px;
        border: 1px solid #88ed78;
        left: 50%;
        margin-left: -40px;
        border-radius: 50%;
        margin-top: -40px;
        background-image: linear-gradient(#b9fffd, #f5ffad);
        box-shadow: 3px 1px 9px 1px silver;
    }
    ._button{
        position: absolute;
        display: flex;
        bottom: 20%;
        justify-content: space-around;
        width: 300px;
        left: 50%;
        margin-left: -150px;
    }

</style>
<style scoped>
    .van-icon {
        position: relative;
        font: 33px/1 "vant-icon";
        font-size: 70px;
        /* text-rendering: auto; */
        /* text-align: center; */
        -webkit-font-smoothing: antialiased;
    }
    .van-cell-group {
        margin-top: 50px;
    }
    .van-button--primary{
        background-image: linear-gradient(top right, #5cc3ff, #ff606f);
        border: none;
    }
    .el-alert {
        box-shadow: 0px 3px 3px 3px #c0c0c045;
    }
</style>
