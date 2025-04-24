const express = require('express');
const app = express();
const userController = require('./controller/user.controller')

// Middleware para parsear o corpo das requisições como JSON
app.use(express.json());

app.use("/", userController)

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor escutando na porta 3000');
});
