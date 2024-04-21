import { Schema, Document, models, model } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  email: string;
  username: string;
  password?: string;
  picture: string;
  reputation?: number;
  saved: Schema.Types.ObjectId[];
  bio?: string;
  location?: string;
  portfolioLink?: string;
  joinedAt: Date;
}

const UserSchema = new Schema<IUser>({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String },
  picture: { type: String, required: true },
  reputation: { type: Number, default: 0 },
  saved: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  bio: { type: String },
  location: { type: String },
  portfolioLink: { type: String },
  joinedAt: { type: Date, default: Date.now },
});

const User = models.User || model("User", UserSchema);

export default User;
