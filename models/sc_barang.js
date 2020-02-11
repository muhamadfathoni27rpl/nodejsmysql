const Sequelize = require("sequelize");
const db = require("./sequelize");
module.exports = db.sequelize.define(
  "user_barang",
  {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    barang: {
      type: Sequelize.STRING
    },
    pemilik:{
      type: Sequelize.STRING
    }
  },
  { timestamps: false }
);
