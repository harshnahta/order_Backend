const mongoose = require('mongoose');


var cart= mongoose.Schema({
	userId:{
			type:String,						
	},	
	ProductId:{
		type:String
    },
    Items:{
        type:Number,	
    },
    Cost:{
        type:Number
    }
});




var carts = mongoose.model('carts',cart);

module.exports={carts};