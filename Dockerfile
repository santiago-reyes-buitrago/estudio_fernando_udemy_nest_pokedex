FROM node:18-alpine3.15

# 1. Habilitar pnpm mediante corepack (o alternativamente usar: RUN npm install -g pnpm)
RUN npm install -g pnpm@9

# Set working directory
RUN mkdir -p /var/www/pokedex
WORKDIR /var/www/pokedex

# 2. Copiar archivos de dependencias primero (Mejora la caché de Docker)
COPY package.json pnpm-lock.yaml* tsconfig.json tsconfig.build.json ./

# 3. Instalar TODAS las dependencias (necesitas las devDependencies para hacer el build)
RUN pnpm install

# 4. Copiar el resto del código (Usa "." para referirte al WORKDIR)
COPY . .

# 5. Construir la aplicación (Ahora TypeScript sí está disponible)
RUN pnpm build

# Opcional: Eliminar las dependencias de desarrollo para aligerar la imagen
 RUN pnpm prune --prod

RUN adduser --disabled-password pokeuser
RUN chown -R pokeuser:pokeuser /var/www/pokedex
USER pokeuser

EXPOSE 3000
CMD [ "node", "dist/main" ]