# TaskSafe API

API REST sencilla para gestionar tareas personales, creada como proyecto demostrativo para una charla universitaria sobre desarrollo seguro y DevSecOps.

La aplicación está construida con Node.js y Express. En esta primera versión, las tareas se almacenan temporalmente en memoria para mantener el enfoque en la API, validación de datos y pruebas automatizadas.

## Características

- Crear tareas.
- Listar todas las tareas.
- Consultar una tarea por su ID.
- Actualizar una tarea o marcarla como completada.
- Eliminar tareas.
- Validar los datos de entrada con Zod.
- Responder con códigos HTTP adecuados.

## Tecnologías

- Node.js
- Express
- Zod
- Jest y Supertest — pruebas automatizadas de los endpoints
- Nodemon — reinicio automático durante el desarrollo

## Instalación

Clona el repositorio e instala las dependencias:

```bash
git clone git@github.com:Barry-2020/tasksafe-api.git
cd tasksafe-api
npm install
```

## Ejecutar el proyecto

Modo desarrollo, con reinicio automático al guardar cambios:

```bash
npm run dev
```

La API estará disponible en:

```text
http://localhost:3000
```

También puedes iniciarla sin Nodemon:

```bash
npm start
```

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/health` | Comprueba que la API está disponible |
| `GET` | `/tasks` | Obtiene todas las tareas |
| `GET` | `/tasks/:id` | Obtiene una tarea por ID |
| `POST` | `/tasks` | Crea una tarea |
| `PATCH` | `/tasks/:id` | Actualiza una tarea |
| `DELETE` | `/tasks/:id` | Elimina una tarea |

## Crear una tarea

Solicitud:

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Preparar demo de DevSecOps",
    "description": "Terminar endpoints y pruebas",
    "priority": "high"
  }'
```

Respuesta esperada:

```json
{
  "id": 1,
  "title": "Preparar demo de DevSecOps",
  "description": "Terminar endpoints y pruebas",
  "priority": "high",
  "completed": false
}
```

## Validación de datos

La API utiliza Zod para validar los datos antes de procesarlos.

Una tarea debe cumplir estas reglas:

- `title`: texto entre 3 y 100 caracteres.
- `description`: opcional, máximo 500 caracteres.
- `priority`: solo puede ser `low`, `medium` o `high`.
- Los IDs deben ser enteros positivos.
- No se aceptan campos inesperados.

Si los datos no cumplen estas reglas, la API devuelve `400 Bad Request`.

## Pruebas automatizadas

Ejecuta las pruebas de la API con:

```bash
npm test
```

Para consultar la cobertura de las pruebas:

```bash
npm run test:coverage
```

## Integración continua

GitHub Actions ejecuta las pruebas y una auditoría de dependencias cada vez que se abre un pull request o se envían cambios a `main`.

## Persistencia temporal

Actualmente las tareas se guardan en memoria. Esto significa que se perderán cuando el servidor se detenga o reinicie.

Esta decisión es intencional para la primera versión: permite concentrarse en el diseño de la API y las prácticas de DevSecOps antes de incorporar una base de datos.

## Próximos pasos

- Incorporar persistencia con una base de datos.
- Añadir autenticación y autorización.
- Publicar la API en un entorno de despliegue.
