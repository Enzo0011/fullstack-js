import express from "express";
import Room from "../models/Room.js";

const RoomRoute = express.Router();

RoomRoute.get("/", async (req, res) => {
    const rooms = await Room.find({}).populate("createdBy", { "username": 1 }).exec();

    if (rooms) {
        res.status(200).json({ "message": "Salles trouvées avec succès", "result": rooms });
    } else {
        res.status(500).json({ "message": "Une erreur est survenue" });
    }
});

RoomRoute.get("/:id", async (req, res) => {
    const room = await Room.findById(req.params.id);

    if (room) {
        res.status(200).json({ "message": "Salle trouvée avec succès", "result": room });
    } else {
        res.status(500).json({ "message": "Une erreur est survenue" });
    }
});

RoomRoute.post("/", (req, res) => {
    new Room(req.body).save()
        .then(room => res.status(201).json({ "success": true, "message": "Salle créée avec succès", "result": room }))
        .catch(err => res.status(500).json({ "success": false, "message": `Impossible de créer la salle : ${err}` }));
});

export default RoomRoute;
