# Capability: Place Management

## Purpose
Gestionar la creación, actualización y validación de lugares, asegurando que solo los dueños puedan realizar modificaciones.

## Requirements

### Requirement: Actualización de lugar con validación de dueño
El sistema DEBE permitir la actualización de la dirección y capacidad de un lugar únicamente si quien realiza la petición es el dueño registrado del mismo.

#### Scenario: Actualización exitosa por el dueño
- **WHEN** el dueño de un lugar envía una petición `PUT /places/{id}` con nuevos datos y su `profileId` correcto.
- **THEN** el sistema actualiza la información en la base de datos y responde con un código 200 (OK).

#### Scenario: Rechazo de actualización por no ser dueño
- **WHEN** un usuario que no es el dueño envía una petición `PUT /places/{id}` intentando modificar el lugar.
- **THEN** el sistema rechaza la operación y responde con un mensaje de "rechazado" (o código 403 Forbidden).

### Requirement: Separación de responsabilidades (Servicios)
La lógica de validación de propiedad y persistencia DEBE residir en una capa de servicios independiente de los controladores.

#### Scenario: Delegación a servicio
- **WHEN** el controlador de lugares recibe una petición de actualización.
- **THEN** debe invocar un método en `placeService` para ejecutar la lógica de validación y guardado.
