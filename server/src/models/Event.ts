import { Schema, model, Types } from "mongoose";

export interface IEvent {
    name: string,
    competition: Types.ObjectId,
    eventDate: Date,
    homeTeam: string,
    awayTeam: string,
    odds: Types.ObjectId[]
}

const eventSchema = new Schema({
    name: {type: String, required: true},
    competition: {type: Schema.Types.ObjectId, ref: "Competition", required: true},
    eventDate: {type: Date, required: true},
    homeTeam: {type: String, required: true},
    awayTeam: {type: String, required: true},
    odds: [{type: Schema.Types.ObjectId, ref: "Bet", required: true}]
}, {timestamps: true});

const Event = model<IEvent>("Event", eventSchema);
export default Event;