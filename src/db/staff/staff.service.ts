import { OkPacket, RowDataPacket } from "mysql2";
import { connect } from "..";
import { insertQuery, selectAllQuery } from "./staff.query";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { Staff } from "../../models/staff";
import { LoginRequest, LoginResponse } from "../../models/auth";
dotenv.config();

const selectAll = async (): Promise<Partial<Staff>[]> => {
  const pool = await connect();
  try {
    const [rows] = await pool.query(selectAllQuery);
    const staffs = (rows as RowDataPacket[]).map((row) => {
      const { Password, ...StaffWithoutPassword } = row;
      return StaffWithoutPassword as Partial<Staff>;
    });
    return staffs;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error retrieving Staffs: ${err.message}`);
    } else {
      throw new Error("Error retrieving Staffs: Unknown error occurred");
    }
  } finally {
    await pool.end();
  }
};

const loginStaff = async (staff: LoginRequest): Promise<LoginResponse> => {
  const pool = await connect();
  try {
    const [rows] = await pool.query(`SELECT * FROM Staff WHERE Email = ?`, [
      staff.Email,
    ]);

    if ((rows as RowDataPacket[]).length === 0) {
      throw new Error("Invalid email or password");
    }

    const passwordHash = (rows as RowDataPacket[])[0].Password;
    const isPasswordMatch = await bcrypt.compare(staff.Password, passwordHash);
    if (!isPasswordMatch) {
      throw new Error("Invalid email or password");
    }
    const accessToken = jwt.sign(
      { email: staff.Email },
      process.env.JWT_ACCESS_SECRET as string,
      { expiresIn: "1h" },
    );
    const refreshToken = jwt.sign(
      { email: staff.Email },
      process.env.JWT_REFRESH_SECRET as string,
      { expiresIn: "1h" },
    );
    return {
      FirstName: (rows as RowDataPacket[])[0].FirstName,
      accessToken: accessToken,
      refreshToken: refreshToken,
      isStaff: true,
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

const registerStaff = async (staff: Staff): Promise<number> => {
  const pool = await connect();
  const passwordHash = await bcrypt.hash(staff.Password, 10);
  try {
    const [result] = await pool.query(insertQuery, [
      staff.FirstName,
      staff.LastName,
      staff.Email,
      staff.Phone,
      (staff.Password = passwordHash),
    ]);
    const insertId = (result as OkPacket).insertId;
    return insertId;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error adding staff: ${err.message}`);
    } else {
      throw new Error("Error adding staff: Unknown error occurred");
    }
  } finally {
    await pool.end();
  }
};

export default { selectAll, loginStaff, registerStaff };
