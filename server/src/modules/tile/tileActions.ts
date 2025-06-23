import { de } from "@faker-js/faker/.";
import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all tiles from the database
    const tiles = await tileRepository.readAll();

    // Respond with the tiles in JSON format
    res.json(tiles);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  try {
    const { coord_x, coord_y } = req.body;

    if (coord_x == null || coord_y == null) {
      res.sendStatus(422);
      return;
    }

    const tiles = await tileRepository.readByCoordinates(coord_x, coord_y);

    if (!tiles || tiles.length === 0) {
      res.sendStatus(422); // si la tuile n'existe pas
      return;
    }

    next(); // ✅ la tuile existe
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  validate,
};
