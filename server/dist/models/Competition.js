import { Schema, model } from "mongoose";
;
const competitionSchema = new Schema({
    country: { type: String, required: true },
    name: { type: String, required: true },
    events: [{ type: Schema.Types.ObjectId, ref: "Event", default: [] }]
}, { timestamps: true });
const Competition = model("Competition", competitionSchema);
export default Competition;
