import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run("CREATE TABLE users (id INT, name TEXT)");
  db.run('INSERT INTO users (id, name) VALUES (1, "John Doe")');

  db.run(`CREATE TABLE jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, 
        description TEXT,
        owner_name TEXT, 
        contact_email TEXT, 
        expiration_time TEXT,
        created_at TEXT)`);
  db.run(
    `INSERT INTO jobs (name, description, owner_name, contact_email, expiration_time, created_at) 
            VALUES (?, ?, ?, ?, ?, ?)`,
    [
      "SWE @ MailChimp",
      "This is a SWE Job at Mailchimp",
      "Jane Doe",
      "jane.doe@mailchimp.com",
      "2024-10-04T19:00:00Z",
      new Date().toISOString(),
    ]
  );
  db.run(
    `INSERT INTO jobs (name, description, owner_name, contact_email, expiration_time, created_at) 
        VALUES (?, ?, ?, ?, ?, ?)`,
    [
      "Job Number 2",
      "This is just job number 2",
      "Jane Doe",
      "jane.doe@mailchimp.com",
      "2024-10-03T19:00:00Z",
      new Date().toISOString(),
    ]
  );
  db.run(
    `INSERT INTO jobs (name, description, owner_name, contact_email, expiration_time, created_at) 
        VALUES (?, ?, ?, ?, ?, ?)`,
    [
      "Space DJ",
      "Go to the moon and become a dj",
      "Jane Doe",
      "jane.doe@mailchimp.com",
      "2024-10-04T19:00:00Z",
      new Date().toISOString(),
    ]
  );
  db.run(
    `INSERT INTO jobs (name, description, owner_name, contact_email, expiration_time, created_at) 
        VALUES (?, ?, ?, ?, ?, ?)`,
    [
      "Older Job",
      "This is just an expired job",
      "Jane Doe",
      "jane.doe@mailchimp.com",
      "2024-09-01T19:00:00Z",
      new Date().toISOString(),
    ]
  );

  db.run(`CREATE TABLE bids (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        job_id INTEGER, 
        amount NUMERIC, 
        contact_email TEXT, 
        timestamp TEXT,
        FOREIGN KEY (job_id) REFERENCES jobs(id))`);
  db.run(
    `INSERT INTO bids (job_id, amount, contact_email, timestamp) 
        VALUES (?, ?, ?, ?)`,
    [1, 100, "test@tester.com", new Date().toISOString()]
  );
  db.run(
    `INSERT INTO bids (job_id, amount, contact_email, timestamp) 
        VALUES (?, ?, ?, ?)`,
    [1, 99, "low@tester.com", new Date().toISOString()]
  );
  db.run(
    `INSERT INTO bids (job_id, amount, contact_email, timestamp) 
        VALUES (?, ?, ?, ?)`,
    [3, 999, "low@tester.com", new Date().toISOString()]
  );
});

export default db;
