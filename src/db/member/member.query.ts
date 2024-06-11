export const insertQuery =
  "INSERT INTO Member (FirstName, LastName, Email, Phone, Address, Password) VALUES (?, ?, ?, ?, ?, ?)";

export const selectAllQuery =
  "SELECT MemberID, FirstName, LastName, Email, Phone, Address FROM Member";
