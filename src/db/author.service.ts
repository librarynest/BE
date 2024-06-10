import { OkPacket } from "mysql2";
import { connect } from ".";
import { Author } from "../models/author";

const selectAll = async (): Promise<Author[]> => {
  const pool = await connect();
  try {
    const [rows] = await pool.query("SELECT * FROM Author");
    const author: Author[] = (rows as any[]).map((row) => {
      return {
        AuthorID: row.AuthorID,
        FirstName: row.FirstName,
        LastName: row.LastName,
        Biography: row.Biography,
      };
    });
    return author;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error retrieving author: ${err.message}`);
    } else {
      throw new Error("Error retrieving author: Unknown error occurred");
    }
  } finally {
    await pool.end();
  }
};

const postAuthor = async (author: Author): Promise<number> => {
  const pool = await connect();
  try {
    const query = `INSERT INTO Author (FirstName, LastName, Biography) VALUES (?, ?, ?)`;
    const [result] = await pool.query(query, [
      author.FirstName,
      author.LastName,
      author.Biography,
    ]);
    const insertId = (result as OkPacket).insertId;
    return insertId;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error adding book: ${err.message}`);
    } else {
      throw new Error("Error adding book: Unknown error occurred");
    }
  } finally {
    await pool.end();
  }
};
export default { selectAll, postAuthor };
