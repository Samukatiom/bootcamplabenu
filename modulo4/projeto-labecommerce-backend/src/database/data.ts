import { Product } from "../models/Product";
import { User } from "../models/User";

export const users : User[] = [
    {id: "1", email: "brutos@gmail.com", password: "homelandCaptain"},
    {id: "2", email: "orwell@gmail.com", password: "bigbrother"},
    {id: "3", email: "sheldon@gmail.com", password: "ImGenius"},
    {id: "4", email: "casemiro@gmail.com", password: "meteuEssa?"}
]

export const products : Product[] = [
    {id: "1" , name: "Hamburguer de costela 100g - Com molho da Casa", price: 30},
    {id: "2" , name: "Pizza grande", price: 55.90},
    {id: "3" , name: "Dogão de frango com requeijão", price: 20},
    {id: "4" , name: "Burguer classico", price: 25.90}
]