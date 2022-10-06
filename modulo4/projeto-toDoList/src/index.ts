import express from "express";
import cors from "cors";
import { ping } from "./endpoints/ping";
import { getUsers } from "./endpoints/getUsers";
import { getTasks } from "./endpoints/getTasks";
import { getResponsibles } from "./endpoints/getResponsibles";
import { postAddResponsible } from "./endpoints/postAddResponsible";
import { editNickname } from "./endpoints/editNickname";
import { editStatusTasks } from "./endpoints/editStatusTaks";
import { deleteTask } from "./endpoints/deleteTask";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 3003, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
});

// Endpoint com o callback vindo por import da pasta endpoints
app.get("/ping", ping)

// Endpoint to get users or search them by id
app.get("/users", getUsers)

// Endpoint to get tasks or search them by name or nickname
app.get("/tasks", getTasks)

// Endpoint to get responsible for the task
app.get("/tasks/:taskId/users", getResponsibles)

// Endpoint to register a user for a task
// O enunciado sugeriu as entradas por params, mas achei mais viavel ter as duas entradas por body
app.post("/tasks/users", postAddResponsible)

// Endpoint to edit user nickname
app.put("/users/:userId", editNickname)

// Endpoint to change task status
app.put("/tasks/:taskId", editStatusTasks)

// Endpoint to delete a task
app.delete("/tasks/:taskId", deleteTask)