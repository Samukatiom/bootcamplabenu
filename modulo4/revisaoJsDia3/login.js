const bills = [
	{
		email: "astrodev@labenu.com",
		password: "abc123"
	},
	{
		email: "bananinha@gmail.com",
		password: "bananinha"
	}
]

const [userAstrodev, userBananinha] = bills

let emails = []

const mapBills = bills.map((account) => {
    emails = [...emails, account.email]
})

// const verifyConts = (email, password) => {
//     if(typeof email !== "string" || typeof password !== "string") {
//         return {
//             error: true,
//             message: "ambos os parametros devem ser do tipo string"
//         }
//     } else if(!email.includes("@") || !email.includes(".")){
//         return {
//             error: true,
//             message: "O email deve ter '@' e '.'"
//         }
//     } else if(password.length < 6) {
//         return {
//             error: true,
//             message: "A senha deve ter no mínimo 6 caractere"
//         }
//     } else if (emails.includes(email)) {
//         return {
//             error: true,
//             message: "Este email já foi cadastrado, faça seu login"
//         }
//     }
//     else {
//         return "Usuários cadastrado "
//     }
// }

// as função a cima está comentada pois estava implementando uma lógica de cadastro e não de login

const login = (email, password) => {
    if(typeof email !== "string" || typeof password !== "string") {
        return {
            error: true,
            message: "ambos os parametros devem ser do tipo string"
        }
    } else if(!email.includes("@") || !email.includes(".")){
        return {
            error: true,
            message: "O email deve ter '@' e '.'"
        }
    } else if(password.length < 6) {
        return {
            error: true,
            message: "A senha deve ter no mínimo 6 caractere"
        }
    } else if(emails.includes(email) === false) {
        return "E-mail não cadastrado, revise o e-mail digitado, ou direcione-se para área de cadastro"

    } else if(email === userAstrodev.email) {
        if(password !== userAstrodev.password) {
            return "Senha incorreta"
        } else if(password === userAstrodev.password) {
            return "Login realizado com sucesso!"
        }
     }
     else if(email === userBananinha.email) {
        if(password !== userBananinha.password) {
            return "Senha incorreta"
        } else if(password === userBananinha.password) {
            return "Login realizado com sucesso!"
        }
     }
}

console.log(login("bananina@gmail.com", "bananina"))