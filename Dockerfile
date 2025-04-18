FROM node:latest AS build
WORKDIR /app
COPY . .
RUN npm install -g @angular/cli
RUN npm install
CMD ["ng", "serve", "--host", "0.0.0.0", "--configuration=production"]
EXPOSE 4300
