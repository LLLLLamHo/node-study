/**
 * Created by Lam on 16/9/14.
 */
//请求TCP协议
var net = require('net');

//创建一个TCP服务器
var chatServer = net.createServer(),
    clientList = [];//记录链接用户信息

//当有一个新链接时触发的事件。connection
chatServer.on('connection',(client) => {

    /**
     * 记录用户的信息
     * remoteAddress - 客户端所在的IP地址
     * remotePort - 是客户端接收从服务器返回数据的TCP端口 唯一;
     * **/
    client.name = client.remoteAddress + ':' + client.remotePort;

    //事件触发时先客户端发送数据
    client.write('Hi!'+ client.name +'\n');

    //将带有客户端信息的client对象存入数组中
    clientList.push(client);

    //客户端发送数据到服务器事件
    client.on('data',(data) => {

        broadcast(data,client);

    });

    //客户端断开链接的事件
    client.on('end',() => {
        //清除数组中对应要断开链接的客户端信息
       clientList.splice(clientList.indexOf(client),1);
    });

    //报错时的事件,记录
    client.on('error', function(e) {
        console.log(e)
    })

});

//客户端发送数据时的广播事件
function broadcast(message,client){
    //socket不可写的客户端数组
    var cleanup = [];

    //循环记录了的客户端信息
    for(var i = 0;i < clientList.length;i++){
        //如果循环到的客户端不是发送数据的客户端
        if(clientList[i].name !== client.name){

            console.log(clientList[i].writable);
            //判断socket是否可写
            if(clientList[i].writable){
                //可写就发送数据
                clientList[i].write(client.name + 'say:' + message);

            }else{
                //不可写就存入数组中
                cleanup.push(clientList[i]);
                //关闭
                clientList[i].destroy();

            }
        }
    }

    //循环不可写的客户端,从记录的数组移除
    for(i = 0;i < cleanup.length;i++){
        clientList.splice(clientList.indexOf(cleanup[i],1));
    }
}

chatServer.listen(9000);