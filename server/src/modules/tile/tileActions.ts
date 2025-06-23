import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const tiles = await tileRepository.readAll();
    res.json(tiles);
  } catch (error) {
    next(error);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  const { coord_x, coord_y } = req.body;
  const areValidCoordinates =
    Number.isInteger(coord_x) &&
    Number.isInteger(coord_y) &&
    coord_x >= 0 &&
    coord_x <= 11 &&
    coord_y >= 0 &&
    coord_y <= 5;

  if (!areValidCoordinates) {
    res.sendStatus(422);
    return;
  }

  const existingTiles = await tileRepository.readByCoordinates(
    coord_x,
    coord_y,
  );

  if (!existingTiles) {
    res.sendStatus(422);
    return;
  }

  next();
};

export default {
  browse,
  validate,
};
