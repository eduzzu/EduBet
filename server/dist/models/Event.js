import { Schema, model } from "mongoose";
const eventSchema = new Schema({
    name: { type: String, required: true },
    competition: { type: Schema.Types.ObjectId, ref: "Competition", required: true },
    eventDate: { type: Date, required: true },
    homeTeam: { type: String, required: true },
    awayTeam: { type: String, required: true },
    odds: [{ type: Schema.Types.ObjectId, ref: "Bet", required: true }]
}, { timestamps: true });
const Event = model("Event", eventSchema);
export default Event;
