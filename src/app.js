const express = require("express");
const { router: tasksRouter } = require("./routes/tasks");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "TaskSafe API está funcionando",
  });
});

app.use("/tasks", tasksRouter);

module.exports = app;
