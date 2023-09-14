/*
 Estrutura de configuração do banco de dados
*/

module.exports = {
  dialect: "postgres",
  baseURL: "postgresql://postgres:vhXW6zrlEBpXlBWPunkM@containers-us-west-176.railway.app:5606/railway",
  // host: "localhost",
  // username: "postgres",
  // password: "postgres",
  // database: "agendaTel",
  define: {
    timespamps: true,
    underscored: true,
    underscoredAll: true,
  },
}
