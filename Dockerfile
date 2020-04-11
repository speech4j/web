FROM node:12.7.0-alpine

WORKDIR '/web'

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4200

CMD ["npm", "start"]