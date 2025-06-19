import { Schema, model } from "mongoose";
import * as bcryptjs from "bcryptjs";

export interface IUser {
  name?: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email already exists"],
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // Here you can hash the password before saving it
    // For example, using bcrypt:
    this.password = await bcryptjs.hashSync(this.password, 10);
  }
  next();
});

export const User = model("User", userSchema);
