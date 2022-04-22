require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'qadb',
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

pool.on('error', (err, client) => {
  console.error('Error: ', err);
});

module.exports = pool;