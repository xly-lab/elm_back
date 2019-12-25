/**
 * @return Object
 *  computed:{

Title(){
    if(this.$route.path==='/index/fpage'){
        return '首页';
    }else if(this.$route.path==='/index/data'){
        return '数据管理';
    }else if(this.$route.path==='/index/adddata'){
        return  '添加数据';
    }else if(this.$route.path==='/index/other'){
        return '其他';
    }
}
}
 */
export  function headerConfig (path) {
    let headerConfigs = {};
    switch (path) {
        case '/index/fpage':
            headerConfigs ={
                title:'首页',
                left_text:'',
                left_arrow:false
            };
            break;
        case '/index/data':
            headerConfigs ={
                title:'数据管理',
                left_text:'',
                left_arrow:false
            };
            break;
        case '/index/adddata':
            headerConfigs ={
                title:'添加数据',
                left_text:'',
                left_arrow:false
            };
            break;
        case '/index/other':
            headerConfigs ={
                title:'其他',
                left_text:'',
                left_arrow:false
            };
            break;
        case '/index/userlist':
            headerConfigs ={
                title:'用户列表',
                left_text:'返回',
                left_arrow:true
            };
            break;
        case '/index/foodlist':
            headerConfigs ={
                title:'食物列表',
                left_text:'返回',
                left_arrow:true
            };
            break;
        case '/index/administratorlist':
            headerConfigs ={
                title:'管理员列表',
                left_text:'返回',
                left_arrow:true
            };
            break;
        case '/index/orderlist':
            headerConfigs ={
                title:'订单列表',
                left_text:'返回',
                left_arrow:true
            };
            break;
        case '/index/merchantlist':
            headerConfigs ={
                title:'商家列表',
                left_text:'返回',
                left_arrow:true
            };
            break;
        case '/adddata/addfood':
            headerConfigs ={
                title:'添加商品',
                left_text:'返回',
                left_arrow:true
            };
            break;
        case '/adddata/addmerchant':
            headerConfigs ={
                title:'添加商铺',
                left_text:'返回',
                left_arrow:true
            };
            break;
        case '/other/distribution':
            headerConfigs ={
                title:'用户分布',
                left_text:'返回',
                left_arrow:true
            };
            break;
        case '/other/admin':
            headerConfigs ={
                title:'个人信息',
                left_text:'返回',
                left_arrow:true
            };
            break;
        case '/other/instructions':
            headerConfigs ={
                title:'说明',
                left_text:'返回',
                left_arrow:true
            };
            break;
    }
    return headerConfigs;
};
