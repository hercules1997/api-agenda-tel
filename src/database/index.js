import Sequelize from "sequelize"
import User from "../app/models/User"

import configDatabase from "../config/database"
import Contact from "../app/models/Contact"

const models = [User, Contact]

/*
 Método para iniciar a conecção do banco de dados
*/
class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(configDatabase.baseURL)
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      )
  }
}

export default new Database()
