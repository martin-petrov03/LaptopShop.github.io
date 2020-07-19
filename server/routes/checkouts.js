const router = require('express').Router();
const chekoutController = require('../controllers/chekout');

router.post('/add', chekoutController.createCheckout);
router.get('/all', chekoutController.getCheckouts);
router.get('/:id', chekoutController.getCheckout);
router.delete('/complete/:id', chekoutController.completeCheckout);

module.exports = router;