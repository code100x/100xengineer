# Use the official Node.js image as the base
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

COPY agent-frontend/package*.json ./


RUN npm install


COPY agent-frontend/ .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]