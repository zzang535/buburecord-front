import jwt from "jsonwebtoken";
const secret = process.env.TOKEN_SECRET_KEY;

// 토큰 생성
export const create_access = (payload) => {
  return jwt.sign(payload, secret, {
    algorithm: "HS256",
    // expiresIn: 10 // 10s test
    expiresIn: 30 * 24 * 60 * 60, // 30 days
  });
};

// 토큰 검증
export const verify = (token) => {
  return jwt.verify(token, secret);
};

// 리프레시토큰 생성
export const create_refresh = (payload) => {
  return jwt.sign(payload, secret, {
    algorithm: "HS256",
    // expiresIn: 30 // 30s test
    expiresIn: 30 * 24 * 60 * 60, // 30 days
  });
};
