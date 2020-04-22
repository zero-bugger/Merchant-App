
const Category = require('../models/category');

exports.getCategoryById = (req,res,next,id)=> {
	Category.findById(id).exec((err,category)=>{
		if(err){
			return res.status(400).json({
				error:"No category found"
			});
		}
		req.category=category;
		next();	
	});
	
	
};

exports.createCategory = (req,res)=>{
	const category = new Category(req.body);
	category.save((err,category)=>{
		if(err){
			return res.status(400).json({
				error:"Cannot create category in DB"
			});
		}
		res.json({category});
	})
}

exports.getCategory = (req,res)=>{
	return res.json(req.category);
}

exports.getAllCategory = (req,res)=> {
	Category.find().exec((err,categories)=>{
		if(err){
			return res.status(400).json({
				error:"Categories are not present"
			});
		}
		res.json(categories);
	})
}

exports.updateCategory = (req,res)=>{
	const category = req.category;
	category.name=req.body.name;
	
	category.save((err,newcategory)=>{
		if(err){
			return res.status(400).json({
				error:"Cannot update category"
			});
		}
		res.json(newcategory);
	})
}

exports.removeCategory = (req,res)=>{
	const category = req.category
	category.remove((err,category)=>{
		if(err){
			return res.json({
				error:"Unable to delete category"
			});
		}
		
		res.json({
			message:`Successfully deleted ${category}`
		})
	})
}