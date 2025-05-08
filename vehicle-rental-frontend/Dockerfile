FROM node:18-alpine
WORKDIR /app

# Copy env first so it can cache dependencies better
COPY .env.docker .env

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
