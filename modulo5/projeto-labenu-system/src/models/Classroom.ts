interface IClassroom {
    getId : () => string,
    getName : () => string,
    getStudents : () => string[],
    getModule : () => number,
}
export interface IClassroomDB {
    id : string,
    name : string,
    module : number
}

export class Classroom implements IClassroom{
    constructor(
        private id: string,
        private name: string,
        private students: string[],
        private module: number
    ) {}

    public getId() {
        return this.id
    }

    public getName() {
        return this.name
    }

    public getModule() {
        return this.module
    }

    public getStudents() {
        return this.students
    }
}