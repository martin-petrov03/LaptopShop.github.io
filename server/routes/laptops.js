const router = require('express').Router();
const productController = require('../controllers/product');

router.get('/all', productController.getLaptops);
router.get('/:id', productController.getLaptop);
router.post('/add', productController.createNewProduct);
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;