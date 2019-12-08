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
                    path:'/index/fpage',
                    component:()=>import('../views/index/firstPage/fPage'),
                    meta:{
                        showFooter:true
                    }
                },
                {
                    path:'/index/data',
                    component:()=>import('../views/index/data/data'),
                    meta:{
                        showFooter:true
                    }
                },
                {
                    path:'/index/adddata',
                    component:()=>import('../views/index/addData/addData'),
                    meta:{
                        showFooter:true
                    }
                },
                {
                    path:'/index/other',
                    component:()=>import('../views/index/other/other'),
                    meta:{
                        showFooter:true
                    }
                },
                {
                    path:'/index/userlist',
                    component:()=>import('../views/index/data/userList/userList')

                } ,{
                    path:'/index/foodlist',
                    component:()=>import('../views/index/data/foodList/foodList')
                }, {
                    path:'/index/administratorlist',
                    component:()=>import('../views/index/data/administratorList/administratorList')
                }, {
                    path:'/index/merchantlist',
                    component:()=>import('../views/index/data/merchantList/merchantList')
                }, {
                    path:'/index/orderlist',
                    component:()=>import('../views/index/data/orderList/orderList')
                }
            ]
        },
    ]
})


