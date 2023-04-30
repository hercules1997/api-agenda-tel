import Sequelize, { Model } from "sequelize"

/*
Estrutura para gravação de dados no banco de dados
*/
class Contact extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        ddd: Sequelize.INTEGER,
        phone: Sequelize.INTEGER,
        email: Sequelize.STRING,
        address: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )
    return this
  }
}

export default Contact
