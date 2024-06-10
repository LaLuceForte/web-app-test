// подключаемся к модулю express
const express = require('express');
const customerController = require('../controllers/CustomerController');
const router = express.Router();

// определим пути
router.get('/', customerController.getAll);
router.post('/', customerController.create);
router.get('/:id', customerController.getById);
router.put('/:id', customerController.update);
router.delete('/:id', customerController.delete);

 
module.exports = router;
