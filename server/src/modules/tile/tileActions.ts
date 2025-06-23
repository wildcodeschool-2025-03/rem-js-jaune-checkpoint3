import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all boats from the database
    const tile = await tileRepository.readAll();

    // Respond with the boats in JSON format
    res.json(tile);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
}; // your code here

const validate: RequestHandler = async (req, res, next) => {
  type Validation = {
    coordX: number;
    coordY: number;
  }; // type local pour vérifier que les valeurs soient bien des nombres comme inscrits dans la BDD

  const { coord_x, coord_y } = req.body; // je les récupère de la requête

  if (typeof coord_x === "number" && typeof coord_y === "number") {
    // je vérifie qu'ils aient bien le type nombre
    const checkNumber: Validation = {
      coordX: coord_x,
      coordY: coord_y,
    }; // je les stocke les données et leur applique mon type local Validation

    const tiles = await tileRepository.readByCoordinates(
      checkNumber.coordX,
      checkNumber.coordY,
    ); // appel de la fonction tilerepo qui vérifiera que les données existent bien et je stocke le résultat dans la variable tiles

    if (tiles.length === 0) {
      res.sendStatus(422); // aucune tuile trouvée → 422 attendu par le test
      return;
    }

    next(); // tout est bon → on passe à la suite
    return;
  }

  res.sendStatus(422); // les coordonnées ne sont pas valides → 422 attendu
  return;
};

export default {
  browse,
  validate,
};
