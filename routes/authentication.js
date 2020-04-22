var express = require('express');
var router= express.Router();
const { check } = require('express-validator');
const  {signout,signup,signin,isSignedIn} = require('../controllers/authentication');


router.post("/signup",[
	check("name").isLength({ min: 3 }).withMessage('must be at least 3 chars long'),
	check("email").isEmail().withMessage('Put valid email'),
	check("password").isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
	
  
],signup);

router.post("/signin",[
	
	check("email").isEmail(),
	check("password").isLength({ min: 5 }).withMessage('Field is required'),
	
  
],signin);

router.get("/signout",signout);

router.get("/testroute",isSignedIn,(req,res)=>{
	res.send("Protected route");
});

module.exports= router;


