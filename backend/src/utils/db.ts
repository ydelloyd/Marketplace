import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run('CREATE TABLE users (id INT, name TEXT)');
    db.run('INSERT INTO users (id, name) VALUES (1, "John Doe")');
});

export default db;