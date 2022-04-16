import User from "../models/User";
import { checkPassword } from "../services/auth";
import jwt from "jsonwebtoken";
import auth from "../config/auth";

class sessionsController {

    async create(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) return res.status(401).json({ error: "User / Password invalid." });
            const passChecked = await checkPassword(user, password);
            if (!passChecked) return res.status(401).json({ error: "User / Password invalid." });
            const { id } = user;
            return res.status(200).json({
                user: {
                    id,
                    email
                },
                token: jwt.sign({ id }, auth.secret, { expiresIn: auth.expiresIn })
            });
        } catch (error) {
            console.log(error);
            console.log("Internal Server error.")
        }
    }
}

export default new sessionsController();