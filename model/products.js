const mongoose = require('mongoose');


var product= mongoose.Schema({
	name:{
			type:String,						
	},	
	cost:{
		type:Number
    },
    image:{
        type:String,
	
    },
    color:{
        type:String,
    },
    type:{
        type:String,
    },
    Description:{
        type:String,
    }
});




var products = mongoose.model('products',product);

module.exports={products};