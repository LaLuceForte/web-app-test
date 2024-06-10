-- создадим базу данных
CREATE DATABASE store;

--подключимся к базе данных store
\c store;

--создание таблицы покупателей
CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    age INTEGER,
    join_date DATE,
    balance NUMERIC(10, 2)
); 

-- заполнение таблицы покупателей произвольными данными
INSERT INTO customers (name, age, join_date, balance) 
VALUES 
    ('Customer 1', 30, '2022-01-01', 100.00),
    ('Customer 2', 35, '2021-05-15', 150.00),
    ('Customer 3', 28, '2020-10-20', 200.00);

--создание таблицы книг
CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    published_date DATE,
    price NUMERIC(10, 2),
    customer_id INTEGER REFERENCES customers(id)
);

-- заполнение таблицы книг произвольными данными
INSERT INTO books (title, published_date, price, customer_id) 
VALUES 
    ('Harry Potter', '1997-06-26', 29.99, 1),
    ('Catcher in the Rye', '1951-07-16', 39.99, 2),
    ('Flowers for Algernon', '1959-04-01', 39.99, 2),
    ('Book 4', '2022-02-01', 39.99, 2),
    ('Book 5', '2022-02-01', 39.99, 2), 
    ('Book 6', '2022-02-01', 39.99, 2),
    ('Book 7', '2022-02-01', 39.99, 2),    
    ('Book 8', '2022-03-01', 19.99, 3);