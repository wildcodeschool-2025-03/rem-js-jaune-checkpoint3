import type { RequestHandler } from "express";

import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  // your code here
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
  // your code here
  try {
    // Get the coordinates from the request body
    const coordX = Number(req.body.coord_x);
    const coordY = Number(req.body.coord_y);

    // Fetch the tile at the given coordinates
    const tile = await tileRepository.readByCoordinates(coordX, coordY);

    // If no tile is found
    if (tile.length === 0) {
      res.sendStatus(422);
      return;
    }
    next();
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default {
  browse,
  validate,
};
