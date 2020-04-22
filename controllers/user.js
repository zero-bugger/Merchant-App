const user = require("../models/user");
const order = require("../models/order");


exports.getUserById = (req,res,next,id)=> {
	user.findById(id).exec((err,user)=>{
			if(err || !user){
				return res.status(400).json({
					error:"User not found in db"
				});
			}		
			req.profile = user;
   			next();
	});
};

exports.getUser= (req,res)=>{
  req.profile.salt = undefined;
  req.profile.encrypt_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
}

exports.updateUser = (req,res)=> {
	user.findByIdAndUpdate(
		{ _id : req.profile._id},
		{ $set : req.body},
		{ new:true, useFindAndModify:false},
		(err,user)=>{
			if(err){
				res.status(400).json({
					error:"You are not authorized"
				});
			}
			  user.salt = undefined;
			  user.encrypt_password = undefined;
			  user.createdAt = undefined;
			  user.updatedAt = undefined;
			  res.json(user);
		}
	
	
	);
}

exports.userPurchaseList = (req,res)=>{
	order.find({user:req.profile._id})
	.populate("user", "_id name")
	.exec((err,order)=>{
		if(err){
			return res.status(400).json({
				error:"Error while placing order"
			});
		}
		return res.json(order);
	})
	
	
}

exports.pushOrderInPurchaseList = (req,res,next)=>{
	let purchases = []
	req.body.order.products.forEach(product => {
		purchases.push({
			id:product._id,
			name:product.name,
			description:product.description,
			category:product.category,
			quantity:product.count,
			amount:req.body.order.amount,
			transactionid:req.body.order.transactionid
			
		});
	})
	
	//store in DB
	user.findOneAndUpdate(
	{id:req.profile._id},
	{$push:{purchases:purchases}},
	{new:true},
	(err,purchases)=>{
			if(err){
				return res.status(400).json({
					erro:"Unable to save purchase list"
				});
			}
		  next();
		}
	);
	
}