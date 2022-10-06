import { IClassroomDB } from "../models/Classroom";
import { BaseDatabase } from "./BaseDatabase";

export class ClassroomDatabase extends BaseDatabase {
    public static TABLE_CLASSROOMS = 'Labe_Classrooms'

    public async createClassroom(classroom : IClassroomDB) {

        await BaseDatabase
            .connection(ClassroomDatabase.TABLE_CLASSROOMS)
            .insert(classroom)
    }

    public async getClassroomActive() {

        const result = await BaseDatabase
            .connection(ClassroomDatabase.TABLE_CLASSROOMS)
            .select()
            .where("module", "<>" , 0)
        
        return result
    }

    public async editClassroomModule(id: string, module: number) {

        const checkExistenceOfClassroomId = await BaseDatabase
        .connection(ClassroomDatabase.TABLE_CLASSROOMS)
        .select()
        .where("id", "=", `${id}`)
    if(checkExistenceOfClassroomId.length === 0){
        throw new Error("Classe não encontrada!");
    }

        await BaseDatabase
            .connection(ClassroomDatabase.TABLE_CLASSROOMS)
            .update({module})
            .where({id})
    }
}