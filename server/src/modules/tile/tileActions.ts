import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  // your code here

  try {
    // Fetch all tiles from the database
    const tiles = await tileRepository.readAll();

    // Respond with the boats in JSON format
    res.json(tiles);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  // your code here
  try {
    // Update a specific tile based on the provided ID
    const tile = {
      id: Number(req.params.id),
      type: req.body.type,
      coord_x: req.body.coord_x,
      coord_y: req.body.coord_y,
      has_treasure: req.body.has_treasure,
    };

    // Call the repository method to update the tile
    const result = await tileRepository.update(tile);

    // Respond with the updated tile
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  // your code here
  type ValidationError = {
    coord_x?: number;
    coord_y?: number;
  };

  try {
    const errors: ValidationError[] = [];
    const { coord_x, coord_y } = req.body;

    if (errors.length === 0) {
      const tiles = await tileRepository.readByCoordinates(coord_x, coord_y);
      if (tiles.length === 0) {
      }
      next();
    } else {
      res.sendStatus(422);
    }
  } catch (error) {
    next(error);
  }
};

export default {
  browse,
  validate,
  edit,
};
