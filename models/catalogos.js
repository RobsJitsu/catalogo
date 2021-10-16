const database = require("./../database");
const Sequelize = require("sequelize");

const Catalogo = database.define("catalogos", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
 
  imagem: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  ano: {
    type: Sequelize.STRING,
    allowNull: false,

  },
  personagens: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  sinopse: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  criador: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  emissoras: {
    type: Sequelize.STRING,
    allowNull: false,
  },  
},
{
  freezeTableName: true,
  timestamps: false, 
  createdAt: false,
  updatedAt: false,
});

module.exports = Catalogo;