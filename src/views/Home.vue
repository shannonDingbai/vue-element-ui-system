<template>
    <div>
        <el-row>
            <el-col :span="8" style="padding-right:10px">
                <el-card class="box-card">
                    <div class="user">
                        <img class='user-img' src="../assets/logo.png" alt="">
                        <div class='user-info'>
                            <p class="name">Admin</p>
                            <p class="acess">超级管理员</p>
                        </div>
                    </div>
                    <div class="login-info">
                        <p><span>上次登录时间： </span><span>2023-11-9</span></p>
                        <p><span>上次登录地点： </span><span>合肥</span></p>
                    </div>
                </el-card>
                <el-card class="table-card" style="margin-top:20px">
                    <el-table
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column v-for="(val,key) in tableLable" :prop="key" :label="val" :key="key"/>
                </el-table>
                </el-card>
            </el-col>
            <el-col :span="16"  style="padding-left:5px">
                 <div class="num">
                    <el-card v-for="item in countData" :key="item.title" :body-style="{display:'flex',padding:0}">
                        <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
                        <div class="text">
                            <p class="price">￥{{item.value}}</p>
                            <p class="desc">{{item.title}}</p>
                        </div>
                    </el-card>
                </div>
                <el-card style="height:280px">
                    <div ref="echarts1" style="height:280px"></div>
                </el-card>
                <div class="graph">
                    <el-card>
                        <div ref='bar_echarts' style="height:260px"></div>
                    </el-card>
                    <el-card>
                        <div ref='pie_echarts' style="height:200px"></div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>


<script>
import * as echarts from 'echarts'
import { getData } from '../api'
export default {
    data(){
        return{
            tableData: [],
            tableLable :{
                course: '课程',
                dayBuy: "今日购买",
                monthBuy: "本月购买",
                allBuy: "总购买",
            },
            countData: [
                {
                    title:"今晚支付订单",
                    value:1234,
                    icon: "success",
                    color: "#2ec7c9"
                },
                 {
                    title:"今日支付订单",
                    value:1234,
                    icon: "success",
                    color: "#2ec7c9"
                },
                 {
                    title:"明日支付订单",
                    value:1234,
                    icon: "success",
                    color: "#2ec7c9"
                },
                 {
                    title:"明晚支付订单",
                    value:1234,
                    icon: "success",
                    color: "#2ec7c9"
                },
                 {
                    title:"后日支付订单",
                    value:1234,
                    icon: "success",
                    color: "#2ec7c9"
                },
                 {
                    title:"后晚支付订单",
                    value:1234,
                    icon: "success",
                    color: "#2ec7c9"
                }
            ]
            }
                },
    mounted() {
        //这里调用接口后的获取到的数据是个对象
        getData().then(({data})=>{
            //这里const {tableData} = data.data，其中tableData获取的是data.data.tableData
            const {tableData} = data.data
            console.log(data.data);
            this.tableData=tableData;

            //基于准备好的dom,初始化echarts实例
            const echart1=echarts.init(this.$refs.echarts1);
            // 绘制折线图表
            var echart1Option ={};
            const {orderData,userData,videoData} =data.data;
            const xAxis=Object.keys(orderData.data[0]);
            const xAxisData ={
                data:xAxis
            }
            //x轴
            echart1Option.xAxis = {data:orderData.date}
            console.log(xAxis)
            //
            echart1Option.legend = xAxisData
            //
            echart1Option.tooltip={}
            //y轴
            echart1Option.yAxis = {}
            echart1Option.series =[]
            // const xAxisDate=Object.keys(orderData.date);
            xAxis.forEach(key=>{
                echart1Option.series.push({
                     name: key,
                     type: 'line',
                     data:  orderData.data.map(item => item[key])
                }
                   
                )
            })
            console.log(echart1Option.series);
            //使用指定的数据显示
            echart1.setOption(echart1Option)

            //柱状图
            const bar_echarts=echarts.init(this.$refs.bar_echarts)
            var barOptions={
                legend:{
                    xAxis
                },
                xAxis: {
                    data: userData.map(item=>item.date)
                },
                tooltip: {
                    xAxis
                },
                yAxis: {},
                series: [
                    {
                    name:'新增用户',
                    type: 'bar',
                    data: userData.map(item=>item.new)
                    },
                    {
                     name:'活跃用户',
                    type: 'bar',
                    data: userData.map(item=>item.active)
                    }
                ]
            }
            bar_echarts.setOption(barOptions)

            //饼状图
            const pie_echarts =echarts.init(this.$refs.pie_echarts)
            var pieOptions = {
                tooltip:{
                    trriger:'item'
                },
                series: [
                    {
                    type: 'pie',
                    color:[
                        "#0f78f4",
                        "#dds36b",
                        "#9462e5",
                        "#a6a6a6",
                        "#e1bh22",
                        "#39c362",
                        "#3ed1cf"
                    ],
                    data: videoData
                    }
                ]
            }
            pie_echarts.setOption(pieOptions)
        })
    }
    }

</script>
<style lang="less" scoped>
    .user {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ccc;
        
        .user-img {
            margin-right: 40px;
            width: 150px;
            height: 150px;
            border-radius: 50%;
        }
    }
    .login-info {
        color: #333333;
        font-size: 12px;
    }
    .num {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        .icon {
            width: 80px;
            height: 80px;
            font-size: 30px;
            text-align: center;
            line-height: 80px;
            color: #fff;
        }
        .text {
            margin-left: 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .price {
                font-size: 20px;
                height: 20px;
                line-height: 20px;
                margin-bottom: 3px;
            }
            .desc {
                color: #999;
                font-size: 14px;
                text-align: center;
            }
        }
        .el-card {
            height: 80px;
            width:32%;
            margin-bottom: 20px;
        }
    }
    .graph {
        display: flex;
        justify-content: space-between;
        height: 260px;
    .el-card {
        width: 48%;
    }
    }
</style>

