FROM node:14.17.3

# 컨테이너 내 폴더 생성 및 파일 이동 
RUN mkdir -p /app
WORKDIR /app
ADD . /app/

# 초기 설치 및 빌드
RUN rm yarn.lock
RUN yarn install
RUN yarn build

# 모든 아이피와 3000 포트 개방
ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "yarn", "start"]