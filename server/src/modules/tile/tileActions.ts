import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const tiles = await tileRepository.readAll();
    res.status(200).json(tiles);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  if (
    !req.body ||
    req.body.coord_x === undefined ||
    req.body.coord_y === undefined
  ) {
    res.sendStatus(422);
    return;
  }

  if (
    req.body.coord_x < 0 ||
    req.body.coord_x > 11 ||
    req.body.coord_y < 0 ||
    req.body.coord_y > 5
  ) {
    res.sendStatus(422);
    return;
  }

  next();
};

export default {
  browse,
  validate,
};
