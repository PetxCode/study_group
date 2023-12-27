import { Document, Schema, model } from "mongoose";

interface iUser {
  email: string;
  password: string;
  verifiedToken: string;
  verify: boolean;

  avatar: string;
}

interface iUserData extends iUser, Document {}

const userModel = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    verifiedToken: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model<iUserData>("user", userModel);
