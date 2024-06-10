const Customer = require('../models/Customer');

const customerController = {
    getAll: async (req, res) => {
        const limit = parseInt(req.query.limit, 10) || 10;  
        const offset = parseInt(req.query.offset, 10) || 0; 
        try {
            const customers = await Customer.getAll(limit, offset);
            res.json(customers);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    getById: async (req, res) => {
        try {
            const customer = await Customer.getById(req.params.id);
            if (customer) {
                res.json(customer);
            } else {
                res.status(404).json({ error: 'customer not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    create: async (req, res) => {
        try {
            const customer = await Customer.create(req.body);
            res.status(201).json(customer);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    update: async (req, res) => {
        try {
            await Customer.update(req.params.id, req.body);
            res.sendStatus(204);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    delete: async (req, res) => {
        try {
            await Customer.delete(req.params.id);
            res.sendStatus(204);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = customerController;
