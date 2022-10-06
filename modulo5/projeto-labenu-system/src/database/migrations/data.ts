import { IClassroomDB } from "../../models/classroom";
import { IHobbiesDB, IStudentHobbiesDB, IStudentsDB } from "../../models/Student";

export const classrooms : IClassroomDB[] = [
    {id: "1", name: "Aragon", module: 5},
    {id: "2", name: "Barbosa", module: 2},
    {id: "3", name: "Franklin", module: 6},
    {id: "4", name: "Shaw", module: 0},
    {id: "5", name: "Williams", module: 0},
    {id: "6", name: "Johnson", module: 0},
    {id: "7", name: "Lamarr", module: 0},
    {id: "8", name: "Lovelace", module: 0},
    {id: "9", name: "Allen", module: 0},
]

export const students : IStudentsDB[] = [
    {id: "1", name: "Aragon", email:"teste1@teste.com", birthdate: new Date("1999/02/03"), classroom_id: "1"},
    {id: "2", name: "Barbosa", email:"teste2@teste.com", birthdate: new Date("1999/02/03"), classroom_id: "1"},
    {id: "3", name: "Franklin", email:"teste3@teste.com", birthdate: new Date("1999/02/03"), classroom_id: "1"},
    {id: "4", name: "Shaw", email:"teste4@teste.com", birthdate: new Date("1999/02/03"), classroom_id: "1"},
    {id: "5", name: "Williams", email:"teste5@teste.com", birthdate: new Date("1999/02/03"), classroom_id: "1"},
    {id: "6", name: "Johnson", email:"teste6@teste.com", birthdate: new Date("1999/02/03"), classroom_id: "1"},
    {id: "7", name: "Lamarr", email:"teste7@teste.com", birthdate: new Date("1999/02/03"), classroom_id: "1"},
    {id: "8", name: "Lovelace", email:"teste8@teste.com", birthdate: new Date("1999/02/03"), classroom_id: "1"},
    {id: "9", name: "Allen", email:"teste9@teste.com", birthdate: new Date("1999/02/03"), classroom_id: "1"},
]

export const hobbies : IHobbiesDB[] = [
    {id: "1", title: "Montar cubos magicos"},
    {id: "2", title: "Andar de bicicleta"},
    {id: "3", title: "Fazer projetos de robótica"},
    {id: "4", title: "Codar"},
    {id: "5", title: "Soltar pipa"},
    {id: "6", title: "Jogar games"},
    {id: "7", title: "Andar de skate"}
]

export const studentsHobbies : IStudentHobbiesDB[] = [
    {hobby_id: "1", student_id: "1"},
    {hobby_id: "1", student_id: "3"},
    {hobby_id: "2", student_id: "1"},
    {hobby_id: "3", student_id: "2"},
    {hobby_id: "3", student_id: "6"},
    {hobby_id: "3", student_id: "7"}
]