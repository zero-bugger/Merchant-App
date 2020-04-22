require('dotenv').config()

const express = require('express');
const  mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app =express();


const  authRoutes  = require('./routes/authentication');
const  userRoutes  = require('./routes/user');
const  categoryRoutes  = require('./routes/category');
const  productRoutes  = require('./routes/product');

//DB connections
mongoose.connect(process.env.DATABASE,{
	useNewUrlParser: true,
	useCreateIndex:true,
	useUnifiedTopology:true

	
}).then(()=>{
	console.log("DB Connected");
}).catch((err) =>{	
	console.log(`DB crashed due to ${err}`)
});

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//Routes
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);


var port = process.env.PORT || 3000;

app.listen(port, ()=>{
	console.log(`app is running on port ${port}`)
})