#!/bin/bash

# 색상 출력 함수 정의
print_colored() {
  local COLOR=$1
  local MSG=$2
  printf "\e[${COLOR}m${MSG}\e[0m\n"
}

# 색상 코드
YELLOW="33"

# 스크립트 실행
print_colored $YELLOW "Starting deployment..."

# .env 파일에서 환경변수 가져오기 (# 주석 제외)
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi
print_colored $YELLOW "Loaded the environment variables."

# 정적 파일 디렉토리를 삭제
rm -rf ./dist
print_colored $YELLOW "Deleted the old static directory."

# 프로젝트 빌드 및 내보내기
yarn build
print_colored $YELLOW "Built the project."

# 이전 AWS용 디렉토리 삭제
rm -rf ./dist_aws
print_colored $YELLOW "Deleted the old AWS directory."

# AWS용 디렉토리로 복사
cp -R dist dist_aws
print_colored $YELLOW "Copied the static directory to the AWS directory."

# HTML 확장자 제거
cd dist_aws
find . -depth -name "*.html" -exec sh -c 'mv "$1" "${1%.html}"' _ {} \;
cd ..
print_colored $YELLOW "Removed the HTML extension."

# AWS S3에 동기화
aws s3 sync --include "*" --acl public-read --follow-symlinks --delete ./dist_aws s3://$S3_BUCKET_NAME --profile bird2
print_colored $YELLOW "Synchronized the AWS directory with S3."

# 확장자 없는 파일에 content-type 지정하여 S3에 복사
aws s3 cp --include "*" --exclude "*.*" --content-type="text/html" --recursive ./dist_aws s3://$S3_BUCKET_NAME --acl public-read --follow-symlinks --profile bird2
print_colored $YELLOW "Copied the files without extension to S3."

# CloudFront 캐시 무효화
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*" --no-cli-pager --profile bird2
print_colored $YELLOW "Invalidated the CloudFront cache."

# 작업한 AWS용 디렉토리 삭제
rm -rf ./dist_aws
print_colored $YELLOW "Deleted the AWS directory."

print_colored $YELLOW "Finished deployment."