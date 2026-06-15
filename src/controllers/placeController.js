const placeService = require('../services/placeService');

module.exports = {
    createPlace(req, res) {
        try {
            const place = placeService.createPlace(req.body);
            res.status(201).json(place);
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message || 'Error interno del servidor' });
        }
    },

    updatePlace(req, res) {
        try {
            const { id } = req.params;
            const { profileId, ...data } = req.body;
            const place = placeService.updatePlace(id, data, profileId);
            res.status(200).json(place);
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message || 'Error interno del servidor' });
        }
    },

    verifyPlace(req, res) {
        try {
            const { id } = req.params;
            const { profileId } = req.body;
            const updated = placeService.verifyPlace(id, profileId);
            res.status(200).json(updated);
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message || 'Error interno del servidor' });
        }
    }
};
