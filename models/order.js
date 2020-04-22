const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;


const ProductCartSchema = new mongoose.Schema({
	product:{
		type:ObjectId,
		ref:"product"
	},
	price:Number,
	count:Number,
	name:String
	
	
})

const ProductCart  = mongoose.model("productcart",ProductCartSchema);


const orderSchema = new mongoose.Schema({
	
		products:[ProductCartSchema],
		transactionid:{},
		address:String,
		amount:{type:Number},
		updated:Date,
		user:{
			type:ObjectId,
			ref:"user"
		}
},{timestamps:true});

const Order  = mongoose.model("order",orderSchema);

module.exports= {ProductCart,Order};







