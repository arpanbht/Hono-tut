import { Hono } from "hono";
import { addUser, getAllUsers } from "../controllers/user.controller";

const userRouter = new Hono();

userRouter.post("/addUser", addUser);
userRouter.get("/getAllUsers", getAllUsers);

export default userRouter;
