import type { Context } from "hono";
import { User } from "../models/user.model";
import { sendErrorResponse, sendSuccessResponse } from "../utils/response.util";

export const addUser = async (c: Context) => {
  const { name, email, password } = await c.req.parseBody();
  if (!email || !password) {
    return sendErrorResponse(c, null, "Email and password are required", 400);
  }

  const user = await User.create({
    name,
    email,
    password,
  });
//   console.log("User created:", user);
  return sendSuccessResponse(c, user, "User created successfully", 201);
};

export const getAllUsers = async (c: Context) => {
  const users = await User.find().select("-password");
  if (!users || users.length === 0) {
    return sendErrorResponse(c, null, "No users found", 404);
  }
  return sendSuccessResponse(c, users, "Users retrieved successfully", 200);
};
