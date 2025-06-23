import databaseClient from "../../../database/client";
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
  tile_id: number;
  type: string;
  has_treasure: boolean;
};

class BoatRepository {
  async readAll(where?: { name?: string }): Promise<BoatWithTile[]> {
    const actualWhere = where || {};

    let sql =
      "SELECT boat.id, boat.name, boat.coord_x, boat.coord_y, tile.id AS tile_id, tile.type, tile.has_treasure " +
      "FROM boat JOIN tile ON boat.coord_x = tile.coord_x AND boat.coord_y = tile.coord_y";
    const values: (string | number)[] = [];

    if (actualWhere.name) {
      sql += " WHERE boat.name = ?";
      values.push(actualWhere.name);
    }

    sql += " ORDER BY boat.coord_y, boat.coord_x";

    const [rows] = await databaseClient.query<Rows>(sql, values);

    return rows as BoatWithTile[];
  }

  async update(boatToUpdate: Partial<Boat>) {
    const { id, coord_x, coord_y } = boatToUpdate;

    if (!id || coord_x === undefined || coord_y === undefined) {
      throw new Error("Missing fields for update");
    }

    const [result] = await databaseClient.query<Result>(
      "UPDATE boat SET coord_x = ?, coord_y = ? WHERE id = ?",
      [coord_x, coord_y, id],
    );

    return result.affectedRows;
  }
}

export default new BoatRepository();
