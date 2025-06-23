import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // fetch all tiles from the database
    const tiles = await tileRepository.readAll();

    //Respond with the tiles in JSON format
    res.json(tiles);
  } catch (err) {
    // Pass any error
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  try {
    const coord_x = req.body.coord_x;
    const coord_y = req.body.coord_y;

    const tiles = await tileRepository.readByCoordinates(coord_x, coord_y);

    if (tiles.length > 0) {
      next(); // coordonnées valides
    } else {
      res.sendStatus(422); // coordonnées invalides
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  validate,
};
