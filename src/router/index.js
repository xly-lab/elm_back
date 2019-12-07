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
            component:()=>import('../views/login/login')
        },
        {
            path:'/index',
            component:()=>import("../views/index/index"),
            redirect:'/index/fpage',
            children:[
                {
                    path:'/index/fpage',
                    component:()=>import('../views/index/firstPage/fPage')
                },
                {
                    path:'/index/data',
                    component:()=>import('../views/index/data/data')
                },
                {
                    path:'/index/adddata',
                    component:()=>import('../views/index/addData/addData')
                },
                {
                    path:'/index/other',
                    component:()=>import('../views/index/other/other')
                }
            ]
        },
    ]
})


