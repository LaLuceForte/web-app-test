const Book = require('../models/Book');

const handleAsyncErrors = fn => (req, res, next) => {
    fn(req, res, next).catch(next);
};

const bookController = {
    getAll: handleAsyncErrors(async (req, res) => {
        const limit = Math.max(parseInt(req.query.limit, 10) || 10, 1);
        const offset = Math.max(parseInt(req.query.offset, 10) || 0, 0);

        const books = await Book.getAll(limit, offset);
        res.json(books);
    }),
    getAllJoined: handleAsyncErrors(async (req, res) => {
        const limit = Math.max(parseInt(req.query.limit, 10) || 10, 1);
        const offset = Math.max(parseInt(req.query.offset, 10) || 0, 0);

        const joined = await Book.getAllWithCustomers(limit, offset);
        res.json(joined);
    }),
    getById: handleAsyncErrors(async (req, res) => {
        const book = await Book.getById(req.params.id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    }),
    getByCustomerId: handleAsyncErrors(async (req, res) => {
        const books = await Book.getByCustomerId(req.params.customerId);
        res.json(books);
    }),
    
    create: handleAsyncErrors(async (req, res) => {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    }),
    update: handleAsyncErrors(async (req, res) => {
        const { id } = req.params; 
        const updatedDetails = req.body; 
        await Book.update(id, updatedDetails);
        res.sendStatus(204);
    }),
    
    delete: handleAsyncErrors(async (req, res) => {
        await Book.delete(req.params.id);
        res.sendStatus(204);
    }),
    deleteByCustomerId: handleAsyncErrors(async (req, res) => {
        await Book.deleteByCustomerId(req.params.customerId);
        res.sendStatus(204);
    })
};

module.exports = bookController;
 