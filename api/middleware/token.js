const jwt = require('../util/jwt.js')
const cookie = require('cookie')

export async function token(req, res, next) {

  console.log('TOKEN MIDDLEWARE')
  const parsed_cookies = cookie.parse(req.headers.cookie ?? '') // cookie 없는 경우 예외처리
  const { access_token, refresh_token } = parsed_cookies
  // console.log('access_token', access_token)
  // console.log('refresh_token', refresh_token)

  try {
    // 1-access 유효하면 next (api 실행)
    const decoded_access = jwt.verify(access_token)
    req.token = decoded_access
    next()

  } catch (error) {
    // 2-access 만료인 경우
    console.log('access decode error');
    console.log(error.name);

    try {
      // 3-refresh 유효한 경우
      const decoded_refresh = jwt.verify(refresh_token)
      const user_data = { 
        idx: decoded_refresh.idx, 
        role: decoded_refresh.role, 
        user_id: decoded_refresh.user_id
      }
      const access_token = jwt.create_access(user_data)
      res.cookie('access_token', access_token, { path: '/', httpOnly: true, sameSite: 'strict'})
      // res.cookie('access_token', access_token, { path: '/', httpOnly: true, secure: true, sameSite: 'strict'})
      res.status(401).send({ code: 401, message: 'refresh_ok_access_error' })

    } catch (error) {
      // 4-refresh 만료인 경우
      console.log('refresh decode error');
      console.log(error.name);
      res.status(401).send({ code: 401, message: 'refresh_error_access_error' })
      
    }
    
  }
 
}
