import { v4 } from "uuid"
import * as Yup from "yup"

import User from "../models/User"

/*
  Estrutura de criar usuário
  */
class UserController {
  async store(request, response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(10),
      })

      // Verificação dos dados para criar usuário
      if (!(await schema.isValid(request.body))) {
        return response.status(400).json({ error: "Dados não estão correto" })
      }

      try {
        await schema.validateSync(request.body, {
          abortEarly: false,
        })
      } catch (err) {
        return response.status(400).json({
          error: err.errors,
        })
      }

      //Verificação se o e-mail já existe
      const { name, email, password } = request.body
      const userExist = await User.findOne({
        where: {
          email,
        },
      })

      if (userExist) {
        return response.status(409).json({
          error: "Esse e-mail já existe",
        })
      }

      const user = await User.create({
        id: v4(),
        name,
        email,
        password,
      })

      return response.status(201).json({
        id: user.id,
        name,
        email,
      })
    } catch (error) {
      console.log(err)
    }
  }
}
export default new UserController()
