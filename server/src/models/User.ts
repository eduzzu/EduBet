import { Schema, model, Types } from "mongoose";

export interface IUser {
    name: string,
    username: string,
    email: string,
    password?: string,
    cnp: string,
    address: string,
    county: string,
    town: string,
    phoneNumber: string,
    profilePicture?: string,
    accountBalance: number,
    verifiedDocuments: boolean,
    isAdmin: boolean,
    bettingTickets: Types.ObjectId[]
}

const userSchema = new Schema({
    name: {type: String, required: true},
    username: {type: String, min: 8, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, min: 8, required: true},
    cnp: {type: String, min: 13, max: 13, required: true, unique: true},
    address: {type: String, required: true},
    county: {type: String, required: true},
    town: {type: String, required: true},
    phoneNumber: {type: String, min: 10, max: 10, required: true, unique: true},
    profilePicture: {type: String, default: ""},
    accountBalance: {type: Number, min: 0.00, default:0.00, required: true},
    verifiedDocuments: {type: Boolean, default: false, required: true},
    isAdmin: {type: Boolean, default: false, required: true},
    bettingTickets: [{type: Schema.Types.ObjectId, ref: "BettingTicket", default: []}]

}, {timestamps: true});

const User = model<IUser>("User", userSchema);
export default User;