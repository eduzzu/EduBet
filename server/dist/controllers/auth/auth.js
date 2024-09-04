import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
    const { name, username, email, password, cnp, address, county, town, phoneNumber, } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json("User already exists.");
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            username,
            email,
            password: hashPassword,
            cnp,
            address,
            county,
            town,
            phoneNumber,
        });
        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json("An error occured while saving user...");
    }
};
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        if (!username || !password) {
            return res.status(400).json("Please fill all fields.");
        }
        if (!user) {
            return res.status(404).json("User not found.");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json("Invalid credentials!");
        }
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
        delete user.password;
        return res.status(200).json({ token, user });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json("An error occured while logging in...");
    }
};
