import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import boatActions from "./modules/boat/boatActions";
import gameActions from "./modules/game/gameActions";
import tileActions from "./modules/tile/tileActions";

//------------------------BOAT--------------------------------

router.get("/api/boats", boatActions.browse);
router.put("/api/boats/:id", tileActions.validate, boatActions.edit);

//------------------------GAME-------------------------------

router.post("/api/games", gameActions.add);

//------------------------TILE------------------------------

router.get("/api/tiles", tileActions.browse);

/* ************************************************************************* */

export default router;
