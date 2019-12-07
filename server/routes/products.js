const router = require('express').Router();
const productController = require('../controllers/product');
const chekoutController = require('../controllers/chekout');

router.post('/add', productController.createNewProduct);
router.post('/delete/:id', productController.deleteProduct);
router.post('/checkout', chekoutController.createCheckout);
router.get('/checkouts/all', chekoutController.returnCheckouts);

module.exports = router;