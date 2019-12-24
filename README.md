# only_element

> 使用vue全家栈 , element-ui

## 1.创建登陆界面
> 2019/12/3
1. 登陆界面放在app.vue里面
2. 封装api请求
3. 在云服务器的数据库创建elm_back_userinfo表(username,pass,user_type,user_address,register_time)
4. 在node后端增添`/save_user`路由接口(username,pass,user_type,register_time)
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


> 2019/12/20
1. 在other组件页面添加退出功能，退出时清除cookie
2. 设计完成elm_back_shop_list数据表，其字段为
```javascript 
    shop_id,商铺id,
    shop_name,商铺名称,
    shop_address,商铺地址,
    shop_phone,商铺电话,
    shop_detail,商铺介绍,
    shop_tag,商铺标语,
    shop_type,商铺类型,
    shop_characteristics,商铺特点,
    shop_float_delivery_fee,配送费,
    shop_float_minimum_order_amount,起送价,
    shop_date1,营业初始时间,
    shop_date2,营业结束时间,
    shop_user_id,商铺所属的用户id,
```
3. 设计完成elm_back_shop_list的子表elm_back_shop_list_table_data,此表用于存放商铺里的活动信息其字段信息为
```javascript 
    active_name,活动名称
    active_tag,活动标识
    active_text,活动内容
    shop_table_data_id,商铺数据表id标识
    active_shop_id,活动所属的商铺id  
```
4. 设计完成elm_back_food_list数据表，其字段为
```javascript 
    food_name,商品名称
    food_id,商品唯一id
    food_active,商品活动信息
    food_detail,商品详情
    food_characteristics,商品特点，0为新品，1为招牌
    food_specifications,商品规格，0为单规格，1为多规格
    food_packaging_fee,打包费
    food_price,价格
    food_shop_id商品所属的商铺id 
```
> 2019/12/23
1. 完成addMerchant.vue组件表单数据的验证
2. 完成上面所说组件的前端api调用即reqSaveShop()
3. 后端完成`'/elm_back/save_shop'`接口的实现，同时对数据库内两个相关表格进行操作
4. 后端完成`'/elm_back/get_userList'`接口的实现,get,每次获取用户信息10条
5. 前端 在userList组件中完成对用户列表的加载显示与操作实现每次请求10条数据
6. 后端完成`'/elm_back/get_shopList'`接口的实现,get,每次获取商铺信息10条
7. 前端 在merchantList组件中完成对商铺列表的加载显示与操作实现每次请求10条数据

> 2019/12/24
1. 后端完成`/show_data`,即首页显示的数据，包括有多少用户，多少商铺，多少管理员
2. 完成对`/show_data`接口的请求获取首页需要显示的数据，完成折线图的显示
3. fpage组件遇到的问题 

> 1.首页显示数据时，请求上述接口时遇到数据请求到了，但是没有显示到页面上，首先
> 接口调用实在mounted周期函数里调用的，设置echar图形对象也是在mountedli调用的，
> 因为接口调用是异步的，后端的数据还没有返回，前端echar图形对象就以实现但数据却
> 没有即使跟新，最后使用watch监听数据，把接口调用还是放在mounted里面，并把请求的数据
> 保存在allData里，从而监听addData，如果数据有了，在对echar图形对象进行前端的显示
 
4.| 实现addFood.vue组件，在没有收到shop_id这个字段信息时，是无法进入该组件的，又遇到问题

> 2.在merchantList.vue组件里通过`添加商铺`按钮进入addFood.vue组件就会收到shop_id字段
> 但是又出现之前的上面所谈到的问题，shop_id字段的数据有没有收到，解决在mounted里实现从路由
> 传过来的shop_id字段赋值到data里的shop_id，再在watch里监听该字段shop_id，再对其进行判断是
> 否退出addFood组件，第一次所说可以实现弹出该组件，但是第二次从添加商品直接进入，就不会退出了
> 后续就用实现上面问题同样的方法也没有解决，最后试着把keep-alive这个标签去掉后就能实现所需要求
> 我想应该是将之前的shop_id做了缓存，直接从添加食物进入，之前的shop_id字段数据还存在，所以判断
> 不起作用了
