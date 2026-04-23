# Usamos una imagen base de Node.js
FROM node:18-alpine

WORKDIR /app

# Copiamos e instalamos dependencias primero para optimizar la caché de Docker
COPY package*.json ./
RUN npm install

# Copiamos el resto del código fuente. Esto hace que la imagen sea inmutable.
COPY . .

CMD ["node", "server.js"]