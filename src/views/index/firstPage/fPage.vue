<template>
    <div>
        <div class="fpage_body">
            <h3 style="">数据统计</h3>
            <div class="tag_list">
                <div class="tag_list_item1">
                    <van-tag mark type="primary">当日数据:</van-tag>
                    <van-tag mark color="rgba(53, 142, 189, 0.77)">新增用户</van-tag>
                    <van-tag mark type="danger">新增订单</van-tag>
                    <van-tag mark type="warning">新增管理员</van-tag>
                </div>
                <div class="tag_list_item2">
                    <van-tag mark type="primary">总数据:</van-tag>
                    <van-tag mark type="success">用户</van-tag>
                    <van-tag mark type="danger">订单</van-tag>
                    <van-tag mark type="warning">管理员</van-tag>
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
    export default {
        mounted(){
            const myChart = echarts.init(document.getElementById('ii'));
            let option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['视频广告','直接访问','搜索引擎']
                },
                grid: {
                    left: '3%',
                    right: '4%',
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
                    data: ['2019/12/8','周二','周三','周四']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'视频广告',
                        type:'line',
                        stack: '总量',
                        data:[ 154, 190, 330, 410]
                    },
                    {
                        name:'直接访问',
                        type:'line',
                        stack: '总量',
                        data:[ 334, 390, 330, 320]
                    },
                    {
                        name:'搜索引擎',
                        type:'line',
                        stack: '总量',
                        data:[934, 1290, 6330, 1320]
                    }
                ]
            };
            myChart.setOption(option);
        },
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
        justify-content: space-around;
    }
    .van-tag{
        width: 20%;
    }
</style>
