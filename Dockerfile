FROM node:8.9.4
ENV NODE_ENV dev
WORKDIR /app
COPY . .
RUN npm install -g yarn swagger
RUN yarn install
EXPOSE 3000 3001 5858 443
RUN echo "Your Docker App is Ready"
