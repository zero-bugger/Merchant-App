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