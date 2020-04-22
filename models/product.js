const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;


var productSchema = new mongoose.Schema({
	
	name:{
		type:String,
		trim:true,
		maxlength:32,
		required:true
	},
	description:{
		type:String,
		trim:true,
		maxlength:2000,
		required:true
	},
	price:{
		type:Number,
		maxlength:32,
		required:true
	},
	category:{
		type:ObjectId,
		ref:"category",
		required:true
	},
	Stock:{
		type:Number
	},
	Sold:{
		type:Number,
		default:0
	},
	photo:{
		data:Buffer,
		contentType:String
	}
	
}, {timestamps:true});


module.exports= mongoose.model("product",productSchema);

