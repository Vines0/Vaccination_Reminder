const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Vac_schema',
    password: '0007',
    port: 5432,
});

pool.connect((err) => {
    if (err) {
        console.error('Error connecting to the database', err.stack);
    } else {
        console.log('Database connected successfully');
    }
});
module.exports = pool;
