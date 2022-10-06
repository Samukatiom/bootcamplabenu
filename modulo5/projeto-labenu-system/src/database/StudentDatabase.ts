import { IStudentsDB } from "../models/Student";
import { BaseDatabase } from "./BaseDatabase";
import { ClassroomDatabase } from "./ClassroomDatabase";

export class StudentDatabase extends BaseDatabase {
    public static TABLE_STUDENTS = 'Labe_Students'
    public static TABLE_HOBBIES = "Labe_Hobbies"
    public static TABLE_STUDENTS_HOBBIES = "Students_Hobbies"

    public async createStudent(studend: IStudentsDB) {

        const checkExistenceOfEmail = await BaseDatabase
            .connection(StudentDatabase.TABLE_STUDENTS)
            .select()
            .where("email", "=", `${studend.email}`)
        if(checkExistenceOfEmail.length !== 0){
            throw new Error("Este email já foi cadastrado!");
        }

        const checkExistenceOfClassroomId = await BaseDatabase
            .connection(ClassroomDatabase.TABLE_CLASSROOMS)
            .select()
            .where("id", "=", `${studend.classroom_id}`)
        if(checkExistenceOfClassroomId.length === 0){
            throw new Error("Classe não encontrada!");
        }

        await BaseDatabase
            .connection(StudentDatabase.TABLE_STUDENTS)
            .insert(studend)
    } 

    public async searchStudentByName(query: string) {

        const result = await BaseDatabase
            .connection(StudentDatabase.TABLE_STUDENTS)
            .select()
            .where("name", "LIKE", `%${query}%`)

        return result
    }

    public async editStudentSClassroom(id: string, classroomId: string) {

        
        const checkExistenceStudentById = await BaseDatabase
            .connection(StudentDatabase.TABLE_STUDENTS)
            .select()
            .where("id", "=", `${id}`)
        if(checkExistenceStudentById.length === 0){
            throw new Error("Estudante não encontrado!");
        }

        const checkExistenceOfClassroomId = await BaseDatabase
            .connection(ClassroomDatabase.TABLE_CLASSROOMS)
            .select()
            .where("id", "=", `${classroomId}`)
        if(checkExistenceOfClassroomId.length === 0){
            throw new Error("Classe não encontrada!");
        }
        await BaseDatabase
            .connection(StudentDatabase.TABLE_STUDENTS)
            .update({classroom_id : classroomId})
            .where({id})
    }

    public async getStudentsByClassroom(classroomId: string) {

        const result = await BaseDatabase
            .connection(StudentDatabase.TABLE_STUDENTS)
            .select("id", "name", "email")
            .where(`${StudentDatabase.TABLE_STUDENTS}.classroom_id`, "=", `${classroomId}`)
        
        return result
    }
}