<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Pokedex API

## Ejecutar en desarrollo

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd <nombre-del-repositorio>
```

### 2. Instalar dependencias
```bash
pnpm install
```

### 3. Instalar Nest CLI
```bash
npm i -g @nestjs/cli
```

### 4. Configurar variables de entorno
Crear archivo `.env` en la raíz con base en `.env.example`:
```bash
cp .env.example .env
```

Contenido:
```
MONGODB=mongodb://localhost:27017/nest-pokemon
PORT=8080
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_DB=nest-pokemon
```

### 5. Levantar base de datos
```bash
docker-compose up -d
```

### 6. Correr app
```bash
pnpm start:dev
```

### 7. Poblar base de datos (seed)
```
GET http://localhost:8080/api/v2/seed
```

---

## Ejecutar en producción (Docker)

### 1. Configurar variables de entorno
Crear archivo `.env.prod` en la raíz:
```
MONGODB=mongodb://mongo-poke:27017/nest-pokemon
PORT=3000
MONGO_HOST=mongo-poke
MONGO_PORT=27017
MONGO_DB=nest-pokemon
```

> `mongo-poke` es el nombre del contenedor de MongoDB definido en `docker-compose.prod.yaml`.

### 2. Build y levantar
```bash
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

### 3. Poblar base de datos (seed)
```
GET http://localhost:3000/api/v2/seed
```

---

## Stack

- NestJS
- MongoDB + Mongoose
- Docker / Docker Compose
- pnpm