const Sequelize = require("sequelize");
const db = require("./sequelize");
module.exports = db.sequelize.define(
  "user_2",
  {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    nama: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    pw: {
      type: Sequelize.STRING
    },
    status_data:{
      type:Sequelize.INTEGER
    }
  },
  { timestamps: false }
);
