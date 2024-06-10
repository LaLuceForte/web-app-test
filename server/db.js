// подключаемся к созданной базе данных store с помощью средств pg-promise
const pgp = require('pg-promise')();

const dbConfig = {
    host: 'localhost',
    port: 5432,
    database: 'store',
    user: 'postgres',
    password: 'root'
};

const db = pgp(dbConfig);

const checkDatabaseExists = async () => {
    try {
        await db.oneOrNone('SELECT 1 FROM pg_database WHERE datname = $1', [dbConfig.database]);
    } catch (error) {
        console.error('Database does not exist');
        process.exit(1);
    }
};

checkDatabaseExists()
    .then(() => {
        console.log('Database exists');
    })
    .catch(error => {
        console.error('Error checking database existence:', error.message);
        process.exit(1);
    });

module.exports = db;
