module.exports = (sequelize, Sequelize) => {

  /**
   * Modell für shop
   */
  const shop = sequelize.define("shop", {
    shopID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      field: 'ShopID'
    },
    name: {
      type: Sequelize.STRING,
      field: 'Name'
    },
    adresse: {
      type: Sequelize.STRING,
      field: 'Adresse'
    },
    telefonnummer: {
      type: Sequelize.STRING,
      field: 'Telefonnummer'
    },
    email: {
      type: Sequelize.STRING,
      field: 'Email'
    },
  }, {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    tableName: 'Shop'
  });

  return shop;
};
