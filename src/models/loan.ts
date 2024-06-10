export interface Loan {
  LoanID: number;
  BookID: number;
  MemberID: number;
  LoanDate: Date;
  DueDate: Date;
  ReturnDate: Date | null;
}
