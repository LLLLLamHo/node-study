/**
 * Created by Lam on 16/9/13.
 */
var fs =require('fs');
//异步
fs.readFile('file.txt','UTF-8',function (err,data) {
    if(err){
        console.log('read file err');
    }else{
        console.log(data);
    }
});
console.log('end');

//同步
// var data = fs.readFileSync('file.txt','UTF-8');
// console.log(data);
// console.log('end');