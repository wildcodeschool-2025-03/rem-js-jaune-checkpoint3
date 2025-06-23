import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const tile = await tileRepository.readAll();
    res.json(tile);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  type ValidationError = {
    field: string;
    message: string;
  };

  const errors: ValidationError[] = [];

  const { name, coord_x, coord_y, has_treasure = false } = req.body;

  if (name == null) {
    errors.push({
      field: "name",
      message: "name is required",
    });
  }

  if (coord_x == null) {
    errors.push({
      field: "coord_x",
      message: "coord_x is required",
    });
  } else if (typeof coord_x !== "number") {
    errors.push({
      field: "coord_x",
      message: "coord_x must be a number",
    });
  }

  if (coord_y == null) {
    errors.push({
      field: "coord_y",
      message: "coord_y is required",
    });
  } else if (typeof coord_y !== "number") {
    errors.push({
      field: "coord_y",
      message: "coord_y must be a number",
    });
  }
};

export default {
  browse,
  validate,
};
