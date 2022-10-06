export type Users = {
    id: number ,
    name: string,
    phone: string,
    email: string
}

export type Chores = {
    userId: number, // usuário que é resposável pelo afazer
    id: number, // id de um afazer da lista
    title: string, // titulo do afazer
    completed: boolean // status do afazer altenado entre true ou false
}

export let users: Users[] = [
    {
        id: 1,
        name: "Samuel Araujo",
        phone: "41 1231-12344",
        email: "saraujo@teste.com"
    },
    {
        id: 2,
        name: "Amabile Araujo Pianaro",
        phone: "41 3213-12144",
        email: "amabile@teste.com"
    },
    {
        id: 3,
        name: "Benicio Araujo Pianaro",
        phone: "41 9999-12344",
        email: "beni@teste.com"
    }

]

export let chores: Chores[]= [
    {userId: 1, id: 1, title:"Revisar o Front", completed: true},
    {userId: 1, id: 2, title:"Fazer macarrão", completed: false},
    {userId: 2, id: 3, title:"Fazer as tarefas na faculdade", completed: false},
    {userId: 2, id: 4, title:"Descançar após a tarefa", completed: false},
    {userId: 3, id: 5, title:"Lavar a louça", completed: true},
    {userId: 3, id: 6, title:"Fazer o dever de casa", completed: true}
]