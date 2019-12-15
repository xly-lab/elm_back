<template>
    <div class="distribution_">
        <div id="ii_">

        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        mounted() {
            const myChart = echarts.init(document.getElementById('ii_'));


            let option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                },
                series: [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:335, name:'直接访问'},
                            {value:310, name:'邮件营销'},
                            {value:234, name:'联盟广告'},
                            {value:135, name:'视频广告'},
                            {value:1548, name:'搜索引擎'}
                        ]
                    }
                ]
            };

            myChart.setOption(option);
        }
    }
</script>

<style scoped>
    .distribution_{
        margin-top: 50px;
    }
    #ii_{
        background-color: white;
        position: absolute;
        min-height: 500px;
        max-height: 100%;
        width: 100%;
        left: 50%;
        margin-left: -50%;
    }
    #ii_:nth-child(1){
        position: absolute;
        height: 400px;
        padding: 0;
        border-width: 0;
        left: 50%;
        margin-left: -50%;
    }
</style>
