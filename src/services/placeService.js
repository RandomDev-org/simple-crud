const Place = require('../models/Place');
const Profile = require('../models/Profile');

class PlaceService {
    async createPlace(data) {
        const { address, capacity, owner } = data;
        if (!address || !capacity || !owner) {
            throw { status: 400, message: 'address, capacity, y owner son requeridos' };
        }
        
        const profile = await Profile.getById(owner);
        if (!profile) {
            throw { status: 400, message: 'El owner no existe' };
        }

        return await Place.create(address, capacity, owner);
    }

    async updatePlace(id, data, requesterProfileId) {
        const place = await Place.getById(id);
        if (!place) {
            throw { status: 404, message: 'Lugar no encontrado' };
        }

        if (place.owner !== parseInt(requesterProfileId)) {
            throw { status: 403, message: 'rechazado' };
        }

        return await Place.update(id, data);
    }

    async verifyPlace(id, requesterProfileId) {
        if (!requesterProfileId) {
            throw { status: 400, message: 'profileId es requerido' };
        }

        const place = await Place.getById(id);
        if (!place) {
            throw { status: 404, message: 'Lugar no encontrado' };
        }

        if (place.owner !== parseInt(requesterProfileId)) {
            throw { status: 403, message: 'Solo el dueño puede verificar el lugar' };
        }

        return await Place.verify(id);
    }

    async getPlaceById(id) {
        const place = await Place.getById(id);
        if (!place) {
            throw { status: 404, message: 'Lugar no encontrado' };
        }
        return place;
    }
}

module.exports = new PlaceService();
