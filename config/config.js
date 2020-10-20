const jwt=require('jsonwebtoken');
const db = require('../db/db');
url="http://localhost:9003/";
exports.privateKey = '@#$%@#$%-=+';
var dtb=require('../db/db')
exports.db =dtb;
exports.urls=url;
exports.msg = function(status,msg){

    let a = {
        "status":status,
        "message":msg
    };
    //console.log(a);

    return a;
}

exports.datamsg = function(status,data){
    let a = {
        "status":status,
        "data":data
    };
    return a;
}
exports.dtmsgkey = function(status,msg,data){
    let a = {
        "status":status,
        "msg":msg,
        "data":data
    };    
    return a;
}

var privateKeys = '@#$%@#$%-=+';
exports.gentoken=function(data){   
    let token = jwt.sign({email:data},privateKeys,{ expiresIn: '1h' }).toString();
    return token;
}
