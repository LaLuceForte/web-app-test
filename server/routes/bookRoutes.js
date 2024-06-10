const express = require('express');
const bookController = require('../controllers/BookController');
const router = express.Router();

// определим пути
router.get('/', bookController.getAll);
router.get('/joined', bookController.getAllJoined)
router.post('/', bookController.create);
router.get('/:id', bookController.getById);
router.put('/:id', bookController.update);
router.delete('/:id', bookController.delete);

// удаление книги по айди покупателя
router.delete('/customers/:customerId', bookController.deleteByCustomerId);

// роут для получения книги по forein key = customers_id
router.get('/customers/:customerId', bookController.getByCustomerId);

module.exports = router;
    