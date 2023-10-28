const express = require("express");
const app = new express();
const port = 3000


let server = app.listen(8082)
let io = require('socket.io').listen(server)


require('./model/socket.js')(io);
// io.on('connection', (socket)=> {
//     console.log('socket链接成功！');

//     // 接收信息
//     socket.on('message', data=> {

//         // 广播消息
//         socket.broadcast.emit('gbmsg', data);
//     })
// })

//开放跨域请求
app.use(function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "*");
    //跨域允许的请求方式
    // res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    res.header("Access-Control-Allow-Methods", "*");
    // if (req.method == "OPTIONS") res.sendStatus(200); //让options尝试请求快速结束
    // else next();
    next();
});

// 路径拼接模块
const path = require("path")
// post请求解析
const bodyParser = require('body-parser')
// 拦截所有post请求，用bodyParser解析
app.use(bodyParser.urlencoded({ extended: false }))
// 中间件json解析
app.use(bodyParser.json())


// 路由如下

// 测试路由localhost:8080/test/test
app.use("/test", require("./routers/TestRouter"));




app.listen(port, () => {
    console.log("服务器启动成功，端口为:", port)
})
