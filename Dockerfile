FROM node:14.17.3

# folder set
RUN mkdir -p /app
WORKDIR /app
ADD . /app/
RUN echo "FOLDER CREATED"

# install
RUN rm yarn.lock || true
RUN yarn
RUN echo "INSTALL CREATED"

# env set
ARG DB_USERNAME
RUN echo "DB_USERNAME : $DB_USERNAME"
ARG DB_PASSWORD
RUN echo "DB_PASSWORD : $DB_PASSWORD"
ARG DB_DATABASE
RUN echo "DB_DATABASE : $DB_DATABASE"
ARG DB_HOST
RUN echo "DB_HOST : $DB_HOST"

# build
RUN yarn build
RUN echo "BUILD CREATED"

# 가상 머신에 오픈할 포트
ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "yarn", "start" ]