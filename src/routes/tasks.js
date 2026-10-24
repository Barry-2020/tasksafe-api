const express = require("express");
const { z } = require("zod");

const router = express.Router();

const tasks = [];
let nextId = 1;

const createTaskSchema = z
  .object({
    title: z.string().trim().min(3).max(100),
    description: z.string().trim().max(500).optional(),
    priority: z.enum(["low", "medium", "high"]).default("medium"),
  })
  .strict();

const updateTaskSchema = z
  .object({
    title: z.string().trim().min(3).max(100).optional(),
    description: z.string().trim().max(500).optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
    completed: z.boolean().optional(),
  })
  .strict();

function getTaskId(value) {
  const result = z.coerce.number().int().positive().safeParse(value);

  return result.success ? result.data : null;
}

router.get("/", (req, res) => {
  res.status(200).json(tasks);
});

router.get("/:id", (req, res) => {
  const id = getTaskId(req.params.id);
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }

  res.status(200).json(task);
});

router.post("/", (req, res) => {
  const result = createTaskSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Datos de tarea inválidos",
      errors: result.error.issues,
    });
  }

  const task = {
    id: nextId,
    ...result.data,
    completed: false,
  };

  nextId += 1;
  tasks.push(task);

  res.status(201).json(task);
});

router.patch("/:id", (req, res) => {
  const id = getTaskId(req.params.id);
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }

  const result = updateTaskSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Datos de actualización inválidos",
      errors: result.error.issues,
    });
  }

  Object.assign(task, result.data);

  res.status(200).json(task);
});

router.delete("/:id", (req, res) => {
  const id = getTaskId(req.params.id);
  const taskIndex = tasks.findIndex((item) => item.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }

  tasks.splice(taskIndex, 1);

  res.status(204).send();
});

module.exports = router;