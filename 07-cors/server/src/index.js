const express = require('express');
const app = express();
const cors = require('cors');

// Middleware para permitir requisições de outros domínios
app.use(cors());
// Middleware para converter o corpo das requisições como JSON
app.use(express.json());

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor escutando na porta 3000');
});
