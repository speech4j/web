FROM node:latest as builder
COPY package.json .
RUN npm install --node-flags --max-old-space-size=512 --no-warnings
COPY . .
RUN npm run build --node-flags --max-old-space-size=512 --no-warnings

FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder dist/web /usr/share/nginx/html
RUN chmod 777 -R /usr/share/nginx/html
COPY custom-nginx-file.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]