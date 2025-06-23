import type { RequestHandler } from "express";

import boatRepository from "./boatRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all boats from the database
    const boats = await boatRepository.readAll();

    // Respond with the boats in JSON format
    res.json(boats);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const boat = {
      id: Number(req.params.id),
      name: req.body.name,
      coord_x: req.body.coord_x,
      coord_y: req.body.coord_y,
    };

    // Vérification des champs requis
    if (
      boat.name === undefined ||
      boat.coord_x === undefined ||
      boat.coord_y === undefined
    ) {
      res.status(400).json({ message: "Champs manquants" });
      return;
    }

    const affectedRows = await boatRepository.update(boat);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  edit,
};
