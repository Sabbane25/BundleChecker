const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

db.shop = require("../models/shop.model")(sequelize, Sequelize);
db.artikel = require("../models/artikel.model")(sequelize, Sequelize);
db.cpu = require("../models/cpu.model")(sequelize, Sequelize);
db.festplatte = require("../models/festplatte.model")(sequelize, Sequelize);
db.gehaeuse = require("../models/gehaeuse.model")(sequelize, Sequelize);
db.grafikkarte = require("../models/grafikkarte.model")(sequelize, Sequelize);
db.mainboard = require("../models/mainboard.model")(sequelize, Sequelize);
db.netzteil = require("../models/netzteil.model")(sequelize, Sequelize);
db.ram = require("../models/ram.model")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "nutzer_nutzer_rollen_join"
});
db.user.belongsToMany(db.role, {
  through: "nutzer_nutzer_rollen_join"
});

db.artikel.hasMany(db.shop, {
    foreignKey: 'shopID'
});
db.cpu.hasMany(db.artikel, {
    foreignKey: 'url'
});
db.festplatte.hasMany(db.artikel, {
    foreignKey: 'url'
});
db.gehaeuse.hasMany(db.artikel, {
    foreignKey: 'url'
});
db.grafikkarte.hasMany(db.artikel, {
    foreignKey: 'url'
});
db.mainboard.hasMany(db.artikel, {
    foreignKey: 'url'
});
db.netzteil.hasMany(db.artikel, {
    foreignKey: 'url'
});
db.ram.hasMany(db.artikel, {
    foreignKey: 'url'
});

// Nutzer Rollen
db.ROLES = ["user", "admin"];

module.exports = db;
