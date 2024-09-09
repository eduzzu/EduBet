import { IBet } from "./Bet"
import { ICompetition } from "./Competition"

export interface IEvent {
    _id: string
    name: string,
    competition: ICompetition
    eventDate: Date,
    homeTeam: string,
    awayTeam: string,
    odds: IBet[]
}