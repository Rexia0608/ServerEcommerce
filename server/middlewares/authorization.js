import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export default async (req, res, next) => {
    try {
        const jwtToken = req.header("token");
        if (!jwtToken) {
            return res.status(403).json("Not authorize");
        }
        
        const payload = jwt.verify(jwtToken, process.env.jwtSecrets)
        req.user = payload.user;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(403).json("Not Authorize");
    }
};

