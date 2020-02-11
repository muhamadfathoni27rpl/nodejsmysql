const Sequelize = require("sequelize");
const db = require("./sequelize");
module.exports = db.sequelize.define(
  "user_gudang",
  {
    uuid_gudang: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    barang: {
      type: Sequelize.STRING
    },
    stok:{
      type: Sequelize.INTEGER
    }
  },
  { timestamps: false }
);
