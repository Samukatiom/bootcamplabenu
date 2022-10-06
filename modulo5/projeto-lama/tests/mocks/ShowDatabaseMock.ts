import { BaseDatabase } from "../../src/database/BaseDatabase"
import { Show, IShowDB, ITicketDB, inputReservation } from "../../src/models/Show"

export class ShowDatabaseMock extends BaseDatabase {
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

    }

    public getAll = async () => {

        const showDB: IShowDB[] = [
            {
                id: "201",
                band: "Foo Fighters",
                starts_at: new Date("2022/12/05")
            },
            {
                id: "202",
                band: "System of a Down",
                starts_at: new Date("2022/12/06")
            },
            {
                id: "203",
                band: "Evanescence",
                starts_at: new Date("2022/12/07")
            }
        ]

        return showDB
    }

    public getShowById = async (id: string): Promise<IShowDB | undefined> => {
        switch (id) {
            case "201":
                return {
                    id: "201",
                    band: "Foo Fighters",
                    starts_at: new Date("2022/12/05")
                }
            default:
                return undefined
        }
    }

    public getTicktByUserIdAndShowId = async (reservation: inputReservation): Promise<ITicketDB | undefined> => {
        switch (reservation.userId + reservation.showId) {
            case "101" + "201":
                return {
                    id: "301",
                    show_id: "201",
                    user_id: "101"
                } as ITicketDB
            default:
                return undefined
        }
    }

    public findByDate = async (date: Date): Promise<IShowDB | undefined> => {
        switch (date.getDate()) {
            case 7:
                return {
                    id: "203123",
                    band: "Evanescence",
                    starts_at: new Date("2022/12/07")
                }
            default:
                return undefined
        }
    }

    public getReservedTickets = async (showId: string): Promise<number | undefined> => {

        switch (showId) {
            case "201":
                return 3
            default:
                return undefined
        }
    }

    public bookTicket = async (reservation: ITicketDB) => {

    }

    public deleteReservation = async (reservation: any) => {

    }
}