import { Schema, model } from "mongoose";
const bettingTicketSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    selections: [{
            eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
            odds: { type: Number, required: true },
            status: { type: String, default: "Active", required: true, enum: ["Active", "Won", "Lost"] }
        }],
    totalOdd: { type: Number, required: true, default: 1 },
    stake: { type: Number, required: true },
    potentialWin: { type: Number },
    status: { type: String, required: true, default: "Active", enum: ["Active", "Won", "Lost"] }
}, { timestamps: true });
const BettingTicket = model("BettingTicket", bettingTicketSchema);
export default BettingTicket;
