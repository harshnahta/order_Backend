const mongoose = require('mongoose');


var order= mongoose.Schema({
	userId:{
			type:String,						
	},	
	product:{
		type:Object
    },
    cart:{
        type:Object,	
    },    
    date:{
        type:Date
    },
    orderType:{
        type:String
    },
    deliveryDate:{
        type:Date
    },
    status:{
        type:String
    }
});




var orders = mongoose.model('orders',order);

module.exports={orders};