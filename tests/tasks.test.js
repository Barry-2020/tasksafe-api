const request = require("supertest");
const app = require("../src/app");
const { resetTasks } = require("../src/routes/tasks");

beforeEach(() => {
  resetTasks();
});

describe("TaskSafe API", () => {
  test("GET /health confirma que la API está disponible", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
  });

  test("GET /tasks devuelve una lista vacía al iniciar", async () => {
    const response = await request(app).get("/tasks");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test("POST /tasks crea una tarea válida", async () => {
    const response = await request(app).post("/tasks").send({
      title: "Preparar demostración",
      description: "Verificar los endpoints",
      priority: "high",
    });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: 1,
      title: "Preparar demostración",
      priority: "high",
      completed: false,
    });
  });

  test("POST /tasks rechaza datos inválidos", async () => {
    const response = await request(app).post("/tasks").send({
      title: "No",
      priority: "urgent",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Datos de tarea inválidos");
  });

  test("PATCH /tasks/:id actualiza una tarea existente", async () => {
    const created = await request(app).post("/tasks").send({
      title: "Preparar diapositivas",
    });

    const response = await request(app)
      .patch(`/tasks/${created.body.id}`)
      .send({ completed: true, priority: "high" });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: 1,
      completed: true,
      priority: "high",
    });
  });

  test("DELETE /tasks/:id elimina una tarea", async () => {
    const created = await request(app).post("/tasks").send({
      title: "Probar eliminación",
    });

    const deleted = await request(app).delete(`/tasks/${created.body.id}`);
    const retrieved = await request(app).get(`/tasks/${created.body.id}`);

    expect(deleted.status).toBe(204);
    expect(retrieved.status).toBe(404);
  });
});
