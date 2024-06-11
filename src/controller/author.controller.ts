import { Request, Response } from "express";
import authorService from "../db/author/author.service";
import { Author } from "../models/author";

const getAllAuthor = async (req: Request, res: Response) => {
  authorService
    .selectAll()
    .then((authors) => {
      res.status(200).send({
        status: res.statusCode,
        data: authors,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving authors",
        error: err.message,
      });
    });
};

const insertAuthor = async (req: Request, res: Response) => {
  const author: Author = req.body;
  authorService
    .postAuthor(author)
    .then((insertId) => {
      res.status(201).send({
        status: res.statusCode,
        message: "author added successfully",
        data: {
          authorID: insertId,
          FirstName: author.FirstName,
          LastName: author.LastName,
          Biography: author.Biography,
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

export default { getAllAuthor, insertAuthor };
