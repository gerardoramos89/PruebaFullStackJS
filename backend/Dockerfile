# Usar una imagen base de Node.js
FROM node:18

# Crear y establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Generar Prisma
RUN npx prisma generate

# Exponer el puerto en el que la aplicación escuchará
EXPOSE 5000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
