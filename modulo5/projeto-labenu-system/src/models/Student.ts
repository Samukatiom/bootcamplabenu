interface IStudent {
    getId : () => string,
    getName : () => string,
    getEmail : () => string,
    getBirthdate : () => Date,
    getClassroomId: () => string,
    getHobbies: () => string[]
}

export interface IStudentsDB {
    id: string,
    name: string,
    email : string,
    birthdate : Date,
    classroom_id : string
}

export interface IHobbiesDB {
    id: string,
    title: string
}

export interface IStudentHobbiesDB {
    student_id: string,
    hobby_id: string
}

export class Student implements IStudent{
    constructor(
        private id: string,
        private name: string,
        private email : string,
        private birthdate : Date,
        private classroomId : string | null,
        private hobbies: string[]
    ) {}

    public getId() {
        return this.id
    }

    public getName() {
        return this.name
    }

    public getEmail() {
        return this.email
    }

    public getBirthdate () {
        return this.birthdate
    }

    public getClassroomId() {
        return this.classroomId
    }

    public getHobbies() {
        return this.hobbies
    }
}