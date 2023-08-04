import mongoose, { Document, Schema } from "mongoose";

interface UserDocument extends Document {
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

const User = mongoose.model<UserDocument>("User", userSchema);
export default User;
