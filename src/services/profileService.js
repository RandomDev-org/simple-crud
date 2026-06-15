const Profile = require('../models/Profile');

class ProfileService {
    createProfile(name) {
        if (!name || typeof name !== 'string') {
            throw { status: 400, message: 'name es requerido y debe ser string' };
        }
        return Profile.create(name);
    }

    getProfileById(id) {
        const profile = Profile.getById(id);
        if (!profile) {
            throw { status: 404, message: 'Perfil no encontrado' };
        }
        return profile;
    }
}

module.exports = new ProfileService();
