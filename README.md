# only_element

> 使用vue全家栈 , element-ui

## 1.创建登陆界面
> 2019/12/3
1. 登陆界面放在app.vue里面
2. 封装api请求
3. 在云服务器的数据库创建elm_back_userinfo表(username,pass,user_type,user_address,register_time)
4. 在node后端增添/save_user路由接口(username,pass,user_type,register_time)
5. postman测试该接口

注：该接口并未完成，user_address字段还未获取

> 2019/12/4

1. 认证百度开放平台开发者用户拿到ak码获取用户地址模糊信息
2. 在云服务器的数据库增加elm_back_userinfo表字段改为(username,pass,user_type,register_time，city,province,distract,street,streetNumber)
3. 改进登陆界面
4. 引入vant-ui组件库
5. 测试/save_user接口
6. 开发环境下请求本地后台接口
    ```javascript
    devServer:{
            proxy:{
                '/vue':{
                    target: 'http://localhost:3000',//代理的目标地址
                    changOrigin: true,
                    //开启代理：在本地会创建一个代理服务，然后发送请求的数据，并同时接收请求的数据，这样客户端端和服务端进行数据的交互就不会有跨域问题
                    pathRewrite: {
                        '^/vue': '/'
                    }
                }
            }
        }
    ```
7. api请求使用axios封装promise发请求获取后台数据

> 2019/12/7
1. 下载js-cookies包完成cookies验证自动登录功能
2. 后端编写get请求的cookies接口，用于前端验证自动登录
3. 完成四个组件addData,data,firstPage,other路由index文件配置
4. 引入echarts组，简单实现树状图样式
5. 简单布局完成tabbar组件并实现路由跳转

> 2019/12/8
1. 配置`数据管理`下的5个路由foodList,merchantList,orderList,userList,administratorList.
2. 修改了Header组件，并使用headerConfig函数来控制该组件的显示
3. 完成userList页面的静态布局
4. 完成了merchantList页面的静态布局，除了使用vantui以外，还是用了element-ui的cascader组件，为这个组件添加了必要的data.js文件
5. 对几个底部路由配置添加meta属性，来控制底部四个大导航的显示与隐藏

> 2019/12/9
1. 在路由配置文件里配置`添加数据`下的addMerchant,addFood和`其他`下的admin，distribution，instructions路由文件
2. 并在headerConfig函数里配置上述路由文件的头部显示信息 
3. 补充前一天的5个路由的静态显示页面
4. 在merchantList组件里添加了element-ui的图片上传组件

> 2019/12/12
1. 完成addMerchant组件的页面搭建，本页面为表单页面，存在数据较多
2. 整个页面全用的element-ui组件
