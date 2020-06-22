module.exports = {
    HOST: "jiankuntestdb.ckmyzqhythck.ap-southeast-1.rds.amazonaws.com",
    USER: "postgres",
    PASSWORD: "12345678",
    DB: "testdb",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };