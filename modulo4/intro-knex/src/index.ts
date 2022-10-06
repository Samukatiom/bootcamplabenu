import express, { Request, Response } from "express";
import cors from "cors";
import connection from "./database/connection";
import { Employee } from "./types";

const app = express();

app.use(express.json());
app.use(cors());

// Endpoint to fetch users from the database. If no query is passed, returns all users;
app.get('/employees', async(req: Request, res: Response) => {
let errorCode = 400
try {
  const search = req.query.search as string // Determining for the TS that it becomes a string to be able to use the toLowerCase() method;
  if(search) {
    const [ employees ] = await connection.raw(`
      SELECT * FROM Employees
      WHERE LOWER(name) LIKE "%${search.toLowerCase()}%"
    `)// Above I used LOWER() a native SQL function, to make the search result all lowercase
    const searchEmployees = employees[0]
    if(!searchEmployees) {
      errorCode = 404
      throw new Error("O funcionário não consta no banco de dados");
    }
    return res.status(200).send({message: "Pesquisa realizada com sucesso", employees})
  }
  const [ employees ] = await connection.raw(`
    SELECT * FROM Employees;
  `)
  res.status(200).send({message: "Funcionários encontrados com sucesso", employees})
} catch (error) {
  if(error.statusCode == 200) {
    res.status(500).end()
  }else {
    res.status(errorCode).send({ message: error.message })
  }
}
})

// Endpoint for registering a new employee 
app.post('/employees', async(req: Request, res: Response) =>{
  let errorCode = 400
  try {
    const {name, email} = req.body
    // input validations
    if(!name) {
      errorCode = 406
      throw new Error("A propriedade 'name' veio vazia");
    }
    if(!email) {
      errorCode = 406
      throw new Error("A propriedade 'email' veio vazia");
    }
    if(typeof name !== "string") {
      errorCode = 406
      throw new Error("A propriedade 'name' deve ser do tipo 'string'");
    }
    if(typeof email !== "string") {
      errorCode = 406
      throw new Error("A propriedade 'email' deve ser do tipo 'string'");
    }
    if(!email.includes('@')) {
      errorCode = 406
      throw new Error("'email' deve conter '@'");
    }
    if(!email.includes('.')) {
      errorCode = 406
      throw new Error("'email' deve conter '.'(ponto)");
    }
    // business rules
    const [ emails ] = await connection.raw(`
    SELECT * FROM Employees
    WHERE LOWER(email) LIKE "%${email.toLowerCase()}%"
    `)
    const checkEmails = emails[0]
    // console.log(checkEmails)
    if(checkEmails !== undefined) {
      errorCode = 401
      throw new Error("Cadastro não autorizado, o email fornecido já esta em uso.");
    }
    if(name.length < 4) {
      errorCode = 406
      throw new Error("A propriedade 'name' deve ter pelo menos 4 caracteres");
    }
    const newEmployee : Employee = {
      id: Date.now().toString(),
      name,
      email
    }
    await connection.raw(`
      INSERT INTO Employees (id, name, email)
      VALUES ("${newEmployee.id}","${newEmployee.name}","${newEmployee.email}");
    `)
    res.status(201).send({message: "Funcionário cadastrado com sucesso!", newEmployee})
  } catch (error) {
    if(error.statusCode == 200) {
      res.status(500).end()
    }else {
      res.status(errorCode).send({ message: error.message })
    }
  }
})
// Endpoint to edit user email
app.put('/employees/:id', async(req: Request, res: Response) => {
  let errorCode = 400
  try {
    const id = req.params.id
    const email = req.body.email
    // input validations
    if(!email) {
      errorCode = 406
      throw new Error("A propriedade 'email' veio vazia");
    }
    if(typeof email !== "string") {
      errorCode = 406
      throw new Error("A propriedade 'email' deve ser do tipo 'string'");
    }
    if(!email.includes('@')) {
      errorCode = 406
      throw new Error("'email' deve conter '@'");
    }
    if(!email.includes('.')) {
      errorCode = 406
      throw new Error("'email' deve conter '.'(ponto)");
    }
    // business rules
    const [ employees ]  = await connection.raw(`
    SELECT * FROM Employees
    WHERE id LIKE "%${id}%"
    `)
    const checkId = employees[0]
    if(checkId === undefined) {
      errorCode = 404
      throw new Error("Id não encontrada.");
    }
    const [ emails ] = await connection.raw(`
    SELECT * FROM Employees
    WHERE LOWER(email) LIKE "%${email.toLowerCase()}%"
    `)
    const checkEmails = emails[0]
    if(checkEmails !== undefined) {
      errorCode = 401
      throw new Error("O email fornecido já esta em uso.");
    }
    await connection.raw(`
      UPDATE Employees
      SET email = "${email}"
      WHERE id = "${id}";
    `)
    res.status(201).send({message: "Email atualizado com sucesso", email})

  } catch (error) {
    if(error.statusCode == 200) {
      return res.status(500).end()
    }else {
      return res.status(errorCode).send({ message: error.message })
    }
  }
})

// Endpoint for terminating an employee
app.delete('/employees/:id', async (req: Request, res: Response) => {
  let errorCode = 400
  try {
    const id = req.params.id
    // business rules
    const [employees] = await connection.raw(`
    SELECT * FROM Employees
    WHERE id = "${id}"
    `)
    const checkId = employees[0]
    if (!checkId) {
      throw new Error("Id não encontrado");
    }
    await connection.raw(`
    DELETE FROM
    Employees
    WHERE
      id = "${id}";	
    `)
    res.status(201).send({ message: "Funcionário excluido com sucesso!", employee: employees })
  } catch (error) {
    if(error.statusCode == 200) {
      return res.status(500).end()
    }else {
      return res.status(errorCode).send({ message: error.message })
    }
  }
})

app.listen(process.env.PORT || 3003, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
});