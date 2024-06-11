export const insertQuery =
  "INSERT INTO Book (Title, ISBN, PublicationYear, Publisher, CopiesAvailable, AuthorID) VALUES (?, ?, ?, ?, ?, ?)";

export const selectAllQuery = "SELECT * FROM Book";
