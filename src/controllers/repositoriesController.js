import User from "../models/User";
import Repository from "../models/Repository";

class repositoriesController {

    async index(req, res) {
        try {
            const { user_id } = req.params;
            const user = await User.findById(user_id);
            if (!user) return res.status(404).json({ message: "User not found!" });
            const repositories = await Repository.find({ userId: user_id });
            if (!repositories) return res.status(404).json({ message: "repositories not found." });
            return res.status(200).json(repositories);
        } catch (error) {
            console.error(error);
            console.log("Internal server error.");
        }
    }


    async create(req, res) {
        try {
            const { user_id } = req.params;
            const { name, url } = req.body;
            const user = await User.findById(user_id);
            if (!user) return res.status(404).json({ message: `User not found.` });
            console.log("name: ", name);
            console.log("url: ", url);
            console.log("user_id: ", user_id);
            const repository = await Repository.findOne({ userId: user_id, name });
            console.log(repository);
            if (repository) return res.status(400).json({ message: "Repository already exists." });
            const newRepository = await Repository.create({ name, url, userId: user_id });
            return res.status(201).json(newRepository);
        } catch (error) {
            console.error(error);
            console.log("Internal server error.");
        }
    }

    async read(req, res) {
        try {
            const { user_id, id } = req.params;
            const user = await User.findById(user_id);
            if (!user) return res.status(404).json({ message: "User not found!" });
            const repository = await Repository.findOne({ user_id, _id: id })
            return res.status(200).json(repository);
        } catch (error) {
            console.error(error);
            console.log("Internal server error.");
        }
    }

    async update(req, res) {
        try {
            const { user_id, id } = req.params;
            const { name, url } = req.body;
            const user = await User.findById(user_id);
            if (!user) return res.status(404).json({ message: "User not found!" });
            const repository = await Repository.findOne({ userId: user_id, _id: id });
            if (!repository) return res.status(404).json({ message: `Repository not found.` });
            await repository.updateOne({ name, url, userId: user_id });
            return res.status(201).json({ message: `Repository updated.` });
        } catch (error) {
            console.error(error);
            console.log("Internal server error.");
        }
    }

    async delete(req, res) {
        try {
            const { user_id, id } = req.params;
            const user = await User.findById(user_id);
            if (!user) return res.status(404).json({ message: "User not found!" });
            const repository = await Repository.findOne({ userId: user_id, _id: id });
            if (!repository) return res.status(404).json({ message: "Repository not found!" });
            await repository.deleteOne();
            return res.status(200).json({ message: "Repository deleted." });
        } catch (error) {
            console.error(error);
            console.log("Internal server error.");
        }
    }
}

export default new repositoriesController();