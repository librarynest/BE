import { Request, Response } from "express";
import { Book } from "../models/book";
import bookService from "../db/book.service";

const getAll = async (req: Request, res: Response) => {
  bookService
    .selectAll()
    .then((books) => {
      res.status(200).send({
        status: res.statusCode,
        data: books,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving books",
        error: err.message,
      });
    });
};

const insertBook = async (req: Request, res: Response) => {
  const book: Book = req.body;
  bookService
    .postBook(book)
    .then((insertId) => {
      res.status(201).send({
        status: res.statusCode,
        message: "Book added successfully",
        data: {
          BookID: insertId,
          Title: book.Title,
          ISBN: book.ISBN,
          PublicationYear: book.PublicationYear,
          Publisher: book.Publisher,
          CopiesAvailable: book.CopiesAvailable,
          AuthorID: book.AuthorID,
        },
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: res.statusCode,
        error: err.message,
      });
    });
};

export default { getAll, insertBook };
