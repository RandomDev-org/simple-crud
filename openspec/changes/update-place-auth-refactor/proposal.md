## Why

Los dueños de espacios necesitan autonomía para mantener actualizada la información de sus lugares (dirección, capacidad) sin intervención manual de administradores, asegurando que los datos en la plataforma sean veraces y actuales. Además, el proyecto requiere una refactorización estructural para mejorar la mantenibilidad y escalabilidad, separando responsabilidades en capas (routes, controllers, services).

## What Changes

- **Implementación de autorización**: Restricción de edición de espacios únicamente a sus dueños registrados.
- **Refactorización de Arquitectura**: Introducción de una capa de `services/` para la lógica de negocio, moviendo la lógica pesada fuera de los controladores.
- **Limpieza de Rutas**: Eliminación de la redundancia de rutas en `src/index.js`, centralizando la configuración en `src/routes/`.
- **Frontend Minimalista**: Creación de una interfaz web básica (HTML + Vanilla JS) para interactuar con la API.
- **Estandarización de Respuestas**: Asegurar códigos HTTP semánticos (201, 400, 404, 500) en todos los flujos.

## Capabilities

### New Capabilities
- `place-management`: Capacidad de actualizar información de espacios con validación de autoría (dueño).
- `web-interface`: Interfaz de usuario para gestionar perfiles y lugares mediante fetch.

### Modified Capabilities
- (None - no existing specs)

## Impact

- **API**: Cambios en `PUT /places/:id` para validar el `owner`.
- **Estructura**: Nuevos directorios `src/services/` y `public/`.
- **Index**: Refactorización de `src/index.js` para servir archivos estáticos y limpiar rutas.
- **Base de Datos**: Ningún cambio en el esquema actual, pero mayor rigor en las consultas.
