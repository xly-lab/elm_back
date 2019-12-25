<template>
    <div class="admin_">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>卡片名称</span>
            </div>
            <Field value="只做显示作用"
                   label="用户名"
                   left-icon="contact"
                   disabled/>
            <Field value="只做显示作用"
                   label="用户类型"
                   left-icon="friends-o"
                   disabled/>
            <Field value="只做显示作用"
                   label="用户注册地"
                   left-icon="location-o"
                   disabled/>
            <Field value="只做显示作用"
                   label="用户注册时间"
                   left-icon="clock-o"
                   disabled/>
        </el-card>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import { Field } from 'vant';
    export default {
        components:{
            Field
        },
        computed:{
            ...mapGetters(['userinfo'])
        }
    }
</script>

<style scoped>
    .admin_{
        margin: 50px 10px 0 10px;
    }
</style>
