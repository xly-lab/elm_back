<template>
    <div class="distribution_">
        <div id="ii_">

        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import {reqPlaceNum} from "../../../../api";
    export default {
        data(){
            return{
                placeNumData:{}
            }
        },
        mounted() {
            reqPlaceNum().then(res=>{
                this.placeNumData = res.data;
            });
        },
        watch:{
            placeNumData(n){
                const {newResult,otherNum} = n;
                const myChart = echarts.init(document.getElementById('ii_'));
                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data:[newResult[0].province,newResult[1].province,newResult[2].province,newResult[3].province,'其他']
                    },
                    series: [
                        {
                            name:'用户注册地',
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
                                {value:newResult[0].num, name:newResult[0].province},
                                {value:newResult[1].num, name:newResult[1].province},
                                {value:newResult[2].num, name:newResult[2].province},
                                {value:newResult[3].num, name:newResult[3].province},
                                {value:otherNum, name:'其他'}
                            ]
                        }
                    ]
                };
                myChart.setOption(option);
            }
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
