import { Schema, model, Types } from "mongoose";

export interface IBettingTicket {
    userId: Types.ObjectId;
    selections: Array<{
        eventId: Types.ObjectId;
        odds: number;
        status: string
    }>;
    totalOdd: number;
    stake: number;
    potentialWin?: number;       
    status: string;
}

const bettingTicketSchema = new Schema<IBettingTicket>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    selections: [{
        eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
        odds: { type: Number, required: true },
        status: {type: String, default: "Active", required: true, enum: ["Active", "Won", "Lost"]}
    }],
    totalOdd: { type: Number, required: true, default: 1 },
    stake: { type: Number, required: true },
    potentialWin: { type: Number },
    status: { type: String, required: true, default: "Active", enum:["Active", "Won", "Lost"] }
}, { timestamps: true });

const BettingTicket = model<IBettingTicket>("BettingTicket", bettingTicketSchema);
export default BettingTicket;
