import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Boat = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
};

class BoatRepository {
  async readAll(where: { name?: string } = {}) {
    if (where == null) {
      // Execute the SQL SELECT query to retrieve all boats from the "boat" table
      const [rows] = await databaseClient.query<Rows>(
        "select b.id, b.coord_x, b.coord_y, b.name, t.type, t.has_treasure FROM boat AS b JOIN tile AS t ON t.coord_x = b.coord_x AND t.coord_y = b.coord_y order by coord_y, coord_x",
      );

      // Return the array of tiles
      return rows as Boat[];
    }
    // Execute the SQL SELECT query to retrieve all boats from the "boat" table
    const [rows] = await databaseClient.query<Rows>(
      "select b.id, b.coord_x, b.coord_y, b.name, t.type, t.has_treasure FROM boat AS b JOIN tile AS t ON t.coord_x = b.coord_x AND t.coord_y = b.coord_y AND b.name = ? order by coord_y, coord_x ",
      [where.name],
    );

    // Return the array of tiles
    return rows as Boat[];
  }

  async update(boatToUpdate: Partial<Boat>) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE boat SET coord_x = ?, coord_y = ? WHERE id = ?",
      [boatToUpdate.coord_x, boatToUpdate.coord_y, boatToUpdate.id],
    );

    return result.affectedRows;
  }
}

export default new BoatRepository();
