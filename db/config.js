export const config = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: "mysql",
  dialectOptions: {
    charset: "utf8mb4",
    dateStrings: true, 
    typeCast: true
  },
  define : {
    timestamp : true,
    underscored: true
  },
  timezone: "+09:00",
  pool: {
    max: 200,
    min: 0
  },
  logging: false,
}