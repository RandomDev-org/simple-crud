# Capability: Web Interface

## Purpose
Proveer una interfaz de usuario accesible vía navegador para interactuar con las funcionalidades de la API de gestión de perfiles y lugares.

## Requirements

### Requirement: Interfaz Web de Gestión
El sistema DEBE proveer una interfaz HTML estática que permita a los usuarios interactuar con los perfiles y lugares mediante peticiones fetch a la API.

#### Scenario: Carga de la interfaz principal
- **WHEN** el usuario accede a la raíz del servidor (`/`).
- **THEN** el servidor DEBE responder con el archivo `index.html` servido desde la carpeta `public/`.

#### Scenario: Interacción con la API mediante fetch
- **WHEN** el usuario completa un formulario en la web y presiona enviar.
- **THEN** se DEBE ejecutar una petición `fetch` asíncrona a los endpoints correspondientes y mostrar el resultado en la UI.
