# The first FROM is now a stage called build-stage
FROM node:16 AS test-stage
WORKDIR /usr/src/app

COPY . .

RUN npm ci
RUN CI=true npm test


FROM test-stage AS build-stage
WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build", "-p", "3000"]

#FROM nginx:1.20-alpine
# COPY the directory build from build-stage to /usr/share/nginx/html
# The target location here was found from the Docker hub page

#COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html