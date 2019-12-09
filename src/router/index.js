import Vue  from 'vue';
import VueRouter from 'vue-router'


Vue.use(VueRouter);

export default new VueRouter({
    routes:[
        {
            path:'/',
            redirect:'/login',
        },
        {
            path:'/login',
            component:()=>import('../views/login/login'),
        },
        {
            path:'/index',
            component:()=>import("../views/index/index"),
            redirect:'/index/fpage',
            children:[
                {
                    path:'/index/fpage',//首页
                    component:()=>import('../views/index/firstPage/fPage'),
                    meta:{
                        showFooter:true
                    }
                },
                {
                    path:'/index/data',//数据
                    component:()=>import('../views/index/data/data'),
                    meta:{
                        showFooter:true
                    }
                },
                {
                    path:'/index/adddata',//添加数据
                    component:()=>import('../views/index/addData/addData'),
                    meta:{
                        showFooter:true
                    }
                },
                {
                    path:'/index/other',//其他
                    component:()=>import('../views/index/other/other'),
                    meta:{
                        showFooter:true
                    }
                },
                {
                    path:'/index/userlist',//用户列表
                    component:()=>import('../views/index/data/userList/userList')

                } ,{
                    path:'/index/foodlist',//食物列表
                    component:()=>import('../views/index/data/foodList/foodList')
                }, {
                    path:'/index/administratorlist',//管理员列表
                    component:()=>import('../views/index/data/administratorList/administratorList')
                }, {
                    path:'/index/merchantlist',//商家列表
                    component:()=>import('../views/index/data/merchantList/merchantList')
                }, {
                    path:'/index/orderlist',//订单列表
                    component:()=>import('../views/index/data/orderList/orderList')
                }, {
                    path:'/adddata/addfood',//添加食物
                    component:()=>import('../views/index/addData/addFood/addFood')
                }, {
                    path:'/adddata/addmerchant',//添加商店
                    component:()=>import('../views/index/addData/addMerchant/addMerchant')
                }, {
                    path:'/other/distribution',//用户分布
                    component:()=>import('../views/index/other/distribution/distribution')
                }, {
                    path:'/other/admin',//管理员设置
                    component:()=>import('../views/index/other/admin/admin')
                }, {
                    path:'/other/instructions',//说明
                    component:()=>import('../views/index/other/instructions/instructions')
                }
            ]
        },
    ]
})


