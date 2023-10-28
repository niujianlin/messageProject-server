module.exports = function(io){
    // 记录进入聊天室的人的名字
    let socketList = {};
    let member = 0;

    io.sockets.on('connect', function(socket){
        console.log("链接成功！");

        socket.on('join', name => {
            // console.log(socket);
            socket.name = name;
            socketList[name] = socket.id;
            member++;

            socket.broadcast.emit('welcome', name, member);
            socket.emit('welcome', name, member);  // 使自己看到对自己的欢迎

            // 接收信息广播
            socket.on('message', data => {
                socket.broadcast.emit('sendMsg', data);
            })

            // 用户离开
            socket.on('disconnecting', function(){
                if(socketList.hasOwnProperty(socket.name)){
                    delete socketList[socket.name];
                    member--;
                    // 广播有用户退出
                    socket.broadcast.emit('quit', socket.name, member);
                }
            })

        })

    })

}