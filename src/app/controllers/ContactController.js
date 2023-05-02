import * as Yup from "yup"
import Contact from "../models/Contact"
import database from "../../database"
import { Sequelize } from "sequelize"

/*
Comunicação com o banco de dados
*/
const sequelize = database.connection

/*
Método de criar do contato
*/
class ContactController {
  async store(request, response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        ddd: Yup.number().required().min(2),
        phone: Yup.number().required().min(9),
        email: Yup.string().email().required(),
        address: Yup.string().required(),
      })

      //Verificação de erros
      try {
        await schema.validateSync(request.body, {
          abortEarly: false,
        })
      } catch (err) {
        return response.status(400).json({
          error: err.errors,
        })
      }

      const { name, ddd, phone, email, address } = request.body
      const contact = await Contact.create({
        name,
        ddd,
        phone,
        email,
        address,
      })
      return response.json(contact)
    } catch (err) {
      console.log(err)
    }
  }

  /*
  Método para listar contatos
  */
  async index(request, response) {
    try {
      const ctts = await Contact.findAll()
      return response.json(ctts)
    } catch (error) {
      console.log(err)
    }
  }

  /*
  Método de deletar contato
  */
  async delete(request, response) {
    try {
      const Item = sequelize.define("contact", {
        name: Sequelize.STRING,
        ddd: Sequelize.INTEGER,
        phone: Sequelize.INTEGER,
        email: Sequelize.STRING,
        address: Sequelize.STRING,
      })

      const { id } = request.params
      const contactId = await Contact.findByPk(id)
      Item.destroy({ where: { id: contactId.dataValues.id } })
      return response
        .status(200)
        .json({ message: "Contato deletado com sucesso!" })
    } catch (error) {
      console.log(err)
    }
  }
  /*
  Método de atualizar contato
  */
  async update(request, response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        ddd: Yup.number().required(),
        phone: Yup.number().required(),
        email: Yup.string().email().required(),
        address: Yup.string().required(),
      })

      try {
        await schema.validateSync(request.body, {
          abortEarly: false,
        })
      } catch (err) {
        return response.status(400).json({
          error: err.errors,
        })
      }

      const { id } = request.params
      const contact = await Contact.findByPk(id)
      if (!contact) {
        return response.status(401).json({
          message: "Contato não existe",
        })
      }

      const { name, ddd, phone, email, address } = request.body
      await Contact.update(
        {
          name,
          ddd,
          phone,
          email,
          address,
        },
        {
          where: {
            id,
          },
        }
      )

      return response.status(200).json({
        message: "Edição realizada com sucesso!",
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export default new ContactController()
