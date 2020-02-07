FROM node:10.15-alpine AS builder

COPY . ./GermanTrafficSignClassifierInAngular

WORKDIR /GermanTrafficSignClassifierInAngular

RUN node --version

RUN npm --version

RUN npm i

RUN $(npm bin)/ng build --prod

FROM nginx:alpine

COPY --from=builder /GermanTrafficSignClassifierInAngular/dist/GermanTrafficSignClassifierInAngular/ /usr/share/nginx/html
