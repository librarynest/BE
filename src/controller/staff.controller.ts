import { Request, Response } from "express";
import { LoginRequest } from "../models/auth";
import staffService from "../db/staff/staff.service";
import { Staff } from "../models/staff";

const getAll = async (req: Request, res: Response) => {
  staffService
    .selectAll()
    .then((staff) => {
      res.status(200).send({
        status: res.statusCode,
        data: staff,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving staffs",
        error: err.message,
      });
    });
};

const staffLogin = async (req: Request, res: Response) => {
  const staff: LoginRequest = req.body;
  staffService
    .loginStaff(staff)
    .then((staff) => {
      res.status(200).send({
        status: res.statusCode,
        data: staff,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error logging in",
        error: err.message,
      });
    });
};

const staffSignup = async (req: Request, res: Response) => {
  const staff: Staff = req.body;
  staffService
    .registerStaff(staff)
    .then((insertId) => {
      res.status(201).send({
        status: res.statusCode,
        message: "staff added successfully",
        data: {
          StaffID: insertId,
          FirstName: staff.FirstName,
          LastName: staff.LastName,
          Email: staff.Email,
          Phone: staff.Phone,
          Password: staff.Password,
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

export default { getAll, staffSignup, staffLogin };
