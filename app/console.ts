/**
 * @disc:控制台输出socket
 * @author:yanxinaliang
 * @time：2018/7/3 16:34
 */
const ws = require("nodejs-websocket");

const port = process.argv[2];
const portNum=port.split("=")[1];
const spawn = require('child_process').spawn;
const path = require("path");


/*
const tail =spawn('tail' , ['-f' , path.join(__dirname,"./logs/")]);//
tail.stdout.on('data' , function(data){
    var line = data.toString('utf-8')
    console.log(line)
    res.write(line)
})

*/

const server = ws.createServer(function(conn){
    conn.on("text", function (str) {
        console.log("收到的信息为:"+str);
        conn.sendText(str)
    });
    conn.on("close", function (code:any, reason:any) {
        console.log("关闭连接",code,reason);
    });
    conn.on("error", function (code, reason) {
        console.log("异常关闭",code,reason);
    });
    
    conn.sendText("111");
}).listen(portNum);
