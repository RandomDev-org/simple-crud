## 1. Infraestructura y Refactorización Inicial

- [x] 1.1 Crear directorios `src/services/` y `public/`
- [x] 1.2 Configurar el servidor de archivos estáticos en `src/index.js` apuntando a `public/`
- [x] 1.3 Limpiar `src/index.js` eliminando las definiciones de rutas redundantes y usando los módulos de `src/routes/`

## 2. Capa de Servicios

- [x] 2.1 Crear `src/services/profileService.js` con la lógica de persistencia de perfiles
- [x] 2.2 Crear `src/services/placeService.js` con la lógica de persistencia y validación de autoría
- [x] 2.3 Refactorizar `profileController.js` para usar `profileService`
- [x] 2.4 Refactorizar `placeController.js` para usar `placeService`

## 3. Lógica de Autorización y Actualización

- [x] 3.1 Implementar validación en `placeService.updatePlace` que verifique que el `profileId` es el `owner`
- [x] 3.2 Asegurar que el controlador retorne 403 con el mensaje "rechazado" cuando la validación falle
- [x] 3.3 Asegurar que el controlador retorne 404 si el lugar no existe
- [x] 3.4 Asegurar que el controlador retorne 200/201 según corresponda con datos válidos

## 4. Frontend (MVP)

- [x] 4.1 Crear `public/index.html` con formularios básicos para perfiles y lugares
- [x] 4.2 Implementar lógica de `fetch` en un archivo `public/app.js` (o dentro del HTML) para interactuar con la API
- [x] 4.3 Añadir botón de actualización en la lista de lugares que pida el `profileId` para validar la autoría

## 5. Validación Final

- [x] 5.1 Verificar que un usuario NO dueño reciba "rechazado" al intentar editar
- [x] 5.2 Verificar que el dueño real pueda editar exitosamente
- [x] 5.3 Confirmar que la arquitectura por capas funciona correctamente sin lógica de DB en controladores
