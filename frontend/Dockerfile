FROM node:8-alpine as builder
COPY package.json ./
RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /ng-app && cp -R ./node_modules ./ng-app

WORKDIR /ng-app
COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
RUN $(npm bin)/ng build --prod --build-optimizer

FROM nginx
COPY --from=builder /ng-app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf.template
RUN chown -R nginx /etc/nginx

EXPOSE 80
CMD ["/bin/sh","-c",\
"cp /etc/nginx/conf.d/default.conf.template \
 /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
