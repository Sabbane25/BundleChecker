// Autor: Mokhtar Yosofzay

module.exports = {
  HOST: "127.0.0.1",
  USER: "tim",
  PASSWORD: "201922255",
  DB: "BundleChecker",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
