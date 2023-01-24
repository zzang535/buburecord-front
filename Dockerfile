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
ENV DB_USERNAME bird
ENV DB_PASSWORD 01273100
ENV DB_DATABASE album
ENV DB_HOST ec2-13-125-17-43.ap-northeast-2.compute.amazonaws.com
ENV TOKEN_SECRET_KEY dev_by_bird
RUN echo "ENV SETTED"

# build
RUN yarn build
RUN echo "BUILD CREATED"

# 가상 머신에 오픈할 포트
ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "yarn", "start" ]