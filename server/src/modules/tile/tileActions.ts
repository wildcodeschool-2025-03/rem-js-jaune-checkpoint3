import type { RequestHandler } from "express";

import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  // your code here
  try {
    // Fetch all boats from the database
    const tile = await tileRepository.readAll();

    // Respond with the boats in JSON format
    res.json(tile);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  // your code here
  try {
    const { coord_x, coord_y } = req.body;
    const x = Number(coord_x);
    const y = Number(coord_y);

    if (Number.isNaN(x) || Number.isNaN(y)) {
      res.sendStatus(422);
      return;
    }

    const tile = await tileRepository.readByCoordinates(x, y);

    if (!tile || tile.length === 0) {
      res.sendStatus(422);
      return;
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  validate,
};
