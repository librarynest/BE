import { Request, Response } from "express";
import memberService from "../db/member/member.service";
import { Member } from "../models/member";
import { LoginRequest } from "../models/auth";

const getAll = async (req: Request, res: Response) => {
  memberService
    .selectAll()
    .then((member) => {
      res.status(200).send({
        status: res.statusCode,
        data: member,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving members",
        error: err.message,
      });
    });
};

const memberLogin = async (req: Request, res: Response) => {
  const member: LoginRequest = req.body;
  memberService
    .loginMember(member)
    .then((member) => {
      res.status(200).send({
        status: res.statusCode,
        data: member,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error logging in",
        error: err.message,
      });
    });
};

const memberSignup = async (req: Request, res: Response) => {
  const member: Member = req.body;
  memberService
    .registerMember(member)
    .then((insertId) => {
      res.status(201).send({
        status: res.statusCode,
        message: "member added successfully",
        data: {
          memberID: insertId,
          FirstName: member.FirstName,
          LastName: member.LastName,
          Email: member.Email,
          Phone: member.Phone,
          Address: member.Address,
          Password: member.Password,
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

export default { getAll, memberSignup, memberLogin };
