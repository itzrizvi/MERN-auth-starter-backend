import { NextFunction } from "express";
import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema: Schema<UserDocument> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Encrypt Password
userSchema.pre("save", async function (this: UserDocument, next: NextFunction) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model<UserDocument>("User", userSchema);
export default User;
