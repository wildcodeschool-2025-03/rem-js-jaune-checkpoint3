import type { RequestHandler } from "express";

import boatRepository from "./boatRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const where = req.query.name ? { name: String(req.query.name) } : {};
    const boats = await boatRepository.readAll(where);
    res.json(boats);
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const boatId = Number.parseInt(req.params.id, 10);

    if (Number.isNaN(boatId)) {
      res.status(400).json({ error: "Invalid boat ID" });
      return;
    }

    const updatedBoatData = req.body;
    if (!updatedBoatData || Object.keys(updatedBoatData).length === 0) {
      res.status(400).json({ error: "No data provided for update" });
      return;
    }

    const updatedBoat = await boatRepository.update({
      id: boatId,
      ...updatedBoatData,
    });
    if (!updatedBoat) {
      res.status(404).json({ error: "Boat not found" });
      return;
    }

    res.status(204).send(); // ✅ doit renvoyer un 204 vide
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  edit,
};
