import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Boat = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
};

class BoatRepository {
  async readAll(where = {}) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT
      boat.id AS boat_id,
      boat.name AS boat_name,
      boat.coord_x AS boat_coord_x,
      boat.coord_y AS boat_coord_y,
      tile.id AS tile_id,
      tile.type AS tile_type,
      tile.coord_x AS tile_coord_x,
      tile.coord_y AS tile_coord_y
    FROM boat
    JOIN tile ON boat.coord_x = tile.coord_x
           AND boat.coord_y = tile.coord_y
    ORDER BY boat.coord_y, boat.coord_x`,
    );
    return rows as Boat[];
  }

  async update(boatToUpdate: Partial<Boat>) {
    // your code here
    // Execute the SQL UPDATE query to update an existing category in the "category" table
    const [result] = await databaseClient.query<Result>(
      "update boat set coord_x = ?, coord_y = ? where id = ?",
      [boatToUpdate.coord_x, boatToUpdate.coord_y, boatToUpdate.id],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}

export default new BoatRepository();
