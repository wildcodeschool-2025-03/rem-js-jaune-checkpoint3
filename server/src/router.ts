import express from "express";
import tilesActions from "./modules/tile/tileActions";
const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import boatActions from "./modules/boat/boatActions";

router.get("/api/boats", boatActions.browse);
router.put("/api/boats/:id", tilesActions.validate, boatActions.edit);

import gameActions from "./modules/game/gameActions";

router.post("/api/games", gameActions.add);

router.get("/api/tiles", tilesActions.browse);
router.post("/api/tiles", tilesActions.validate);

/* ************************************************************************* */

export default router;
