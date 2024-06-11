import { OkPacket, RowDataPacket } from "mysql2";
import { connect } from ".";
import { Book } from "../models/book";

const selectAll = async (): Promise<Book[]> => {
  const pool = await connect();
  try {
    const [rows] = await pool.query("SELECT * FROM Book");
    const books: Book[] = (rows as RowDataPacket[]).map((row) => {
      return {
        BookID: row.BookID,
        Title: row.Title,
        ISBN: row.ISBN,
        PublicationYear: row.PublicationYear,
        Publisher: row.Publisher,
        CopiesAvailable: row.CopiesAvailable,
        AuthorID: row.AuthorID,
      };
    });
    return books;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error retrieving books: ${err.message}`);
    } else {
      throw new Error("Error retrieving books: Unknown error occurred");
    }
  } finally {
    await pool.end();
  }
};

const postBook = async (book: Book): Promise<number> => {
  const pool = await connect();
  try {
    const query = `INSERT INTO Book (Title, ISBN, PublicationYear, Publisher, CopiesAvailable, AuthorID) VALUES (?, ?, ?, ?, ?, ?)`;
    const [result] = await pool.query(query, [
      book.Title,
      book.ISBN,
      book.PublicationYear,
      book.Publisher,
      book.CopiesAvailable,
      book.AuthorID,
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
export default { selectAll, postBook };
