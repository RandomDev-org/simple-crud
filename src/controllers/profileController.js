const profileService = require('../services/profileService');

module.exports = {
    createProfile(req, res) {
        try {
            const { name } = req.body;
            const profile = profileService.createProfile(name);
            res.status(201).json(profile);
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message || 'Error interno del servidor' });
        }
    }
};
