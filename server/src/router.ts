import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

//------------------------BOAT--------------------------------

import boatActions from "./modules/boat/boatActions";

router.get("/api/boats", boatActions.browse);

//------------------------GAME-------------------------------

import gameActions from "./modules/game/gameActions";

router.post("/api/games", gameActions.add);

//------------------------TILE------------------------------

import tileActions from "./modules/tile/tileActions";

router.get("/api/tiles", tileActions.browse);

/* ************************************************************************* */

export default router;
