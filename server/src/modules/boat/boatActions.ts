import type { RequestHandler } from "express";

import boatRepository from "./boatRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all boats from the database

    const tile = await boatRepository.readAll();

    // Respond with the boats in JSON format
    res.json(tile);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  // your code here
  try {
    // Update a specific category based on the provided ID
    const boat = {
      id: Number(req.params.id),
      coord_x: Number(req.body.coord_x),
      coord_y: Number(req.body.coord_y),
    };

    const affectedRows = await boatRepository.update(boat);

    // If the boat is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the boat in JSON format
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default {
  browse,
  edit,
};
