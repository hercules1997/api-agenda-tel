
/*
 Estrutura de configuração do banco de dados
*/

module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "postgres",
  database: "agendaTel",
  define: {
    timespamps: true,
    underscored: true,
    underscoredAll: true,
  },
}
