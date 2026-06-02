const Place = require('../models/Place');
const Profile = require('../models/Profile');

module.exports = {
    createPlace(req, res) {
        const { address, capacity, owner } = req.body;
        if (!address || !capacity || !owner) {
            return res.status(400).json({ error: 'address, capacity, y owner son requeridos' });
        }
        const place = Place.create(address, capacity, owner);
        if (!place) {
            return res.status(400).json({ error: 'El owner no existe' });
        }
        res.status(201).json(place);
    },

    updatePlace(req, res) {
        const { id } = req.params;
        const place = Place.update(id, req.body);
        if (!place) {
            return res.status(404).json({ error: 'Lugar no encontrado' });
        }
        res.json(place);
    },

    verifyPlace(req, res) {
        const { id } = req.params;
        const { profileId } = req.body;

        if (!profileId) {
            return res.status(400).json({ error: 'profileId es requerido' });
        }

        const place = Place.getById(id);
        if (!place) {
            return res.status(404).json({ error: 'Lugar no encontrado' });
        }

        if (place.owner !== parseInt(profileId)) {
            return res.status(403).json({ error: 'Solo el dueño puede verificar el lugar' });
        }

        const updated = Place.verify(id);
        res.json(updated);
    }
};
