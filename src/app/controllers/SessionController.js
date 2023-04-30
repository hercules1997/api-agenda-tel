import * as Yup from "yup"
import jwt from "jsonwebtoken"
import User from "../models/User"
import authConfig from "../../config/auth"

/*
Método para logar
*/
class SessionController {
  async store(request, response) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      })

      /*
Função de verificar dados do usuário
*/
      const useEmailOrPasswordIncorret = () => {
        alert("Usuario e senha não estão corretos")
        return response.status(401).json({
          error: "Usuario e senha não estão corretos",
        })
      }
      if (!(await schema.isValid(request.body))) useEmailOrPasswordIncorret()

      const { email, password } = request.body
      const user = await User.findOne({
        where: {
          email,
        },
      })

      if (!user) useEmailOrPasswordIncorret()
      if (!(await user.checkPassword(password))) useEmailOrPasswordIncorret()

      // Dados corretos, executa o login gerando o token do usuário
      return response.status(200).json({
        id: user.id,
        email,
        name: user.name,
        token: jwt.sign(
          {
            id: user.id,
            name: user.name,
          },
          authConfig.secret,
          {
            expiresIn: authConfig.expiresIn,
          }
        ),
      })
    } catch (err) {
      return response.status(400).json({
        error: err.errors,
      })
    }
  }
}
export default new SessionController()
