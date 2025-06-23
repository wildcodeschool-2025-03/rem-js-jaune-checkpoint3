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
    // Validate the tile data from the request body
    const { tileData } = await req.body;
    res.json({ message: "Tile data is valid" });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default {
  browse,
  validate,
};
