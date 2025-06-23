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
    if (where.name) {
      const [rows] = await databaseClient.query<Rows>(
        `SELECT b.id, b.coord_x, b.coord_y, b.name, t.type, t.has_treasure
       FROM boat AS b
       JOIN tile AS t ON t.coord_x = b.coord_x AND t.coord_y = b.coord_y
       WHERE b.name = ?
       ORDER BY b.coord_y, b.coord_x`,
        [where.name],
      );
      return rows as Boat[];
    }

    const [rows] = await databaseClient.query<Rows>(
      `SELECT b.id, b.coord_x, b.coord_y, b.name, t.type, t.has_treasure
     FROM boat AS b
     JOIN tile AS t ON t.coord_x = b.coord_x AND t.coord_y = b.coord_y
     ORDER BY b.coord_y, b.coord_x`,
    );
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
