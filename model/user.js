const mongoose = require('mongoose');

var user= mongoose.Schema({
	name:{
			type:String,						
	},	
	contact:{
		type:Number
    },
    email:{
        type:String,
		minlength:1,
        require:true,
        unique:true
    },
    password:{
        type:String
    },
    token:{
        type:String
    }
});




var users = mongoose.model('users',user);

module.exports={users};