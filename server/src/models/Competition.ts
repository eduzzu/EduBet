import { Schema, model, Types } from "mongoose";

export interface ICompetition {
    country: string,
    name: string,
    events?: Types.ObjectId[]
};

const competitionSchema = new Schema({
    country: {type: String, required: true},
    name: {type: String, required: true},
    events: [{type: Schema.Types.ObjectId, ref: "Event", default: []}]
}, {timestamps: true})

const Competition = model<ICompetition>("Competition", competitionSchema);
export default Competition;