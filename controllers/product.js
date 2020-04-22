const Product = require('../models/product');
const formidable =require('formidable');
const fs = require('fs');
const _ = require('lodash');


exports.getProductById = (req,res,next,id) => {
	
	Product.findById(id)
		.populate("category")
		.exec((err,product)=>{
		if(err){
			return res.status(400).json({
				error:"Product id not found"
			})
		}
		req.product = product;
		next();
	})
}

exports.createProduct = (req,res)=> {

	
	let form = new formidable.IncomingForm();
	form.keepExtentions = true;
	
	form.parse(req,(err,fields,files)=>{
		if(err){
			return res.status(400).json({
				error:"Cannot upload photo"
			})
		}
		
		const {name,price,description,stock,category}=fields;
		if(!name||!description||!price||!category||!stock){
			return res.status(400).json({
				error:`Field is missing ${fields}`
			})
		}
		
		
		let product = new Product(fields);
		
		
		if(files.photo){
			if(files.photo.size > 3000000){
				return res.json({
					error:"File size is more than 3 MB"
				})
			}
			
			product.photo.data = fs.readFileSync(files.photo.path);
			product.photo.contentType= files.photo.type;
			
		}
		product.save((err,product)=>{
			if(err){
				return res.status(400).json({
					error:"Unable to add product"
				})
			}
			res.json(product);
		})
		
	})
}

exports.getProduct = (req,res)=>{
	req.product.photo = undefined;
	return res.json(req.product);
}


exports.photo =(req,res,next)=>{
	
	if(req.product.photo.data){
	  res.set("Content-Type", req.product.photo.contentType);
		return res.send(req.product.photo.data);
	}
	next();
}

exports.removeProduct= (req,res)=>{
	
	let product = new Product(req.product);
	product.remove((err,deletedproduct)=>{
		if(err){
			return res.status(400).json({
				error:"Failed to delete the product"
			})
		}
		 res.json ({
			message:`Deleted product $(deletedproduct)`
		})
	})
}



exports.updateProduct = (req,res)=>{
	let form = new formidable.IncomingForm();
	form.keepExtentions = true;
	
	form.parse(req,(err,fields,files)=>{
		if(err){
			return res.status(400).json({
				error:"Cannot upload photo"
			})
		}
		
		//updation code		
		let product = req.product;
		product = _.extend(product,fields);
		
		
		if(files.photo){
			if(files.photo.size > 3000000){
				return res.json({
					error:"File size is more than 3 MB"
				})
			}
			
			product.photo.data = fs.readFileSync(files.photo.path);
			product.photo.contentType= files.photo.type;
			
		}
		product.save((err,product)=>{
			if(err){
				return res.status(400).json({
					error:"Updation of product failed"
				})
			}
			res.json(product);
		})
		
	})
	
	
	
	
	
	
	
}

  
exports.getAllProducts = (req,res)=>{
	let limit = req.query.limit ? req.query.limit:8;
	let sortBy = req.query.sortBy ? req.query.sortBy: "_id";
	
	Product.find()
		.select('-photo')
		.limit(limit)
		.populate("category")
		.sort([[sortby,"asc"]])
		.exec((err,products)=>{
		if(err){
			res.status(400).json({
				error:"Unable to find products"
			});
			
		}
		res.json(products);
	})
}


exports.updateStock =(req,res,next)=>{
	
	let operations = req.body.order.products.map(proc=>{
		return {
			updateOne:{
			filter:{_id: prod._id},
			update:{$inc:{stock: -prod.count,sold:+prod.count}}
		}
	}
	})
	
	Product.bulkWrite(operations,{},(err,products)=>{
		if(err){
			return status(400).json({
				error:"Unable to update bulk"
			});
		}
		next(); 
	})
	
	
	
}








