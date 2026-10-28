// ARCHIVO EXCLUSIVO PARA LA CHARLA.
// No se importa desde src/ y no forma parte de TaskSafe API.
// CodeQL debe detectar ambos patrones como ejemplos inseguros.

const express = require("express");
const { exec } = require("node:child_process");

const demoApp = express();

demoApp.get("/unsafe-eval", (req, res) => {
  const expression = req.query.expression;
  const result = eval(expression);

  res.json({ result });
});

demoApp.get("/unsafe-command", (req, res) => {
  const message = req.query.message;

  exec(`echo ${message}`, (error, stdout) => {
    if (error) {
      return res.status(500).json({ message: "Error de demostración" });
    }

    res.json({ output: stdout });
  });
});

module.exports = demoApp;