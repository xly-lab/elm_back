<template>
  <div id="app">
    <el-container>
      <el-header>登&nbsp;&nbsp;&nbsp;录</el-header>
      <el-main>
        <el-alert
                :title="warningText"
                type="warning"
                center
                :closable="false"
                v-show="showWarning"
                show-icon>
        </el-alert>
        <el-form label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="age">
            <el-input v-model="username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="pass" ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" >
            <el-input type="password" v-model="checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <div class="el-form-item">
            <el-radio v-model="radio" :label="1" disabled>管理员</el-radio>
            <el-radio v-model="radio" :label="2" disabled>超级管理员</el-radio>
            <el-radio v-model="radio" :label="3">普通用户</el-radio>
          </div>
          <el-form-item>
            <el-button @click="handleSubmit">提交</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>

  export default {
    data:() =>{
     return{
       pass:'',
       checkPass:'',
       username:'',
       radio:1,//1管理员2.超级管理员
       showWarning:false,
       warningText:''
     }
    },
    components: {
    },
    methods: {
      handleSubmit(){
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
      },
      reset(){
        this.username='';
        this.pass='';
        this.checkPass='';
        this.radio=1;
      }
    },
    watch:{
      username(n){
        if(n==='xly'){
          this.radio=2;
        }else this.radio=1
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .el-header {
    background-image:linear-gradient(to right, #ff8a6d, #218fbd, #88ed78) ;
    color: #ffffff;
    text-align: center;
    font-size: 24px;
    line-height: 60px;
  }
  .el-form{
    width: 360px;
    /* margin-top: 100px; */
    height: 400px;
    position: absolute;
    margin-left: -180px;
    margin-top: -200px;
    top: 50%;
    left: 50%;

  }
  .el-form-item__content {
    margin-left: 0!important;
    display: flex;
    justify-content: space-around;
  }
  .el-button{
    background-image:linear-gradient(to right, #218fbd, #88ed78) !important ;
    color: white!important;
  }
  .el-button:focus, .el-button:hover {
    color: #2f57a4;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
  .el-radio__input.is-checked+.el-radio__label{
    color:#3da9aa;
  }
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #3da9aa;
    background: #40aba9;
  }
</style>
