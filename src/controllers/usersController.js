import User from "../models/User";
import { createPasswordHash } from "../services/auth";

class usersController {

    async index(req, res) {
        try {
            const users = await User.find();
            if (!users) return res.status(404).json({ message: "Users not found." });
            return res.status(200).json(users);
        } catch (error) {
            console.error(error);
            console.log("Internal server error.");
        }
    }


    async create(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (user) return res.status(422).json({ message: `User ${email} already exitis.` });
            const encryptedPass = await createPasswordHash(password);
            const newUser = await User.create({ email, password: encryptedPass });
            return res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
            console.log("Internal server error.");
        }
    }

    async read(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if (!user) return res.status(404).json({ message: "User not found!" });
            return res.status(200).json(user);
        } catch (error) {
            console.error(error);
            console.log("Internal server error.");
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { email, password } = req.body;
            const user = await User.findById(id);
            if (!user) return res.status(404).json({ message: "User not found!" });
            const newUser = await User.findOne({ email });
            if (newUser) return res.status(422).json({ message: `User ${email} already exitis.` });
            const encryptedPass = await createPasswordHash(password);
            await user.updateOne({ email, password: encryptedPass });
            return res.status(201).json({ message: `User updated.` });
        } catch (error) {
            console.error(error);
            console.log("Internal server error.");
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if (!user) return res.status(404).json({ message: "User not found!" });
            await user.deleteOne();
            return res.status(200).json({ message: "User deleted." });
        } catch (error) {
            console.error(error);
            console.log("Internal server error.");
        }
    }
}

export default new usersController();