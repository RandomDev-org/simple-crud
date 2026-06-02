const Profile = require('../models/Profile');

module.exports = {
    createProfile(req, res) {
        const { name } = req.body;
        if (!name || typeof name !== 'string') {
            return res.status(400).json({ error: 'name es requerido y debe ser string' });
        }
        const profile = Profile.create(name);
        res.status(201).json(profile);
    }
};
