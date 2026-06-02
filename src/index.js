const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const profileRoutes = require('./routes/profileRoutes');
const placeRoutes = require('./routes/placeRoutes');

const app = express();
app.use(express.json());

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

profileRoutes(app);
placeRoutes(app);

app.listen(3000, () => console.log('API en http://localhost:3000'));