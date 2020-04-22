const express = require('express');
const router = express.Router();
const {getProductById,createProduct,getProduct,photo,removeProduct,updateProduct,getAllProducts
} = require('../controllers/product');
const {getUserById} = require('../controllers/user');
const {isSignedIn,isAdmin,isAuthenticated} = require('../controllers/authentication');


router.param('userId',getUserById);
router.param('productId',getProductById);


router.post('/product/create/:userId',isSignedIn,isAuthenticated,isAdmin,createProduct);

router.get('/product/:productId', getProduct);
router.get('/product/photo/:productId',photo);

router.delete('/product/:productId/:userId',isSignedIn,isAuthenticated,isAdmin,removeProduct);
router.put('/product/:productId/:userId',isSignedIn,isAuthenticated,isAdmin,updateProduct);

router.get('/products',getAllProducts);

module.exports = router;