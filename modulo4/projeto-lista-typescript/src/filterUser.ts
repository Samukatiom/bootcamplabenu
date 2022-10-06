type TypeUser = {
    name: string,
    email: string,
    role: string
}

const users: TypeUser[] = [
	{name: "Rogério", email: "roger@email.com", role: "user"},
	{name: "Ademir", email: "ademir@email.com", role: "admin"},
	{name: "Aline", email: "aline@email.com", role: "user"},
	{name: "Jéssica", email: "jessica@email.com", role: "user"},  
	{name: "Adilson", email: "adilson@email.com", role: "user"},  
	{name: "Carina", email: "carina@email.com", role: "admin"}      
]

const filterUser = (users: TypeUser[]): string[] => {
    const listFilter : TypeUser[] = users.filter((user: TypeUser) => {
        const condition = user.role === "admin"
            return condition
    })
    const mapListFilter = listFilter.map((user : TypeUser) => {
        return user.email
    })
    return mapListFilter
}


console.log(filterUser(users))