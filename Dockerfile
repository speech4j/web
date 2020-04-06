FROM node:alpine as builder
WORKDIR '/web'
COPY package.json .
RUN npm install --node-flags --max-old-space-size=512 --no-warnings
COPY . .
RUN npm run build --node-flags --max-old-space-size=512 --no-warnings

FROM nginx
EXPOSE 80
COPY --from=builder web/dist/web /usr/share/nginx/html