FROM node:14.17.3

# folder set
RUN mkdir -p /app
WORKDIR /app
ADD . /app/
RUN echo "FOLDER CREATED"

# install and build
RUN rm yarn.lock || true
RUN yarn
RUN yarn build
RUN echo "BUILD CREATED"

# 모든 아이피와 3000 포트 개방
ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "yarn", "start" ]