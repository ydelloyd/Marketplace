import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run('CREATE TABLE users (id INT, name TEXT)');
    db.run('INSERT INTO users (id, name) VALUES (1, "John Doe")');
    
    db.run(`CREATE TABLE jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, 
        description TEXT,
        owner_name TEXT, 
        contact_email TEXT, 
        expiration_time TEXT,
        created_at TEXT)`
    );

    db.run(`INSERT INTO jobs (name, description, owner_name, contact_email, expiration_time, created_at) 
            VALUES (?, ?, ?, ?, ?, ?)`, 
            ["SWE @ MailChimp", "This is a SWE Job at Mailchimp", "Jane Doe", "jane.doe@mailchimp.com", "2024-10-03T19:00:00Z", new Date().toISOString()]);
});

export default db;