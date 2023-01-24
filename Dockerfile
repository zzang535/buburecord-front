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
ENV CLOUD_FRONT_URL https://d38e565eilzns0.cloudfront.net/
ENV ACCESS_KEY_ID AKIAXDPSAAI3I325CJ5G
ENV SECRET_ACCESS_KEY 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
ENV S3_REGION ap-northeast-2
RUN echo "ENV SETTED"

# build
RUN yarn build
RUN echo "BUILD CREATED"

# 가상 머신에 오픈할 포트
ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "yarn", "start" ]