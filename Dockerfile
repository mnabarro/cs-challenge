FROM node:lts-alpine3.15
 
WORKDIR "/app"
COPY ./package*.json ./
RUN npm ci
COPY . . 
CMD ["npm", "start"]