import bcrypt from "bcrypt";
import express from "express";
import { config } from "../config.js";
import User from "../models/User.js";
import { getToken } from "../utils/Auth.js";

const UserRoute = express.Router();

UserRoute.post("/register", (req, res) => {
    new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, config.SALT_ROUND)
    })
        .save()
        .then((user) => res.status(201).json({ "success": true, "message": "Utilisateur enregistré avec succès" }))
        .catch((err) => res.status(500).json({ "success": false, "message": `Impossible de créer l'utilisateur : ${err}` }));
});

UserRoute.post("/login", async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        res
            .status(202)
            .cookie("token", JSON.stringify(getToken(user)), { secure: false, httpOnly: true, maxAge: 3600 * 1000 })
            .json({ "message": "Connexion utilisateur réussie", "userID": user._id });
    } else {
        res.status(404).json({ "message": "Identifiants incorrects" });
    }
});

export default UserRoute;
