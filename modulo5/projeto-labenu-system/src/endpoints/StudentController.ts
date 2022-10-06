import { Request, Response } from "express";
import { StudentDatabase } from "../database/StudentDatabase";
import { IStudentsDB, Student } from "../models/Student";

export class StudentController {
    public async createStudent(req: Request, res: Response) {
        let errorCode = 400
        try {
            const {name, email, birthdate, classroomId} = req.body

            if(!name) {
                errorCode = 404
                throw new Error("O parametro 'name' veio vazio!'");
            }
            if(!email) {
                errorCode = 404
                throw new Error("O parametro 'email' veio vazio!'");
            }
            if(!birthdate) {
                errorCode = 404
                throw new Error("O parametro 'birthdate' veio vazio!'");
            }
            if(!classroomId) {
                errorCode = 404
                throw new Error("O parametro 'classroomId' veio vazio!'");
            }

            if(typeof name !== "string") {
                errorCode = 406
                throw new Error("O paramentro 'name' deve ser do tipo string!");
            }
            if(typeof email !== "string") {
                errorCode = 406
                throw new Error("O paramentro 'email' deve ser do tipo string!");
            }
            // if(typeof birthdate !== "") {
            //     errorCode = 406
            //     throw new Error("O paramentro 'birthdate' deve ser do tipo Date!"); não consegui realizar esta validação
            // }
            if(typeof classroomId !== "string") {
                errorCode = 406
                throw new Error("O paramentro 'classroomId' deve ser do tipo string!");
            }

            if(name.length < 4) {
                errorCode = 406
                throw new Error("A propriedade 'name' deve ter ao menos 4 caracteres.")
            }
            if(birthdate.length !== 10) {
                errorCode = 406
                throw new Error("A propriedade 'birthdate' deve ter 10 caracteres ")
            }

            if(!email.includes('@')) {
                errorCode = 406
                throw new Error("'email' deve conter '@'.");
            }
            if(!email.includes('.')) {
                errorCode = 406
                throw new Error("'email' deve conter '.'(ponto).");
            }

            const student = new Student(
                Date.now().toString(),
                name,
                email,
                birthdate,
                classroomId,
                []
            )
            // console.log(student.getClassroomId())

            const studentDB : IStudentsDB = {
                id: student.getId(),
                name: student.getName(),
                email: student.getEmail(),
                birthdate: student.getBirthdate(),
                classroom_id: student.getClassroomId()
            }

            const studentDatabase = new StudentDatabase()
            await studentDatabase.createStudent(studentDB)

            res.status(201).send({message: "Estudante cadastrado com sucesso!"})
        } catch (error) {
            res.status(errorCode).send({message: error.message})
        }
    }

    public async searchStudentByName(req: Request, res: Response) {
        let errorCode = 400
        try {
            const query = req.params.q
            // console.log(query)

            const studentDatabase = new StudentDatabase()
            const result = await studentDatabase.searchStudentByName(query)

            res.status(200).send({result})
        } catch (error) {
            res.status(errorCode).send({message: error.message})
        }
    }

    public async editStudentSClassroom(req: Request, res: Response) {
        let errorCode = 400
        try {
            const classroomId = req.body.classroomId
            const id = req.params.id

            if(!classroomId) {
                errorCode = 404
                throw new Error("O parametro 'classroomId' veio vazio!'");
            }
            if(!id) {
                errorCode = 404
                throw new Error("O parametro 'id' veio vazio!'");
            }

            if(typeof classroomId !== "string") {
                errorCode = 406
                throw new Error("O paramentro 'classroomId' deve ser do tipo string!");
            }
            if(typeof id !== "string") {
                errorCode = 406
                throw new Error("O paramentro 'id' deve ser do tipo string!");
            }
            
            const studentDatabase = new StudentDatabase()
            await studentDatabase.editStudentSClassroom(id, classroomId)
             
            res.status(200).send({message: "Estudante remanejado com sucesso!"})
        } catch (error) {
            res.status(errorCode).send({message: error.message})
        }
    }

    public async getStudentsByClassroom(req: Request, res: Response) {
        let errorCode = 400
        try {
            const classroomId = req.params.id

            const studentDatabase = new StudentDatabase()
            const result = await studentDatabase.getStudentsByClassroom(classroomId)
             
            res.status(200).send({result})
        } catch (error) {
            res.status(errorCode).send({message: error.message})
        }
    }
}