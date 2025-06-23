import type { RequestHandler } from "express";

import boatRepository from "./boatRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all boats from the database
    const boats = await boatRepository.readAll();

    // Respond with the boats in JSON format
    res.json(boats);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    //on recup l'ID du bateau, on le convertit en nombre
    const id = Number(req.params.id);
    //on recup les nouvelles coordonnees
    const { coord_x, coord_y } = req.body;
    // verifie que 3 champs sont renseignés, si l'un d'eux est vide, on renvoie une erreur 400
    if (!id || coord_x == null || coord_y == null) {
      res
        .status(400)
        .json({ error: "Manque l'ID du bateau ou les coordonnées" });
      return;
    }
    //met à jour le bateau avec les nouvelles coordonnées, on utilise le repository pour faire la requete SQL
    const affectedBoats = await boatRepository.update({
      id,
      coord_x,
      coord_y,
    });
    // Si aun bateau n'a été affecté, on renvoie une erreur 404
    if (affectedBoats === 0) {
      res.status(404).json({ error: "Bateau non trouvé" });
    }
    // Si tout s'est bien passé, on renvoie un status 204 (rien à afficher)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default {
  browse,
  edit,
};
