const { createProfile } = require('../controllers/profileController');

/**
 * @swagger
 * /profiles:
 *   post:
 *     summary: Crear un nuevo perfil
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *     responses:
 *       201:
 *         description: Perfil creado
 *       400:
 *         description: Datos inválidos
 */

module.exports = function(app) {
    app.post('/profiles', createProfile);
};
