import type { RequestHandler } from "express";

import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  // your code here
  try {
    // Fetch all Tiles from the database
    const tiles = await tileRepository.readAll();

    // Respond with the Tiles in JSON format
    res.json(tiles);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  // your code here
  const coord_x = Number(req.body.coord_x);
  const coord_y = Number(req.body.coord_y);

  if (Number.isNaN(coord_x) || Number.isNaN(coord_y)) {
    res.sendStatus(422);
    return;
  }

  const tile = await tileRepository.readByCoordinates(coord_x, coord_y);
  if (tile === null || tile.length === 0) {
    res.sendStatus(422);
    return;
  }
  next();
};

export default {
  browse,
  validate,
};
