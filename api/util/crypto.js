const crypto = require('crypto')

// 솔트 생성
const create_salt = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if (err) reject(err)
            resolve(buf.toString('base64'))
        })
    })
}

// 솔트 생성, 비밀번호 해시
export const create_hashed_password = (password) => {
    return new Promise(async (resolve, reject) => {
        const salt = await create_salt()
        crypto.pbkdf2(password, salt, 9999, 64, 'sha512', (err, key) => {
            if (err) reject(err)
            resolve({ hashed_password: key.toString('base64'), salt })
        })
    })
}

// 솔트로 비밀번호 해시
export const make_password_hashed = (salt, password) => {
    return new Promise(async (resolve, reject) => {
        crypto.pbkdf2(password, salt, 9999, 64, 'sha512', (err, key) => {
            if (err) reject(err)
            resolve({ hashed_password: key.toString('base64') })
        })
    })
}