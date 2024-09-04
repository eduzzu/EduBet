import { Schema, model } from "mongoose";
const betSchema = new Schema({
    event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    odds: {
        "1x2": {
            homeWin: { type: Number, required: true },
            draw: { type: Number, required: true },
            awayWin: { type: Number, required: true }
        },
        "double chance": {
            homeOrDraw: { type: Number, required: true },
            awayOrDraw: { type: Number, required: true },
            noDraw: { type: Number, required: true }
        },
        "gg/ngg": {
            gg: { type: Number, required: true },
            ngg: { type: Number, required: true }
        },
        "under/over": {
            under: {
                1: { type: Number, required: true },
                2: { type: Number, required: true },
                3: { type: Number, required: true },
                4: { type: Number, required: true },
                5: { type: Number, required: true },
            },
            over: {
                1: { type: Number, required: true },
                2: { type: Number, required: true },
                3: { type: Number, required: true },
                4: { type: Number, required: true },
                5: { type: Number, required: true }
            }
        },
        "teamGoals": {
            home: {
                under: {
                    1: { type: Number, required: true },
                    2: { type: Number, required: true },
                    3: { type: Number, required: true },
                    4: { type: Number, required: true },
                    5: { type: Number, required: true },
                },
                over: {
                    1: { type: Number, required: true },
                    2: { type: Number, required: true },
                    3: { type: Number, required: true },
                    4: { type: Number, required: true },
                    5: { type: Number, required: true }
                }
            },
            away: {
                under: {
                    1: { type: Number, required: true },
                    2: { type: Number, required: true },
                    3: { type: Number, required: true },
                    4: { type: Number, required: true },
                    5: { type: Number, required: true },
                },
                over: {
                    1: { type: Number, required: true },
                    2: { type: Number, required: true },
                    3: { type: Number, required: true },
                    4: { type: Number, required: true },
                    5: { type: Number, required: true }
                }
            }
        },
    }
}, { timestamps: true });
const Bet = model("Bet", betSchema);
export default Bet;
