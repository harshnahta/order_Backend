var express = require('express');
var router = express.Router();
var controller = require('../controllers/UserController');
var uploadController = require('../middlewares/upload');
var auth=require('../middlewares/authenticate');

router.post('/register',controller.registerUser);
router.post('/login', controller.loginUser);

router.post('/addProduct',uploadController.uploadImagesPost, controller.addProductsData);
router.get('/getProduct', controller.getProductsData);

router.post('/addCart',controller.addCart);
router.get('/getCart', controller.getCart);

router.post('/placeOrder',controller.Placeorder);

router.get('/getOrder',controller.Getorder);

module.exports=router;