import Sequelize, { Model } from "sequelize"

import bcrypt from "bcrypt"

/*
 Estrutura para gravação dos do usuário no banco de dados
*/
class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )

    /*
Cliptografia da senha no banco de dados
*/
    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 5)
      }
    })

    return this
  }
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash)
  }
}

export default User
