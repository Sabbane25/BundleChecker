/**
 * Der Index.js ist die zentrale Stelle, an der alle Models importiert werden.
 */

const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const Merkzettel = require("./merkzettel.model");
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
db.merkzettel = require("../models/merkzettel.model")(sequelize, Sequelize);

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

db.shop.hasMany(db.artikel, {
    foreignKey: 'shopID',
    as: 'ShopID',
});
db.artikel.hasMany(db.cpu, {
    foreignKey: 'url',
    sourceKey: 'produktUrl',
    keyType: Sequelize.STRING
});
db.artikel.hasMany(db.festplatte, {
    foreignKey: 'url',
    sourceKey: 'produktUrl',
    keyType: Sequelize.STRING
});
db.artikel.hasMany(db.gehaeuse, {
    foreignKey: 'url',
    sourceKey: 'produktUrl',
    keyType: Sequelize.STRING
});
db.artikel.hasMany(db.grafikkarte, {
    foreignKey: 'url',
    sourceKey: 'produktUrl',
    keyType: Sequelize.STRING
});
db.artikel.hasMany(db.mainboard, {
    foreignKey: 'url',
    sourceKey: 'produktUrl',
    keyType: Sequelize.STRING
});
db.artikel.hasMany(db.netzteil, {
    foreignKey: 'url',
    sourceKey: 'produktUrl',
    keyType: Sequelize.STRING
});
db.artikel.hasMany(db.ram, {
    foreignKey: 'url',
    sourceKey: 'produktUrl',
    keyType: Sequelize.STRING
});

// Merkzettel
db.user.hasMany(db.merkzettel);
db.merkzettel.belongsTo(db.user);
db.merkzettel.belongsToMany(db.artikel, {
    through: "merkzettel_artikel_join"
});
db.artikel.belongsToMany(db.merkzettel, {
    through: "merkzettel_artikel_join"
});

// Nutzer Rollen
db.ROLES = ["user", "admin"];

module.exports = db;
