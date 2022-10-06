import express from "express";
import cors from "cors";
import { ping } from "./endpoints/ping";
import { createPerfume } from "./endpoints/createPerfume";
import { getPerfumes } from "./endpoints/getPerfumes";
import { editPerfumes } from "./endpoints/editPerfumes";
import { deletePerfumes } from "./endpoints/deletePerfumes";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 3003, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
});

app.get("/ping", ping)

// Implemente seus endpoints abaixo

// Create perfume
app.post("/perfumes", createPerfume)

// Get perfumes
app.get("/perfumes", getPerfumes)

// Edit perfumes
app.put("/perfumes/:id", editPerfumes)

// Delete perfumes
app.delete("/perfumes/:id", deletePerfumes)
