import app from "./app"
const port = process.env.PORT || 3008

app.listen(port, console.log("Rodando na porta =>", port))
