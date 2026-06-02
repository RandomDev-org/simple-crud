const db = require('../storage/db');

class Profile {
    static create(name) {
        const r = db.prepare(
            'INSERT INTO profiles (name, isVerified) VALUES (?, ?)'
        ).run(name, 0);
        return { id: r.lastInsertRowid, name, isVerified: false };
    }

    static getById(id) {
        return db.prepare('SELECT * FROM profiles WHERE id = ?').get(id);
    }

    static getOwnedPlaces(profileId) {
        return db.prepare('SELECT * FROM places WHERE owner = ?').all(profileId);
    }
}

module.exports = Profile;
