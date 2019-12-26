<template>
    <div class="admin_">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>我的信息</span>
            </div>
            <Field :value="userinfo?userinfo.username:userInfo.username"
                   label="用户名"
                   left-icon="contact"
                   disabled/>
            <Field :value="userinfo?type[userinfo.user_type-1]:type[userInfo.user_type-1]"
                   label="用户类型"
                   left-icon="friends-o"
                   disabled/>
            <Field :value="userinfo?userinfo.province:userInfo.province"
                   label="注册地"
                   left-icon="location-o"
                   disabled/>
            <Field :value="userinfo?Time(userinfo.register_time/1):Time(userInfo.register_time/1)"
                   label="注册时间"
                   left-icon="clock-o"
                   disabled/>
        </el-card>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {reqUserInfo} from '../../../../api'
    import moment from 'moment'
    import { Field } from 'vant';
    import Cookies from 'js-cookie'
    export default {
        data(){
            return{
                type:['管理员','超级管理员','普通会员'],
                userInfo:{}
            }
        },
        mounted(){
            const user_id = Cookies.get('_id');
            console.log(Cookies.get('_id'));
            reqUserInfo({_id:user_id}).then((res)=>{
                console.log('res',res)
                this.userInfo=res.data
            })
        },
        components:{
            Field
        },
        computed:{
            ...mapGetters(['userinfo'])
        },
        methods:{
            Time(tiem_){
                return moment(tiem_).format('YYYY-MM-DD')
            }
        }
    }
</script>

<style scoped>
    .admin_{
        margin: 50px 10px 0 10px;
    }
</style>
