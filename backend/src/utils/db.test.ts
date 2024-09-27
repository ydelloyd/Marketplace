import db from './db';

describe('Database Tests', () => {
    beforeAll((done) => {
        db.serialize(() => {
            db.run('CREATE TABLE IF NOT EXISTS users (id INT, name TEXT)', done);
        });
    });

    afterAll((done) => {
        db.close(done);
    });

    test('should insert a user into the users table', (done) => {
        db.serialize(() => {
            db.run('INSERT INTO users (id, name) VALUES (2, "Jane Doe")', function (err) {
                expect(err).toBeNull();
                expect(this.changes).toBe(1);
                done();
            });
        });
    });

    test('should retrieve a user from the users table', (done) => {
        db.serialize(() => {
            db.get('SELECT name FROM users WHERE id = 1', (err, row) => {
                expect(err).toBeNull();
                expect(row).toEqual({ name: 'John Doe' });
                done();
            });
        });
    });

    test('should retrieve all users from the users table', (done) => {
        db.serialize(() => {
            db.all('SELECT * FROM users', (err, rows) => {
                expect(err).toBeNull();
                expect(rows.length).toBeGreaterThan(0);
                done();
            });
        });
    });
});