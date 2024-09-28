import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.serialize(() => {

    // Create users table
    db.run("CREATE TABLE users (id INT, name TEXT)");

    // Insert into users table
    db.run('INSERT INTO users (id, name) VALUES (1, "John Doe")');

    // Create jobs table
    db.run(`CREATE TABLE jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, 
        description TEXT,
        owner_name TEXT, 
        contact_email TEXT, 
        requirements TEXT,
        expiration_time TEXT,
        created_at TEXT)`);

    // Insert into jobs table
    db.run(
        `INSERT INTO jobs (name, description, owner_name, contact_email, requirements, expiration_time, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [
            "SWE @ MailChimp",
            "This is a SWE Job at Mailchimp",
            "Jane Doe",
            "jane.doe@mailchimp.com",
            "",
            "2024-10-04T19:00:00Z",
            new Date().toISOString(),
        ]
    );

    // Additional job inserts
    db.run(
        `INSERT INTO jobs (name, description, owner_name, contact_email, requirements, expiration_time, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [
            "Job Number 2",
            "This is just job number 2",
            "Jane Doe",
            "jane.doe@mailchimp.com",
            "some sort of skill",
            "2024-10-03T19:00:00Z",
            new Date().toISOString(),
        ]
    );

    db.run(
        `INSERT INTO jobs (name, description, owner_name, contact_email, requirements, expiration_time, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [
            "Space DJ",
            "Go to the moon and become a DJ",
            "Jane Doe",
            "jane.doe@mailchimp.com",
            "",
            "2024-10-04T19:00:00Z",
            new Date().toISOString(),
        ]
    );

    db.run(
        `INSERT INTO jobs (name, description, owner_name, contact_email, requirements, expiration_time, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [
            "Older Job",
            "This is just an expired job",
            "Jane Doe",
            "jane.doe@mailchimp.com",
            "",
            "2024-09-01T19:00:00Z",
            new Date().toISOString(),
        ]
    );

    // Create bids table
    db.run(`CREATE TABLE bids (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        job_id INTEGER, 
        amount NUMERIC, 
        contact_email TEXT, 
        timestamp TEXT,
        FOREIGN KEY (job_id) REFERENCES jobs(id))`);

    // Insert into bids table
    db.run(
        `INSERT INTO bids (job_id, amount, contact_email, timestamp) 
        VALUES (?, ?, ?, ?);`,
        [1, 100, "test@tester.com", new Date().toISOString()]
    );

    db.run(
        `INSERT INTO bids (job_id, amount, contact_email, timestamp) 
        VALUES (?, ?, ?, ?);`,
        [1, 99, "low@tester.com", new Date().toISOString()]
    );

    db.run(
        `INSERT INTO bids (job_id, amount, contact_email, timestamp) 
        VALUES (?, ?, ?, ?);`,
        [3, 999, "low@tester.com", new Date().toISOString()]
    );
});

export default db;
