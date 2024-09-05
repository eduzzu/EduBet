import { IBet } from "./Bet"
import { ICompetition } from "./Competition"

export interface IEvent {
    name: string,
    competition: ICompetition
    eventDate: Date,
    homeTeam: string,
    awayTeam: string,
    odds: IBet[]
}