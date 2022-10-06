import { inputReservation, IShowDB, ITicketDB, Show } from "../models/Show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase {
    public static TABLE_SHOWS = "Lama_Shows"
    public static TABLE_TICKETS = "Lama_Tickets"

    public toShowDBModel = (show: Show) => {
        const showDB: IShowDB = {
            id: show.getId(),
            band: show.getBand(),
            starts_at: show.getStartsAt()
        }

        return showDB
    }

    public create = async (show: Show) => {
        await BaseDatabase
            .connection(ShowDatabase.TABLE_SHOWS)
            .insert(this.toShowDBModel(show))
    }

    public getAll = async () => {
        const showDB: IShowDB[] = await BaseDatabase
            .connection(ShowDatabase.TABLE_SHOWS)

        return showDB
    }

    public getShowById = async (id: string): Promise<IShowDB | undefined> => {
        const showDB: IShowDB[] = await BaseDatabase
            .connection(ShowDatabase.TABLE_SHOWS)
            .where({ id })

        return showDB[0]
    }

    public getTicktByUserIdAndShowId = async (reservation: inputReservation): Promise<ITicketDB | undefined> => {
        const ticketsDB: ITicketDB[] = await BaseDatabase
            .connection(ShowDatabase.TABLE_TICKETS)
            .where({ user_id: reservation.userId })
            .andWhere({ show_id: reservation.showId})

        return ticketsDB[0]
    }

    public findByDate = async (date: Date): Promise<IShowDB | undefined> => {
        const showDB: IShowDB[] = await BaseDatabase
            .connection(ShowDatabase.TABLE_SHOWS)
            .where({ starts_at: date })

        return showDB[0]
    }

    public getReservedTickets = async (showId: string): Promise<number | undefined> => {
        const tickets = await BaseDatabase
            .connection(ShowDatabase.TABLE_TICKETS)
            .count("id AS amount")
            .where({ show_id: showId })

        return tickets[0].amount as number
    }

    public bookTicket = async (reservation: ITicketDB) => {
        await BaseDatabase
            .connection(ShowDatabase.TABLE_TICKETS)
            .insert(reservation)
    }

    public deleteReservation = async (reservation: inputReservation) => {
        await BaseDatabase
            .connection(ShowDatabase.TABLE_TICKETS)
            .delete()
            .where({ show_id: reservation.showId })
            .andWhere({ user_id: reservation.userId })
    }
}