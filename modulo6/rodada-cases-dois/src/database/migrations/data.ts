import { ProductsDB, ProductsTagsDB, TagsDB } from "../../models/Products"
import { UserDB, ProductUserDB, USER_ROLES } from "../../models/Users"

export const products : ProductsDB[] = [
    {
        id: "8371",
        name: "VESTIDO TRICOT CHEVRON"
    },
    {
        id: "8367",
        name: "VESTIDO MOLETOM COM CAPUZ MESCLA"
    },
    {
        id: "8363",
        name: "VESTIDO CURTO MANGA LONGA LUREX"
    }
]

export const tags: TagsDB[] = [
    {
        id: "101",
        name: "balada"
    },
    {
        id: "102",
        name: "neutro"
    },
    {
        id: "103",
        name: "delicado"
    },
    {
        id: "104",
        name: "festa"
    },
    {
        id: "105",
        name: "casual"
    },
    {
        id: "106",
        name: "metal"
    },
    {
        id: "107",
        name: "colorido"
    },
    {
        id: "108",
        name: "estampas"
    },
    {
        id: "109",
        name: "passeio"
    }
]

export const productsTags: ProductsTagsDB[] = [
    {
        id: "201",
        product_id: "8371",
        tag_id: "101"
    },
    {
        id: "202",
        product_id: "8371",
        tag_id: "102"
    },
    {
        id: "203",
        product_id: "8371",
        tag_id: "103"
    },
    {
        id: "204",
        product_id: "8371",
        tag_id: "104"
    },
    {
        id: "205",
        product_id: "8367",
        tag_id: "105"
    },
    {
        id: "206",
        product_id: "8367",
        tag_id: "106"
    },
    {
        id: "207",
        product_id: "8363",
        tag_id: "107"
    },
    {
        id: "208",
        product_id: "8363",
        tag_id: "106"
    },
    {
        id: "209",
        product_id: "8363",
        tag_id: "103"
    },
    {
        id: "210",
        product_id: "8363",
        tag_id: "108"
    },
    {
        id: "211",
        product_id: "8363",
        tag_id: "109"
    }
]

export const users: UserDB[] = [
    {
        id: "1",
        name: "Samuel Araujo",
        email: "saraujo@gmail.com",
        password: "$2a$12$RBAWOHpUvGTE.MEeIohAzec9tlVqtNA/x2PMPt/Hrt0vI437cQdJC", //bananinha
        role: USER_ROLES.ADMIN
    },
    {
        id: "2",
        name: "Emy Araujo",
        email: "emy@gmail.com",
        password: "$2a$12$PULtVNlAll87D6E8pR/0HO9vbzVDPaUMA89rc5cNmYoAAepbwmkcO", // qwerty00
        role: USER_ROLES.NORMAL
    },
    {
        id: "3",
        name: "Vic Araujo",
        email: "vic@gmail.com",
        password: "$2a$12$LkWMqS3oPhP2iVMcZOVvWer9ahUPulxjB0EA4TWPxWaRuEEfYGu/i", // asdfg123
        role: USER_ROLES.NORMAL
    },
]