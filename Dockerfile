FROM node:8.9.4
ENV NODE_ENV dev
WORKDIR /app
COPY . .
RUN npm install -g yarn swagger
RUN yarn install
RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "zsh"]
RUN wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh || true
EXPOSE 3000 3001 3002 5858
RUN echo "Node Docker app successfully built"
