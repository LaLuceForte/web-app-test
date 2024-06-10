const db = require('../db');
 
const Book = {
    getAll: (limit, offset) => db.any('SELECT * FROM books ORDER BY id LIMIT $1 OFFSET $2', [limit, offset]),
    getAllWithCustomers: (limit, offset) => db.any(`
        SELECT books.id as book_id, books.title, books.published_date, books.price,
               customers.id as customer_id, customers.name, customers.age, customers.join_date, customers.balance
        FROM books
        JOIN customers ON books.customer_id = customers.id
        ORDER BY books.id LIMIT $1 OFFSET $2
    `, [limit, offset]),
    getById: id => db.oneOrNone('SELECT * FROM books WHERE id = $1', [id]),
    getByCustomerId: customerId => db.any('SELECT * FROM books WHERE customer_id = $1', [customerId]),
    create: ({ title, published_date, price, customer_id }) => db.one(
        'INSERT INTO books(title, published_date, price, customer_id) VALUES($1, $2, $3, $4) RETURNING *',
        [title, published_date, price, customer_id]
    ),
    update: (id, { title, published_date, price, customer_id }) => db.none(
        'UPDATE books SET title=$1, published_date=$2, price=$3, customer_id=$4 WHERE id=$5',
        [title, published_date, price, customer_id, id]
    ),
    delete: id => db.none('DELETE FROM books WHERE id = $1', [id]),
    deleteByCustomerId : customerId => db.none('DELETE FROM books WHERE customer_id = $1', [customerId])
};

module.exports = Book;
  