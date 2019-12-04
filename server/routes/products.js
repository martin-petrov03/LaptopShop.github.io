const router = require('express').Router();
const productController = require('../controllers/product');

router.post('/add', productController.createNewProduct);
// router.post('/delete/:id', productController.deleteProduct);

module.exports = router;