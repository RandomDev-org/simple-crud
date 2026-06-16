const placeService = require('../services/placeService');

module.exports = {
    async createPlace(req, res) {
        try {
            const place = await placeService.createPlace(req.body);
            res.status(201).json(place);
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message || 'Error interno del servidor' });
        }
    },

    async updatePlace(req, res) {
        try {
            const { id } = req.params;
            const { profileId, ...data } = req.body;
            const place = await placeService.updatePlace(id, data, profileId);
            res.status(200).json(place);
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message || 'Error interno del servidor' });
        }
    },

    async verifyPlace(req, res) {
        try {
            const { id } = req.params;
            const { profileId } = req.body;
            const updated = await placeService.verifyPlace(id, profileId);
            res.status(200).json(updated);
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message || 'Error interno del servidor' });
        }
    }
};
