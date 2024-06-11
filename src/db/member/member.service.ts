import { OkPacket, RowDataPacket } from "mysql2";
import { connect } from "..";
import { insertQuery, selectAllQuery } from "./member.query";
import { Member } from "../../models/member";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { LoginRequest, LoginResponse } from "../../models/auth";
dotenv.config();

const selectAll = async (): Promise<Partial<Member>[]> => {
  const pool = await connect();
  try {
    const [rows] = await pool.query(selectAllQuery);
    const members = (rows as RowDataPacket[]).map((row) => {
      const { Password, ...memberWithoutPassword } = row;
      return memberWithoutPassword as Partial<Member>;
    });
    return members;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error retrieving members: ${err.message}`);
    } else {
      throw new Error("Error retrieving members: Unknown error occurred");
    }
  } finally {
    await pool.end();
  }
};

const loginMember = async (member: LoginRequest): Promise<LoginResponse> => {
  const pool = await connect();
  try {
    const [rows] = await pool.query(`SELECT * FROM Member WHERE Email = ?`, [
      member.Email,
    ]);

    if ((rows as RowDataPacket[]).length === 0) {
      throw new Error("Invalid email or password");
    }

    const passwordHash = (rows as RowDataPacket[])[0].Password;
    const isPasswordMatch = await bcrypt.compare(member.Password, passwordHash);
    if (!isPasswordMatch) {
      throw new Error("Invalid email or password");
    }
    const accessToken = jwt.sign(
      { email: member.Email },
      process.env.JWT_ACCESS_SECRET as string,
      { expiresIn: "1h" },
    );
    const refreshToken = jwt.sign(
      { email: member.Email },
      process.env.JWT_REFRESH_SECRET as string,
      { expiresIn: "1h" },
    );
    return {
      FirstName: (rows as RowDataPacket[])[0].FirstName,
      accessToken: accessToken,
      refreshToken: refreshToken,
      isStaff: false,
    };
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error logging in: ${err.message}`);
    } else {
      throw new Error("Error logging in: Unknown error occurred");
    }
  } finally {
    await pool.end();
  }
};

const registerMember = async (member: Member): Promise<number> => {
  const pool = await connect();
  const passwordHash = await bcrypt.hash(member.Password, 10);
  try {
    const [result] = await pool.query(insertQuery, [
      member.FirstName,
      member.LastName,
      member.Email,
      member.Phone,
      member.Address,
      (member.Password = passwordHash),
    ]);
    const insertId = (result as OkPacket).insertId;
    return insertId;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error adding member: ${err.message}`);
    } else {
      throw new Error("Error adding member: Unknown error occurred");
    }
  } finally {
    await pool.end();
  }
};

export default { selectAll, loginMember, registerMember };
