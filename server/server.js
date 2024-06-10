// подключаемся к модулю express
const express = require('express')
const app = express()
const PORT = 3001;

const customerRoutes = require('./routes/customerRoutes');
const bookRoutes = require('./routes/bookRoutes');

app.use(express.json());

app.use('/api/customers', customerRoutes)
app.use('/api/books', bookRoutes);

app.use((error, response) => {
    response.status(500).send({message: error.message || 'Internal Server Error'});
})

app.use((response) => {
    response.status(404).send({message: "Route not found"})
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
