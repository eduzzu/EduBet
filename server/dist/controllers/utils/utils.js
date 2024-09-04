import BettingTicket from "../../models/BettingTicket.js";
import User from "../../models/User.js";
export const generateOdds = (probability) => {
    let odds = (1 / probability).toFixed(2);
    return parseFloat(odds);
};
export const updateUserAccountBalanceAfterPlacingBet = async (ticketId) => {
    try {
        const ticket = await BettingTicket.findById(ticketId);
        if (!ticket) {
            throw new Error("Betting ticket not found.");
        }
        const user = await User.findById(ticket.userId);
        if (!user) {
            throw new Error("User not found.");
        }
        if (user.accountBalance < ticket.stake) {
            throw new Error("Insufficient founds.");
        }
        user.accountBalance -= ticket.stake;
        await user.save();
        return user.accountBalance;
    }
    catch (error) {
        console.error(error);
        throw new Error("Error updating balance.");
    }
};
export const updateUserAccountBalanceAfterWinningBettingTicket = async (ticketId) => {
    try {
        const ticket = await BettingTicket.findById(ticketId);
        if (!ticket) {
            throw new Error("Betting ticket not found.");
        }
        const user = await User.findById(ticket.userId);
        if (!user) {
            throw new Error("User not found.");
        }
        if (ticket.status === "Won") {
            user.accountBalance += ticket.potentialWin;
        }
        await user.save();
        return user.accountBalance;
    }
    catch (error) {
        console.error(error);
        throw new Error("Error updating balance.");
    }
};
