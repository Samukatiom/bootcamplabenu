import { Request, Response } from "express";
import { ClassroomDatabase } from "../database/ClassroomDatabase";
import { Classroom, IClassroomDB } from "../models/Classroom";

export class ClassroomController {
    public async createClassroom(req: Request, res: Response) {
        let errorCode = 400
        try {
            const {name, module} = req.body

            if(!name) {
                errorCode = 404
                throw new Error("O parametro 'name' veio vazio!'");
            }
            if(!module) {
                errorCode = 404
                throw new Error("O parametro 'module' veio vazio!'");
            }
            
            if(typeof name !== "string") {
                errorCode = 406
                throw new Error("O paramentro 'name' deve ser do tipo string!");
            }
            if(typeof module !== "number") {
                errorCode = 406
                throw new Error("O paramentro 'module' deve ser do tipo number!");
            }

            if(name.length < 4) {
                errorCode = 406
                throw new Error("A propriedade 'name' deve ter ao menos 4 caracteres.")
            }

            if(module !== 0 && module !== 1 && module !== 2 && module !== 3 && module !== 4 && module !== 5 && module !== 6) {
                errorCode = 404
                throw new Error("'module' pode receber apenas números de 0 a 6");
            }

            const classroom = new Classroom(
                Date.now().toString(),
                name,
                [],
                module
            )

            const classroomDB : IClassroomDB = {
                id: classroom.getId(),
                name: classroom.getName(),
                module: classroom.getModule()
            } 


            const classroomDatabase = new ClassroomDatabase()
            await classroomDatabase.createClassroom(classroomDB)

            res.status(201).send({message: "Turma criada com sucesso!"})
        } catch (error) {
            res.status(errorCode).send({message: error.message})
        }
    }
    
    public async getClassroomActive(req: Request, res: Response) {
        let errorCode = 400
        try {
            const classroomDatabase = new ClassroomDatabase()
            const result = await classroomDatabase.getClassroomActive()

            res.status(200).send({result})
        } catch (error) {
            res.status(errorCode).send({message: error.message})
        }
    }

    public async editClassroomModule(req: Request, res: Response) {
        let errorCode = 400
        try {
            const id = req.params.id
            const module = req.body.module

            if(!id) {
                errorCode = 404
                throw new Error("O parametro 'name' veio vazio!'");
            }
            if(!module) {
                errorCode = 404
                throw new Error("O parametro 'module' veio vazio!'");
            }
            
            if(typeof module !== "number") {
                errorCode = 406
                throw new Error("O paramentro 'module' deve ser do tipo number!");
            }
            const classroomDatabase = new ClassroomDatabase()
            await classroomDatabase.editClassroomModule(id, module)

            res.status(201).send({message: "Modulo alterado com sucesso!"})
        } catch (error) {
            res.status(errorCode).send({message: error.message})
        }
    }
}