import Mock from 'mockjs'

//图表数据
let List = []
export default {
    getStatisticalData: () => {
        for (let i = 0; i < 7; i++) {
            List.push(
                Mock.mock({
                    苹果: Mock.Random.float(100, 8000, 0, 0),
                    vivo: Mock.Random.float(100, 8000, 0, 0),
                    小米: Mock.Random.float(100, 8000, 0, 0),
                    华为: Mock.Random.float(100, 8000, 0, 0),
                    魅族: Mock.Random.float(100, 8000, 0, 0),
                    三星: Mock.Random.float(100, 8000, 0, 0),
                })
            )
        }
        return {
            code: 20000,
            data: {
                //饼图
                videoData: [{
                        name: '小米',
                        value: 2999
                    },
                    {
                        name: '苹果',
                        value: 2999
                    },
                    {
                        name: '华为',
                        value: 2999
                    },
                    {
                        name: '三星',
                        value: 2999
                    },
                    {
                        name: '小米',
                        value: 2999
                    },
                    {
                        name: '魅族',
                        value: 2999
                    },
                    {
                        name: 'vivo',
                        value: 2999
                    }
                ],
                //柱状图
                userData: [{
                        date: '周一',
                        new: 5,
                        active: 500
                    },
                    {
                        date: '周二',
                        new: 5,
                        active: 500
                    },
                    {
                        date: '周三',
                        new: 5,
                        active: 500
                    },
                    {
                        date: '周四',
                        new: 5,
                        active: 500
                    },
                    {
                        date: '周五',
                        new: 5,
                        active: 500
                    },
                    {
                        date: '周六',
                        new: 5,
                        active: 500
                    },
                    {
                        date: '周日',
                        new: 5,
                        active: 500
                    },
                ],
                //折线图
                orderData: {
                    date: ['20231001', '20231002', '20231003', '20231004', '20231005', '20231006', '20231007'],
                    data: List
                },
                tableData: [{
                        course: 'oppo',
                        dayBuy: 100,
                        monthBuy: 200,
                        allBuy: 300,
                    },
                    {
                        course: 'vivo',
                        dayBuy: 200,
                        monthBuy: 300,
                        allBuy: 500,
                    },
                    {
                        course: '小米',
                        dayBuy: 300,
                        monthBuy: 100,
                        allBuy: 400,
                    },
                    {
                        course: '华为',
                        dayBuy: 210,
                        monthBuy: 310,
                        allBuy: 520,
                    }
                ]
            }
        }
    }
}