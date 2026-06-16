const db = require('../storage/db');

class Profile {
    static async create(name) {
        const r = await db.query(
            'INSERT INTO profiles (name, "isVerified") VALUES ($1, $2) RETURNING id',
            [name, false]
        );
        return { id: r.rows[0].id, name, isVerified: false };
    }

    static async getById(id) {
        const r = await db.query('SELECT * FROM profiles WHERE id = $1', [id]);
        return r.rows[0];
    }

    static async getOwnedPlaces(profileId) {
        const r = await db.query('SELECT * FROM places WHERE owner = $1', [profileId]);
        return r.rows;
    }
}

module.exports = Profile;
