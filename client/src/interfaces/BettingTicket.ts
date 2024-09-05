export interface IBettingTicket {
    userId: string;
    selections: Array<{
        eventId: string;
        odds: number;
        status: string
    }>;
    totalOdd: number;
    stake: number;
    potentialWin?: number;       
    status: string;
}