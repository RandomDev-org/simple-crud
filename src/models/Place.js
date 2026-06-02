const db = require('../storage/db');
const Profile = require('./Profile');

class Place {
    static create(address, capacity, owner) {
        if (!Profile.getById(owner)) {
            return null;
        }
        const r = db.prepare(
            'INSERT INTO places (address, isVerified, capacity, owner) VALUES (?, ?, ?, ?)'
        ).run(address, 0, capacity, owner);
        return { id: r.lastInsertRowid, address, isVerified: false, capacity, owner };
    }

    static getById(id) {
        return db.prepare('SELECT * FROM places WHERE id = ?').get(id);
    }

    static update(id, data) {
        const place = this.getById(id);
        if (!place) return null;

        const updates = [];
        const values = [];

        if (data.address !== undefined) {
            updates.push('address = ?');
            values.push(data.address);
        }
        if (data.capacity !== undefined) {
            updates.push('capacity = ?');
            values.push(data.capacity);
        }

        if (updates.length === 0) return place;

        values.push(id);
        const query = `UPDATE places SET ${updates.join(', ')} WHERE id = ?`;
        db.prepare(query).run(...values);

        return this.getById(id);
    }

    static verify(id) {
        const place = this.getById(id);
        if (!place) return null;

        db.prepare('UPDATE places SET isVerified = 1 WHERE id = ?').run(id);
        return this.getById(id);
    }
}

module.exports = Place;
