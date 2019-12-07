<template>
    <div>
        <Header title="首 页"/>
        <div class="echar">
            <div id="ii"></div>
        </div>
    </div>
</template>

<script>
    import Header from "../../../components/header/header";
    import echarts from 'echarts'
    export default {
        mounted(){
            const myChart = echarts.init(document.getElementById('ii'));
            myChart.setOption({
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
        },
        components:{
            Header
        }
    }
</script>

<style scoped>
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
</style>
