const db = require('../storage/db');
const Profile = require('./Profile');

class Place {
    static async create(address, capacity, owner) {
        const profile = await Profile.getById(owner);
        if (!profile) {
            return null;
        }
        const r = await db.query(
            'INSERT INTO places (address, "isVerified", capacity, owner) VALUES ($1, $2, $3, $4) RETURNING id',
            [address, false, capacity, owner]
        );
        return { id: r.rows[0].id, address, isVerified: false, capacity, owner };
    }

    static async getById(id) {
        const r = await db.query('SELECT * FROM places WHERE id = $1', [id]);
        return r.rows[0];
    }

    static async update(id, data) {
        const place = await this.getById(id);
        if (!place) return null;

        const updates = [];
        const values = [];
        let counter = 1;

        if (data.address !== undefined) {
            updates.push(`address = $${counter++}`);
            values.push(data.address);
        }
        if (data.capacity !== undefined) {
            updates.push(`capacity = $${counter++}`);
            values.push(data.capacity);
        }

        if (updates.length === 0) return place;

        values.push(id);
        const query = `UPDATE places SET ${updates.join(', ')} WHERE id = $${counter}`;
        await db.query(query, values);

        return this.getById(id);
    }

    static async verify(id) {
        const place = await this.getById(id);
        if (!place) return null;

        await db.query('UPDATE places SET "isVerified" = $1 WHERE id = $2', [true, id]);
        return this.getById(id);
    }
}

module.exports = Place;
