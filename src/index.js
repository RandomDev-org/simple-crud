require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Routes
require('./routes/profileRoutes')(app);
require('./routes/placeRoutes')(app);

const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Espacios Musicales',
            version: '1.0.0',
            description: 'Mapa colaborativo y gamificado de espacios musicales. Conecta músicos, público y productores en una plataforma centralizada para descubrir y validar lugares de encuentro musical.'
        }
    },
    apis: ['./src/index.js']
});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

app.listen(3000, () => console.log('API en http://localhost:3000'));