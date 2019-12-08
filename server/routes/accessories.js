const router = require('express').Router();
const accessoriesController = require('../controllers/accessories');

router.post('/add', accessoriesController.createNewAccessory);
router.delete('/delete/:id', accessoriesController.deleteAccessory);

module.exports = router;