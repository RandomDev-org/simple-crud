const Place = require('../models/Place');
const Profile = require('../models/Profile');

class PlaceService {
    createPlace(data) {
        const { address, capacity, owner } = data;
        if (!address || !capacity || !owner) {
            throw { status: 400, message: 'address, capacity, y owner son requeridos' };
        }
        
        if (!Profile.getById(owner)) {
            throw { status: 400, message: 'El owner no existe' };
        }

        return Place.create(address, capacity, owner);
    }

    updatePlace(id, data, requesterProfileId) {
        const place = Place.getById(id);
        if (!place) {
            throw { status: 404, message: 'Lugar no encontrado' };
        }

        if (place.owner !== parseInt(requesterProfileId)) {
            throw { status: 403, message: 'rechazado' };
        }

        return Place.update(id, data);
    }

    verifyPlace(id, requesterProfileId) {
        if (!requesterProfileId) {
            throw { status: 400, message: 'profileId es requerido' };
        }

        const place = Place.getById(id);
        if (!place) {
            throw { status: 404, message: 'Lugar no encontrado' };
        }

        if (place.owner !== parseInt(requesterProfileId)) {
            throw { status: 403, message: 'Solo el dueño puede verificar el lugar' };
        }

        return Place.verify(id);
    }

    getPlaceById(id) {
        const place = Place.getById(id);
        if (!place) {
            throw { status: 404, message: 'Lugar no encontrado' };
        }
        return place;
    }
}

module.exports = new PlaceService();
