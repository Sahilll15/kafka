const { Client } = require('pg');
const fs = require('fs');

const connectionString = 'postgres://avnadmin:AVNS_jBog7A99olKGHi0t-XO@pg-3a5ade9-sahilchalke1011-0d2f.a.aivencloud.com:15988/defaultdb';

const sslOptions = {
    ca: fs.readFileSync('./ca.pem'),
};

const client = new Client({
    connectionString: connectionString,
    ssl: sslOptions,
});

client.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');

        return client.query('SELECT NOW() as current_time');
    })
    .then(result => {
        console.log('Current time in PostgreSQL:', result.rows[0].current_time);
    })
    .catch(err => {
        console.error('Error connecting to PostgreSQL:', err);
    })
    .finally(() => {
        client.end();
    });



