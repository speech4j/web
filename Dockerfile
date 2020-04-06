FROM node:latest as builder

WORKDIR '/web'

COPY package.json .

RUN npm install 

COPY . .

RUN npm run build --node-flags --max-old-space-size=512 --no-warnings

FROM nginx:latest

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder web/dist/web /usr/share/nginx/html

RUN chmod 777 -R /usr/share/nginx/html

COPY custom-nginx-file.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]