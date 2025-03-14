# 🚀 GameAndBack  

**GameAndBack** es el backend de la aplicación **GameAndMatch**, proporcionando una API REST para gestionar partidas y encuentros deportivos.  
## Características ✨

- **API RESTful**: Implementada en JavaScript para interactuar con el backend de manera eficiente.
- **Autenticación con token**: Uso de tokens **JWT** (JSON Web Token) para la autenticación y autorización de usuarios 🔑.
- **Documentación con Swagger**: La API está completamente documentada utilizando **Swagger** para facilitar la comprensión y uso de sus endpoints 📄.

## 📖 Documentación  

La API REST está documentada con **Swagger**. Para acceder a la documentación, inicia el backend y visita:  


## ⚙️ Instalación y ejecución  

### 1️⃣ Requisitos previos  
Asegúrate de tener instalado:  
- [Node.js](https://nodejs.org/)  
- [MongoDB](https://www.mongodb.com/) (si se usa una base de datos local)  

### 2️⃣ Clonar el repositorio  
```bash
git clone https://github.com/CamarillaGuanxi/GameAndBack.git
cd GameAndBack
```
### 3️⃣ Instal las dependencias
```bash
npm install
```
### 4️⃣ Crea un archivo .env en la raíz del proyecto y define las variables de entorno necesarias. Un ejemplo de archivo .env:
```bash
PORT=3000
JWT_SECRET=tu_clave_secreta
```
### 5️⃣Inicia el servidor:
```bash
npm start
```

El servidor debería estar corriendo en `http://localhost:3000`. 🌐

## Autenticación 🔒

La API utiliza autenticación basada en JWT (JSON Web Tokens). Para acceder a los endpoints protegidos, es necesario enviar un token válido en el encabezado de la solicitud.

### Obtener un token 🏷️

Para obtener un token, realiza una solicitud `POST` a `/login` con las credenciales de usuario.

**Ejemplo:**
```bash
POST /login
Content-Type: application/json

{
  "username": "usuario",
  "password": "contraseña"
}
```
Si las credenciales son correctas, la respuesta será un **token JWT**. 🎟️

## Usar el token 💼

Para acceder a los endpoints protegidos, incluye el token en el encabezado `Authorization` de la siguiente manera:

```bash
Authorization: Bearer <tu_token_aqui>
```
## Documentación con Swagger 📚

La documentación de la API está disponible a través de **Swagger**. Puedes acceder a ella al iniciar el servidor y navegar a:

```bash
http://localhost:3000/api-docs
```
Swagger proporciona una interfaz interactiva que te permite ver todos los endpoints disponibles, sus parámetros, y realizar pruebas directamente desde el navegador 🖱️.

## Endpoints 📍

A continuación, se encuentran algunos de los principales endpoints disponibles:

- `GET /games`: Obtiene una lista de todos los juegos 🎮.
- `POST /games`: Crea un nuevo juego 🆕.
- `GET /games/{id}`: Obtiene detalles de un juego específico 🔍.
- `PUT /games/{id}`: Actualiza un juego existente ✏️.
- `DELETE /games/{id}`: Elimina un juego 🗑️.

### Ejemplo de uso 🔧

**Crear un juego:**

```bash
POST /games
Content-Type: application/json
Authorization: Bearer <tu_token_aqui>

{
  "name": "Nuevo Juego",
  "genre": "Aventura"
}
```
**Obtener todos los juegos:**

```bash
GET /games
Authorization: Bearer <tu_token_aqui>
```
