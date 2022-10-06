import { ShowDatabase } from "../database/ShowDatabase"
import { ConflictError } from "../errors/ConflictError"
import { NotFoundError } from "../errors/NotFoundError"
import { RequestError } from "../errors/RequestError"
import { UnauthorizedError } from "../errors/UnauthorizedError"
import { inputBookOrDeleteTicket, inputCreateShow, inputReservation, IShowDB, ITicketDB, outputCreateOrGetShow, Show } from "../models/Show"
import { USER_ROLES } from "../models/User"
import { Authenticator, ITokenPayload } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"

export class ShowBusiness {
    constructor(
        private showDatabase: ShowDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) { }

    public create = async (input: inputCreateShow) => {
        const { token, band, startsAt } = input

        const payload: ITokenPayload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new UnauthorizedError("Não autenticado")
        }

        if (payload.role !== USER_ROLES.ADMIN) {
            throw new UnauthorizedError("Apenas usuários admins podem criar shows")
        }

        if (new Date(startsAt) < new Date("2022/12/05")) {
            throw new RequestError("A data não pode ser anterior ao inicio do festival")
        }

        if (await this.showDatabase.findByDate(startsAt)) {
            throw new RequestError("Data indisponivel")
        }

        const show = new Show(
            this.idGenerator.generate(),
            band,
            startsAt
        )

        await this.showDatabase.create(show)

        const showsDB: IShowDB[] = await this.showDatabase.getAll()

        const result: outputCreateOrGetShow = {
            message: "Show cadastrado com sucesso",
            shows: showsDB
        }

        return result
    }

    public getAll = async (showId?: string) => {
        if(showId) {
            const showDB: IShowDB = await this.showDatabase.getShowById(showId)
            const show = new Show(showDB.id, showDB.band, showDB.starts_at)

            const reserverTickets: number = await this.showDatabase.getReservedTickets(show.getId())

            show.setTickets(5000 - reserverTickets)

            return {
                message: "Shows encontrados com sucesso",
                show
            }

        }
        const showsDB: IShowDB[] = await this.showDatabase.getAll()

        const shows = showsDB.map((showDB) => {
            return new Show(showDB.id, showDB.band, showDB.starts_at)
        })

        for (let show of shows) {
            const idShow = show.getId()
            const reserverTickets: number = await this.showDatabase.getReservedTickets(idShow)

            show.setTickets(5000 - reserverTickets)
        }

        return {
            message: "Shows encontrados com sucesso",
            shows
        }
    }

    public bookTicket = async (input: inputBookOrDeleteTicket) => {
        const { token, showId } = input

        const payload: ITokenPayload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new UnauthorizedError("Não autenticado")
        }

        if (!await this.showDatabase.getShowById(showId)) {
            throw new NotFoundError("Show inexistente")
        }

        if (await this.showDatabase.getTicktByUserIdAndShowId({ userId: payload.id, showId })) {
            throw new ConflictError("O usuário pode reservar apenas um ingresso por show")
        }

        if ((await this.getAll(showId)).show.getTickets() < 0) {
            throw new ConflictError("Ingressos esgotados")
        }

        const reservation: ITicketDB = {
            id: this.idGenerator.generate(),
            show_id: showId,
            user_id: payload.id
        }

        await this.showDatabase.bookTicket(reservation)

        return { message: "Ingresso reservado" }
    }

    public deleteReservation = async (input: inputBookOrDeleteTicket) => {
        const { token, showId } = input

        const payload: ITokenPayload = this.authenticator.getTokenPayload(token)

        const reservation: inputReservation = {
            showId,
            userId: payload.id
        }

        if(!await this.showDatabase.getShowById(showId)) {
            throw new ConflictError("Show inexistente")
        }

        if(!await this.showDatabase.getTicktByUserIdAndShowId(reservation)){
            throw new ConflictError("Ingresso não reservado")
        }

        await this.showDatabase.deleteReservation(reservation)

        return { message: "Reserva de ingresso desfeita" }
    }
}