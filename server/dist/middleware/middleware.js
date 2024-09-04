import jwt from "jsonwebtoken";
export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");
        if (!token) {
            return res.status(403).json("Access Denied!");
        }
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimStart();
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    }
    catch (error) {
        console.error(error);
        return res.status(500).json("An error occured while verifying token...");
    }
};
export const isMyAccount = async (req, res, next) => {
    try {
        const { userId } = req.params;
        if (req.user.id !== userId) {
            return res.status(401).json("Permission denied.");
        }
        next();
    }
    catch (error) {
        console.error(error);
        return res.status(500).json("An error occured while checking if this is your account...");
    }
};
export const isAdmin = async (req, res, next) => {
    try {
        if (req.user.isAdmin === false) {
            return res.status(401).json("You are not an admin. Permission denied.");
        }
        next();
    }
    catch (error) {
        console.error(error);
        return res.status(500).json("An error occured while checking user's role...");
    }
};
