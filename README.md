# USERS API

El objetivo es crear una API RESTful para manejar recursos de usuarios. Esta API permite agregar, eliminar, actualizar y listar usuarios, almacenando los datos en un archivo JSON.

## Herramientas

- Node.js
- npm

## Instalación

1. Clonar el repositorio

2. Instalar las dependencias:

   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Endpoints

### Obtener todos los usuarios

- **URL**: `/users`
- **Método**: `GET`
- **Descripción**: Retorna una lista de todos los usuarios.

### Agregar un nuevo usuario

- **URL**: `/users`
- **Método**: `POST`
- **Body**:
  ```json
  {
    "name": "Nombre",
    "lastname": "Apellido",
    "email": "email@example.com"
  }
  ```

### Actualizar un usuario existente

- **URL**: `/users/:id`
- **Método**: `PUT`
- **Parámetros**:
  - `id`: ID del usuario a actualizar (se pasa en la URL).
- **Body**:
  ```json
  {
    "name": "Nombre Actualizado",
    "lastname": "Apellido Actualizado",
    "email": "email@example.com"
  }
  ```

### Eliminar un usuario

- **URL**: `/users/:id`
- **Método**: `DELETE`
- **Parámetros**:
  - `id`: ID del usuario a eliminar (se pasa en la URL).
