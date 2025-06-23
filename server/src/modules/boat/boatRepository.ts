import databaseClient from "../../../database/client";

import type { RowDataPacket } from "mysql2";
import type { Result, Rows } from "../../../database/client";

type Boat = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
};

type BoatWithTile = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
  type: string;
  has_treasure: boolean;
};

class BoatRepository {
  async readAll(where = {}): Promise<BoatWithTile[]> {
    // Execute the SQL SELECT query to retrieve all boats from the "boat" table
    const [rows] = await databaseClient.query<RowDataPacket[]>(`
      SELECT boat.id, boat.name, boat.coord_x, boat.coord_y, tile.type, tile.has_treasure
      FROM boat
      JOIN tile ON boat.coord_x = tile.coord_x AND boat.coord_y = tile.coord_y
      ORDER BY boat.coord_y, boat.coord_x
    `);

    // Return the array of boats with their associated tiles
    return rows as BoatWithTile[];
  }

  async update(boat: Boat) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE boat SET name = ?, coord_x = ?, coord_y = ? WHERE id = ?",
      [boat.name, boat.coord_x, boat.coord_y, boat.id],
    );
    return result.affectedRows;
  }
}

export default new BoatRepository();
