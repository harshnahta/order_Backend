var mongoose=require('mongoose');
var con;
mongoose.Promise = global.Promise;

var cb = function(err){

    if(!err)

        console.log("Connection Opened");

    else

        console.log("Connection Opened Failed");

    };

mongoose.connect("mongodb://localhost:27017/ecomm",cb);

con = mongoose.connection;

module.exports={mongoose};