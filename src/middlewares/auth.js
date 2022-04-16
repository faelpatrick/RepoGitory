import { promisify } from "util";
import jwt from "jsonwebtoken";
import authConfig from "../config/auth";

export default async (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Token was not provid." });
    const [, token] = authHeader.split(' ');
    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);
        req.userId = decoded.id;
        req.userMail = decoded.email;
        return next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: "Invalid token." });
    }
}