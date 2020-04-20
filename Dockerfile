#############
### build ###
#############

FROM node:12.16.1 as build

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable

WORKDIR /web

ENV PATH /web/node_modules:$PATH

COPY package.json /web/package.json
RUN npm install
RUN npm install -g @angular/cli@9.1.1 --unsafe

COPY . /web

RUN ng test --watch=false
# RUN ng e2e --port 4202

RUN ng build --prod --output-path=dist

############
### prod ###
############

FROM nginx:1.17.10-alpine

# copy artifact build from the 'build environment'
COPY --from=build /web/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
