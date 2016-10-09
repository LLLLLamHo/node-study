var http = require('http');
var util = require('util');
var queryString = require('querystring');

http.createServer((req,res) => {

    var post = '';

    console.log(req);

    req.on('data',(chunk) => {
        post += chunk;
    });

    req.on('end',() => {
        post = queryString.parse(post);
        res.end(util.inspect(post));
    })

}).listen(3000);