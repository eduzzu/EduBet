import BettingTicket from "../../models/BettingTicket.js";
import User from "../../models/User.js";
import bcrypt from "bcrypt";
export const getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json("User not found.");
        }
        return res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json("An error occured while finding user...");
    }
};
export const deleteUserAccount = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json("User not found.");
        }
        return res.status(200).json("User's account deleted successfully!");
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json("An error occured while deleting user's account...");
    }
};
export const editUserAccount = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, username, email, password, address, county, town, phoneNumber, profilePicture } = req.body;
        if (!name || !username || !email || !password || !address || !county || !town || !phoneNumber || !profilePicture) {
            return res.status(400).json("Please fill all these fields correctly!");
        }
        const updatedUser = await User.findByIdAndUpdate(userId, {
            name,
            username,
            email,
            password: await bcrypt.hash(password, 10),
            address,
            county,
            town,
            phoneNumber,
            profilePicture
        }, { new: true });
        if (!updatedUser) {
            return res.status(404).json("Can not update this user.");
        }
        return res.status(200).json(updatedUser);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json("An error occured while editing your account...");
    }
};
export const getUserTickets = async (req, res) => {
    try {
        const { userId } = req.params;
        const tickets = BettingTicket.find({ userId });
        if (!tickets) {
            return res.status(404).json("This user doesn't have any tickets...");
        }
        return res.status(200).json(tickets);
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json("An error occured while fetching user's betting tickets...");
    }
};
export const getUserTicket = async (req, res) => {
    try {
        const { userId, ticketId } = req.params;
        const ticket = await BettingTicket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json("Betting ticket does not exist.");
        }
        return res.status(200).json(ticket);
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json("An error occured while fetching user's betting ticket...");
    }
};
