const db = require('../db');

const Customer = {
    getAll: (limit, offset) => db.any('SELECT * FROM customers  LIMIT $1 OFFSET $2', [limit, offset]),
    getById: id => db.oneOrNone('SELECT * FROM customers WHERE id = $1', [id]),
    create: ({ name, age, join_date, balance }) => db.one(
        'INSERT INTO books(name, age, join_date, balance) VALUES($1, $2, $3, $4) RETURNING *',
        [name, age, join_date, balance]
    ),
    update: (id, { name, age, join_date, balance }) => db.none(
        'UPDATE books SET name=$1, age=$2, join_date=$3, balance=$4 WHERE id=$5',
        [name, age, join_date, balance, id]
    ),
    delete: id => db.none('DELETE FROM books WHERE id = $1', [id])
};

module.exports = Customer;

