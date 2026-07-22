# **Lab_Backend_Catastro**

Esquema de control de acceso basado en JWT para mitigar Broken Object Level Authorization Estudio de caso: backend del Portal de Catastro de Cochabamba

## 📌 Contexto

Este repositorio es el entorno de laboratorio controlado desarrollado como parte de una monografía que evalúa un esquema de control de acceso basado 
en JWT + Ownership Binding para mitigar la vulnerabilidad Broken Object Level Authorization, identificada según la clasificación OWASP API Security Top 10.

El diagnóstico inicial realizado con autorización formal de la institución de Catastro Cochabamba, detectó que el backend original exponía
públicamente, sin ningún tipo de autenticación ni validación de sesión, los siguientes endpoints:

| Endpoint | Método | Riesgo detectado |
|----------|---------|------------------|
| `/api/v1/usuarios` | GET | Exposición de la base de usuarios (nombres, login y rol). |
| `/api/v1/usuariosFuncionarios` | GET | Exposición de información del personal municipal. |
| `/api/v1/predios/{id}` | GET | Acceso a datos técnicos, legales y geográficos manipulando el parámetro `{id}`. |

Este proyecto replica esa arquitectura en un entorno de prueba para diseñar y poner a prueba una contramedida, sin intervenir 
en ningún momento sobre el sistema en producción de la institución.

## 🏗️ Arquitectura

```mermaid
flowchart TD

A[Cliente Frontend]
B[Middleware JWT<br/>Verificación de firma y expiración]
C[Ownership Binding<br/>usuario_id == recurso.usuario_id]
D[Controllers]
E[(PostgreSQL)]
F[JSON Response]

A -->|HTTPS| B
B --> C
C --> D
D --> E
E --> F
```

## Stack técnico:

Node.js + Express — servidor y enrutamiento de la API REST
PostgreSQL — persistencia de usuarios, funcionarios y predios
JSON Web Tokens — emisión y verificación de tokens firmados
Postman — interceptación, réplica y validación manual de peticiones durante las pruebas

Estructura del token JWT
Claim	Propósito
id	Identificador del usuario; se contrasta contra usuario_id del recurso para el Ownership Binding
nombres, login	Trazabilidad y auditoría de sesión
tipoUsuario	Rol del usuario, usado para el filtrado RBAC de rutas
exp	Expiración del token, para invalidar sesiones robadas

## 🚀 Puesta en marcha

### 1. Clonar el repositorio

```bash
git clone https://github.com/AleMonCayola/Lab_Backend_Catastro.git
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
```

Completar:

- PostgreSQL
- JWT_SECRET
- SEGURIDAD_JWT

### 4. Iniciar el servidor

```bash
npm start
```


## 👤 Autor

Alejandro Montaño Cayola GitHub: @AleMonCayola
