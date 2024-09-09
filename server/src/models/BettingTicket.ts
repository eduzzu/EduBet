import { Schema, model, Types } from "mongoose";

export interface IBettingTicket {
    userId: Types.ObjectId;
    selections: Array<{
        eventId: Types.ObjectId;
        odd: number;
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
        eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true, unique: true },
        odd: { type: Number, required: true },
        status: {type: String, default: "Unset", required: true, enum: ["Active", "Won", "Lost", "Unset"]}
    }],
    totalOdd: { type: Number, required: true, default: 1 },
    stake: { type: Number, required: true },
    potentialWin: { type: Number },
    status: { type: String, required: true, default: "Unset", enum:["Active", "Won", "Lost", "Unset"] }
}, { timestamps: true });

const BettingTicket = model<IBettingTicket>("BettingTicket", bettingTicketSchema);
export default BettingTicket;
