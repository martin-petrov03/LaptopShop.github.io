const router = require('express').Router();
const productController = require('../controllers/product');

router.post('/add', productController.createNewProduct);
router.post('/delete/:id', productController.deleteProduct);
router.post('/checkout', productController.checkout);

module.exports = router;