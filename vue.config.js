module.exports = {
    lintOnSave:false,

    devServer:{
        // disableHostCheck:true
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
};
