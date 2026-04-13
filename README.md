<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Ejecutar en desarrollo

Sigue estos pasos para configurar y levantar el proyecto en tu entorno local:

### 1. Clonar el repositorio
Obtén una copia local del código fuente:
```bash
git clone <url-del-repositorio>
cd <nombre-del-repositorio>
```

### 2. Instalar dependencias
Utiliza `pnpm` para instalar todos los paquetes necesarios:
```bash
pnpm install
```

### 3. Instalar Nest CLI
Es indispensable tener la interfaz de comandos de NestJS instalada de forma global:
```bash
npm i -g @nestjs/cli
```

### 4. Levantar la base de datos
Inicia el contenedor de la base de datos utilizando Docker Compose:
```bash
docker-compose up -d
```