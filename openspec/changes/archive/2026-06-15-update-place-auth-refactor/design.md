## Context

El proyecto actual tiene una estructura MVC pero con lógica de negocio mezclada en los controladores y una redundancia en la definición de rutas (en `index.js` y en `routes/`). No existe validación de autoría para modificar recursos, permitiendo que cualquiera edite cualquier espacio si conoce su ID.

## Goals / Non-Goals

**Goals:**
- Implementar el patrón de arquitectura por capas (Routes -> Controller -> Service).
- Asegurar que `PUT /places/:id` valide que el `profileId` enviado es el dueño del lugar.
- Eliminar la redundancia de rutas en `src/index.js`.
- Proveer un frontend básico en `public/index.html`.
- Estandarizar códigos de estado HTTP.

**Non-Goals:**
- Implementar autenticación real (JWT, Sesiones). Se seguirá usando el `profileId` en el body para simular identidad.
- Cambiar el motor de base de datos (se mantiene SQLite).
- Implementar testing automatizado en esta fase (aunque se recomienda para el futuro).

## Decisions

- **Capa de Servicios**: Se creará `src/services/placeService.js` y `src/services/profileService.js`. Esto permite que los controladores solo se encarguen de la comunicación HTTP (req/res) y los servicios de la lógica (validaciones, DB).
- **Validación de Dueño**: El servicio de lugares verificará contra la DB si el `owner` coincide con el `profileId` del solicitante antes de aplicar el `UPDATE`.
- **Servidor de Estáticos**: Se usará `express.static('public')` para servir el frontend.
- **Limpieza de index.js**: Se moverán todos los `app.post`, `app.put`, etc., a los archivos de rutas correspondientes y se importarán mediante un patrón de inicialización.

## Risks / Trade-offs

- **[Risk] Complejidad innecesaria** → Al ser un proyecto pequeño, añadir servicios puede parecer demasiado, pero es necesario para cumplir con el criterio de "separación de responsabilidades".
- **[Risk] Seguridad débil** → El uso de `profileId` en el body es fácilmente suplantable. *Mitigación*: Se acepta como compromiso para este prototipo rápido, priorizando la lógica de autorización sobre la de autenticación.
