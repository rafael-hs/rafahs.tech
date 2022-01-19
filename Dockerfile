FROM node:16-alpine3.14 As builder

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

RUN npm install
RUN npm run build --prod

FROM nginx:1.15.8-alpine

EXPOSE 80

COPY --from=builder /usr/local/app/dist/rafahs-tech/ /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
