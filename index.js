/*
* The main Api file
 */

//Dependencies

var http = require('http');
var url = require('url');
var stringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');

//the server should respond to all requests with a string
var server = http.createServer(function(req,res){

    // Get the Request Url
    var requestedUrl = url.parse(req.url,true);

    // Get the path of the URL
    var urlPath = requestedUrl.pathname;
    var trimedPath = urlPath.replace(/^\/|\/$/g, '');

    // Get http method
    var httpMethod = req.method

    // Get Query String
    var queryString = requestedUrl.query;

    // Get request headers
    var reqheaders = req.headers;

    //Get payloads
    var buffer = ''
    var decoder = new stringDecoder('Utf-8');
    req.on('data', function(data){
        buffer += decoder.write(data);
    })
    req.on('end',function(){
        buffer = decoder.end();


        var choosenhandler = typeof (router[trimedPath]) !== 'undefined' ? router[trimedPath] : handler.notFound;

        var data = {
            'method' : httpMethod,
            'headers' : reqheaders,
            'payload' : buffer
        }

        choosenhandler(data,function(statusCode,payload){
            typeof(statusCode) == 'number' ? statusCode : 200;
            typeof(payload) == 'object' ? payload : {};

            var stringpayload = JSON.stringify(payload);
            res.setHeader('Content-Type', 'json');
            res.writeHead(statusCode);
            res.end(stringpayload);
        })
    })

})

//the server should start listen to port 3000
server.listen(config.port, function(){
    console.log('The server started to listen port ' + config.port + ' on environment ' + config.envName)
});

var handler = {};

handler.sample = function(data,callback){
    callback(406, {'name':'sample handler'});
}

handler.notFound = function(data, callback){
    callback(404);
}

var router = {
    'sample': handler.sample
}