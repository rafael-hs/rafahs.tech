FROM node:16 as build

WORKDIR /app

COPY ./ /app

RUN npm install && npm cache clean --force

COPY . /app

RUN npm run build --prod


#server
FROM nginx:1.15.8-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/rafahs-tech /usr/share/nginx/html

#COPY ./deploy/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["sudo", "nginx", "-g", "daemon off;"]
