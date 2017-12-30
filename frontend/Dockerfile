FROM node:8-alpine as builder
COPY package.json ./
RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /app && cp -R ./node_modules ./app

WORKDIR /app
COPY . /app

## Build the angular app in production mode and store the artifacts in dist folder
RUN npm run build

FROM nginx
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf.template
RUN chown -R nginx /etc/nginx

EXPOSE 80
CMD ["/bin/sh" ,"-c", "cp /etc/nginx/conf.d/default.conf.template /etc/nginx/conf.d/default.conf && \
                        nginx -g 'daemon off;'"]
