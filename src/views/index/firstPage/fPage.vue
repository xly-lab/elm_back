<template>
    <div>
        <div class="fpage_body">
            <h3 style="">数据统计</h3>
            <div class="tag_list">
                <div class="tag_list_item1">
                    <van-tag mark type="primary">当日数据</van-tag>
                    <van-tag mark type="success">新增用户:&nbsp;{{allData.user_1}}</van-tag>
                    <van-tag mark type="danger">新增店铺:&nbsp;{{allData.shop_1}}</van-tag>
                    <van-tag mark type="warning">新增管理员:&nbsp;{{allData.user_1}}</van-tag>
                </div>
                <div class="tag_list_item2">
                    <van-tag mark type="primary">总数据</van-tag>
                    <van-tag mark type="success">用户:&nbsp;{{allData.all_users}}</van-tag>
                    <van-tag mark type="danger">店铺:&nbsp;{{allData.all_shops}}</van-tag>
                    <van-tag mark type="warning">管理员:&nbsp;{{allData.all_users}}</van-tag>
                </div>
            </div>
            <div class="echar">
                <div id="ii"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import moment from 'moment'
    import {reqFirstPageData} from '../../../api'
    export default {
        data(){
            return{
                allData:{}
            }
        },
        mounted(){
            reqFirstPageData().then(res=>{
                console.log(res);
                this.allData = res.data;
            });
        },
        watch:{
            allData(n){
                this.$nextTick(()=>{
                    const myChart = echarts.init(document.getElementById('ii'));
                    // debugger
                    let option = {
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data:['新增用户数量','新增店铺','新增管理员']
                        },
                        grid: {
                            left: '5%',
                            right: '5%',
                            bottom: '3%',
                            containLabel: true
                        },
                        toolbox: {
                            feature: {
                                saveAsImage: {}
                            }
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            data: [ moment(Date.now()-86400000*3).format("MM-DD"),
                                moment(Date.now()-86400000*2).format("MM-DD"),
                                moment(Date.now()-86400000*1).format("MM-DD"),
                                moment(Date.now()).format("MM-DD")           ]
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                                name:'新增用户数量',
                                type:'line',
                                stack: '总量',
                                data:[ n.user_4, n.user_3, n.user_2, n.user_1]
                            },
                            {
                                name:'新增店铺',
                                type:'line',
                                stack: '总量',
                                data:[ n.shop_4, n.shop_3, n.shop_2,n.shop_1]
                            },
                            {
                                name:'新增管理员',
                                type:'line',
                                stack: '总量',
                                data:[ n.user_4, n.user_3, n.user_2, n.user_1]
                            }
                        ]
                    };
                    myChart.setOption(option);
                })
            }
        }
    }
</script>

<style scoped>
    .fpage_body{
        margin:  50px 0;
    }
    .echar{
        position: relative;
        min-height: 500px;
        max-height: 100%;
        width: 100%;
        left: 50%;
        margin-left: -50%;
        /*background-color: sandybrown;*/
    }
    #ii{
        background-color: white;
        position: absolute;
        min-height: 500px;
        max-height: 100%;
        width: 100%;
        left: 50%;
        margin-left: -50%;
    }
    #ii:nth-child(1){
        position: absolute;
        height: 400px;
        padding: 0;
        border-width: 0;
        left: 50%;
        margin-left: -50%;
    }
    .tag_list{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 80px;
    }
    .tag_list_item1,.tag_list_item2{
        line-height: 30px;
        height: 30px;
        margin: 5px;
        display: flex;
        text-align: center;
        justify-content: space-around;
    }
    .van-tag{
        width: 20%;
    }
</style>
