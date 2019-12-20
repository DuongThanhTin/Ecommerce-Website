const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const cors = require('cors')
const isAuth = require('../middleware/is-auth');
const isAuthAdmin = require('../middleware/is-auth-admin');
const ProductController = require('../apicontrollers/product')



router.use(cors())



//New Product
router.get('/adminTin/addproduct',isAuthAdmin, ProductController.getAddProduct)
router.post('/adminTin/addproduct',isAuthAdmin, ProductController.postAddProduct)

router.get('/product/:_id',ProductController.getProductDetail)

module.exports = router;