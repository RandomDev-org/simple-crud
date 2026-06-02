const { createPlace, updatePlace, verifyPlace } = require('../controllers/placeController');

/**
 * @swagger
 * /places:
 *   post:
 *     summary: Crear un nuevo lugar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address: { type: string }
 *               capacity: { type: integer }
 *               owner: { type: integer }
 *     responses:
 *       201:
 *         description: Lugar creado
 *       400:
 *         description: Datos inválidos o owner no existe
 */

/**
 * @swagger
 * /places/{id}:
 *   put:
 *     summary: Actualizar información de un lugar
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address: { type: string }
 *               capacity: { type: integer }
 *     responses:
 *       200:
 *         description: Lugar actualizado
 *       404:
 *         description: Lugar no encontrado
 */

/**
 * @swagger
 * /places/{id}/verify:
 *   patch:
 *     summary: Verificar un lugar (solo el dueño)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profileId: { type: integer }
 *     responses:
 *       200:
 *         description: Lugar verificado
 *       403:
 *         description: No es el dueño
 *       404:
 *         description: Lugar no encontrado
 */

module.exports = function(app) {
    app.post('/places', createPlace);
    app.put('/places/:id', updatePlace);
    app.patch('/places/:id/verify', verifyPlace);
};
